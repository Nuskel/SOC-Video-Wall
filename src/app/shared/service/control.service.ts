import { Injectable } from '@angular/core';
import {Monitor, PowerState} from "../domain/monitor";
import {Desktop} from "../domain/desktop";
import {RequestService} from "./request.service";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  // TODO: load from BE (/config?devices=client)
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

  // TODO: load from BE (/config?devices=monitor)
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
      desktop: "soc-pc01",
      name: "soc-mon02",
      power: 1,
      source: "hdmi1",
      videowall: false
    },
    {
      ip: "192.168.35.163",
      desktop: "soc-pc04",
      name: "soc-mon03",
      power: 1,
      source: "hdmi1",
      videowall: false
    },
    {
      ip: "192.168.35.164",
      desktop: "soc-pc01",
      name: "soc-mon04",
      power: 1,
      source: "hdmi1",
      videowall: true
    },
    {
      ip: "192.168.35.165",
      desktop: "soc-pc02",
      name: "soc-mon05",
      power: 1,
      source: "hdmi1",
      videowall: true
    },
    {
      ip: "192.168.35.166",
      desktop: "soc-pc01",
      name: "soc-mon06",
      power: 1,
      source: "hdmi1",
      videowall: false
    }
  ];

  me: Desktop = this.desktops[0];
  selectionMode = false;

  constructor(
    private request: RequestService
  ) { }

  loadMonitor(index: number) {
    const monitor = this.monitors[index];

    monitor.power = "pending";

    return this.request.loadDevice(monitor.name).pipe(tap(res => {
      if (res.data) {
        monitor.power = res.data.power === "1" ? 1 : 0;
        monitor.videowall = res.data.videowall === "1";
        monitor.source = res.data.source;
      }
    }));
  }

  bindMonitor(desktop: string, monitor: string) {
    return this.request.selectDesktop(desktop, monitor);
  }

  selectSource(index: number, id: string) {
    const monitor = this.monitors[index];
    const power = monitor.power;

    monitor.power = "pending";
    this.request.selectSource(monitor.name, id).subscribe(res => {
      if (res.error) {
        console.error(res.error);
      } else if (res.data) {
        monitor.source = res.data;
      }

      monitor.power = power;
    });
  }

  toggleVideoWall(index: number) {
    const monitor = this.monitors[index];
    const vw = monitor.videowall;
    const power = monitor.power;

    if (!vw) {
      monitor.power = "pending";
      this.request.toggleVideoWall(monitor.name, 1).subscribe(res => {
        if (res.error) {
          console.error(res.error);
        } else {
          monitor.videowall = true;
        }

        monitor.power = power;
      });
    } else {
      monitor.power = "pending";
      this.request.toggleVideoWall(monitor.name, 0).subscribe(res => {
        if (res.error) {
          console.error(res.error);
        } else {
          monitor.videowall = false;
        }

        monitor.power = power;
      });
    }
  }

  togglePower(index: number) {
    const monitor = this.monitors[index];
    const power = monitor.power;

    if (power === 0) {
      monitor.power = "pending";
      this.request.togglePower(monitor.name, 1).subscribe(res => {
        if (res.error) {
          monitor.power = power;
        } else {
          monitor.power = (<PowerState>res.data);
        }
      });
    } else {
      monitor.power = "pending";
      this.request.togglePower(monitor.name, 0).subscribe(res => {
        if (res.error) {
          monitor.power = power;
        } else {
          monitor.power = (<PowerState>res.data);
        }
      });
    }
  }

}
