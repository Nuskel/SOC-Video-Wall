import {Component, Input, OnInit} from '@angular/core';
import {Monitor, PowerState} from "../../shared/domain/monitor";
import {ControlService} from "../../shared/service/control.service";
import {ScreenService} from "../../shared/service/screen.service";
import {RequestService} from "../../shared/service/request.service";

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {

  @Input()
  monitorIndex = 0;

  constructor(
    public control: ControlService,
    public screen:  ScreenService,
    public request: RequestService
  ) { }

  ngOnInit(): void {
    return;
  }

  togglePower() {
    const power = this.power;

    if (power === 0) {
      this.power = "pending";
      this.request.togglePower(this.monitor.name, 1).subscribe(res => {
        if (res.error) {
          this.power = power;
        } else {
          this.power = (<PowerState>res.data);
        }
      });
    } else {
      this.power = "pending";
      this.request.togglePower(this.monitor.name, 0).subscribe(res => {
        if (res.error) {
          this.power = power;
        } else {
          this.power = (<PowerState>res.data);
        }
      });
    }
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
