import { Injectable } from '@angular/core';
import {Monitor, PowerState} from "../domain/monitor";
import {Desktop} from "../domain/desktop";
import {RequestService} from "./request.service";
import {map, Observable} from "rxjs";
import {NotificationService} from "./notification.service";
import {ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  desktops: Desktop[] = [
    {
      ip: "192.168.35.131",
      name: "soc-pc01"
    },
    {
      ip: "192.168.35.132",
      name: "soc-pc02"
    },
    {
      ip: "192.168.35.133",
      name: "soc-pc03"
    },
    {
      ip: "192.168.35.134",
      name: "soc-pc04"
    },
    {
      ip: "192.168.35.135",
      name: "soc-pc05"
    },
    {
      ip: "192.168.35.136",
      name: "soc-pc06"
    }
  ];

  monitors: Monitor[] = [
    {
      ip: "192.168.35.161",
      desktop: "soc-pc01",
      name: "soc-mon01",
      power: 1,
      source: "hdmi1",
      videowall: true
    },
    {
      ip: "192.168.35.162",
      desktop: "soc-pc02",
      name: "soc-mon02",
      power: 1,
      source: "hdmi1",
      videowall: false
    },
    {
      ip: "192.168.35.163",
      desktop: "soc-pc03",
      name: "soc-mon03",
      power: 1,
      source: "hdmi1",
      videowall: false
    },
    {
      ip: "192.168.35.164",
      desktop: "soc-pc04",
      name: "soc-mon04",
      power: 1,
      source: "hdmi1",
      videowall: true
    },
    {
      ip: "192.168.35.165",
      desktop: "soc-pc05",
      name: "soc-mon05",
      power: 1,
      source: "hdmi1",
      videowall: true
    },
    {
      ip: "192.168.35.166",
      desktop: "soc-pc06",
      name: "soc-mon06",
      power: 1,
      source: "hdmi1",
      videowall: false
    }
  ];

  me: Desktop = this.desktops[0];
  selectionMode = false;

  constructor(
    private route: ActivatedRoute,
    private request: RequestService,
    private notify: NotificationService
  ) {
    this.route.fragment.subscribe(f => {
      if (f) {
        const desktop = this.desktops.find(x => x.name === f);

        if (desktop) {
          this.me = desktop;
        }
      }
    });
  }

  initLoad() {
    this.request.fetchDevices().subscribe(res => {
      if (res.error) {
        this.notify.error("Das initiale Laden schlug fehl.");
      } else if (res.data) {
        console.log(res.data);

	const devices = Object.entries(res.data);

	for (let device of devices) {
	  const name = device[0];
	  const config = device[1];

	  if (config.type === "client" || config.type === "ext-client") {
		  console.log("Found a client:", name, config);
		  
		this.desktops.push({
	      ip: config.ip,
	      name: name
	    });
	  }
	}
      }
    });
  }

  loadMonitor(index: number) {
    const monitor = this.monitors[index];

    monitor.power = "pending";

    return this.request.loadDevice(monitor.name).pipe(map(res => {
      if (res.data) {
        monitor.power = res.data.power == "1" ? 1 : 0;
        monitor.videowall = res.data.videowall == "1";
	      monitor.desktop = res.data.desktop || "(missing)";
        monitor.source = res.data.source;
      } else {
        this.notify.error("Konnte den Zustand des Monitors nicht abfragen.", monitor.name);
      }

      return !res.error && res.data !== undefined;
    }));
  }

  createVideoWall() {
	  const ELEMENTS_PER_ROW = 3;
	  const monitors: string[][] = [];
	  let row: string[] = [];

	  this.monitors.forEach((m, i) => {
	  	if (m.selected) {
			row.push(m.name);
		}

		if ((i + 1) % ELEMENTS_PER_ROW === 0) {
			monitors.push(row);
			row = [];
		}
		
	  });

	  if (row.length > 0) {
	    monitors.push(row);
	  }

	  console.log("Videowall", monitors);

	  this.request.createVideoWall(monitors).subscribe(res => {
	  	console.log(res);
	  });
  }

  bindMonitor(monitor: Monitor, desktop: string): Observable<boolean> {
    const power = monitor.power;
    const current = monitor.desktop;

    monitor.power = "pending";

    return this.request.selectDesktop(monitor.name, desktop).pipe(map(res => {
      if (res.error || !res.data) {
        this.notify.error("Konnte den Monitor nicht dem Desktop zuordnen.", monitor.name);

        monitor.desktop = current;
      } else if (res.data) {
        monitor.desktop = desktop;
      }

      monitor.power = power;

      return !res.error && res.data !== undefined;
    }));
  }

  selectSource(monitor: Monitor, id: string): Observable<boolean> {
    const power = monitor.power;

    monitor.power = "pending";

    return this.request.selectSource(monitor.name, id).pipe(map(res => {
      if (res.error) {
        this.notify.error("Konnte die Quelle nicht ändern.", monitor.name);
      } else if (res.data) {
        monitor.source = res.data;
      }

      monitor.power = power;

      return !res.error && res.data !== undefined;
    }));
  }

  toggleVideoWall(monitor: Monitor, setMode?: boolean): Observable<boolean> {
    const vw = setMode !== undefined ? setMode : !monitor.videowall;
    const power = monitor.power;

    monitor.power = "pending";

    return this.request.toggleVideoWall(monitor.name, vw ? 1 : 0).pipe(map(res => {
      if (res.error) {
        if (vw) {
          this.notify.error("Konnte den Videowand-Modus nicht einschalten.", monitor.name);
        } else {
          this.notify.error("Konnte den Videowand-Modus nicht ausschalten.", monitor.name);
        }
      } else {
        monitor.videowall = false;
      }

      monitor.power = power;

      return !res.error;
    }));
  }

  togglePower(monitor: Monitor, setPower?: PowerState): Observable<boolean> {
    const power = setPower !== undefined ? setPower : !monitor.power;

    monitor.power = "pending";

    return this.request.togglePower(monitor.name, power ? 1 : 0).pipe(map(res => {
      if (res.error) {
        monitor.power = !power ? 1 : 0;

        if (power) {
          this.notify.error("Konnte den Monitor nicht einschalten.", monitor.name);
        } else {
          this.notify.error("Konnte den Monitor nicht ausschalten.", monitor.name);
        }
      } else {
        monitor.power = (<PowerState>res.data);
      }

      return !res.error;
    }));
  }

}
