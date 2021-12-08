import {Component, Input, OnInit} from '@angular/core';
import {Monitor, PowerState} from "../../shared/domain/monitor";
import {ControlService} from "../../shared/service/control.service";

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {

  @Input()
  monitorIndex = 0;

  constructor(
    public control: ControlService
  ) { }

  ngOnInit(): void {
    return;
  }

  togglePower() {
    const power = this.power;

    setTimeout(() => {
      if (power === "off") {
        this.power = "on";
      } else {
        this.power = "off";
      }
    }, 2000);

    this.power = "pending";
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
    return this.power === "pending" || this.power === "off";
  }

  get borderClass() {
    switch (this.power) {
      case "on": return "monitor-on";
      case "off": return "monitor-off";
      case "pending": return "monitor-pending";
    }
  }

  get powerToggleTitle() {
    switch (this.power) {
      case "on": return "Monitor ausschalten";
      case "off": return "Monitor anschalten";
      case "pending": return "Warten...";
    }
  }

}
