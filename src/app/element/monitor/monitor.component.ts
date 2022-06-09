import {Component, Input, OnInit} from '@angular/core';
import {Monitor, PowerState, Sources} from "../../shared/domain/monitor";
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
    this.control.togglePower(this.monitorIndex);
  }

  toggleVideoWall() {
    this.control.toggleVideoWall(this.monitorIndex);
  }

  selectSource(x: any) {
    this.control.selectSource(this.monitorIndex, x.value);
  }

  selectDesktop(x: any) {
    this.bindMonitor(x.value);
  }

  bindMonitor(desktop: string) {
    this.control.bindMonitor(desktop, this.monitor.name).subscribe(res => {
      console.log("YES!", res);
    });
  }

  mockPending() {
    const power = this.power;

    setTimeout(() => {
      this.power = power;
    }, 2000);

    this.power = "pending";
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
