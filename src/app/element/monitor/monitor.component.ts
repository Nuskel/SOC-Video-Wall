import {Component, Input, OnInit} from '@angular/core';
import {PowerState, Sources} from "../../shared/domain/monitor";
import {ControlService} from "../../shared/service/control.service";
import {ScreenService} from "../../shared/service/screen.service";
import {RequestService} from "../../shared/service/request.service";

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {

  readonly Sources = Sources;

  @Input()
  monitorIndex = 0;

  constructor(
    public control: ControlService,
    public screen:  ScreenService,
    public request: RequestService
  ) { }

  ngOnInit(): void {
    this.control.loadMonitor(this.monitorIndex).subscribe();
  }

  togglePower() {
    this.control.togglePower(this.monitor).subscribe();
  }

  toggleVideoWall(x: any) {
    this.control.toggleVideoWall(this.monitor).subscribe(s => {
      if (!s) {
        x.toggle();
      }
    });
  }

  selectSource(x: any) {
    const current = this.source;

    this.control.selectSource(this.monitor, x.value).subscribe(success => {
      if (!success) {
        x.value = current;
      }
    });
  }

  selectDesktop(x: any) {
    this.bindMonitor(x.value, x);
  }

  selectMe(x: any) {
    if (this.control.me) {
      x.value = this.control.me.name;

      this.bindMonitor(this.control.me.name, x);
    }
  }

  bindMonitor(desktop: string, x: any) {
    const current = this.monitor.desktop;

    this.control.bindMonitor(this.monitor, desktop).subscribe(success => {
      if (!success) {
        x.value = current;
      }
    });
  }

  get monitor() {
    return this.control.monitors[this.monitorIndex];
  }

  get power() {
    return this.monitor.power;
  }

  set power(power: PowerState) {
    this.control.monitors[this.monitorIndex].power = power;
  }

  get source() {
    return this.control.monitors[this.monitorIndex].source;
  }

  sourceName(source: string) {
    return Sources.find(x => source === x.id)?.name || "???";
  }

  get videowall() {
    return this.control.monitors[this.monitorIndex].videowall;
  }

  get desktop() {
    return this.control.monitors[this.monitorIndex].desktop;
  }

  get selectionMode() {
    return this.control.selectionMode;
  }

  get selected() {
    return this.monitor.selected || false;
  }

  set selected(selected: boolean) {
    this.control.monitors[this.monitorIndex].selected = selected;
  }

  get isPending() {
    return this.power === "pending";
  }

  get controlDisabled() {
    return this.power === "pending" || this.power === 0;
  }

  get borderClass() {
    switch (this.power) {
      case 1: return "monitor-on";
      case 0: return "monitor-off";
      case "pending": return "monitor-pending";
    }
  }

  get powerToggleTitle() {
    switch (this.power) {
      case 1: return "Monitor ausschalten";
      case 0: return "Monitor anschalten";
      case "pending": return "Warten...";
    }
  }

}
