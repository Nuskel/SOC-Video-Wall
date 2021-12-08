import { Component, OnInit } from '@angular/core';
import { ControlService } from "../../shared/service/control.service";

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  wallMode = false;
  changes = false;

  constructor(
    public control: ControlService
  ) { }

  ngOnInit(): void {
    return;
  }

  applyChanges() {
    this.changes = false;
    this.control.monitors.filter(m => m.selected).forEach(m => m.power = "pending");

    setTimeout(() => {
      this.control.monitors.filter(m => m.selected).forEach(m => {
        m.power = "off";
      })
    }, 2000);
  }

  selectAll() {
    this.control.monitors.forEach(m => m.selected = true);
  }

  selectNone() {
    this.control.monitors.forEach(m => m.selected = false);
  }

  toggleOn() {
    this.control.monitors.filter(m => m.selected).forEach(m => m.power = "pending");

    setTimeout(() => {
      this.control.monitors.filter(m => m.selected).forEach(m => {
        m.power = "on";
      })
    }, 1200);
  }

  toggleOff() {
    this.control.monitors.filter(m => m.selected).forEach(m => m.power = "pending");

    setTimeout(() => {
      this.control.monitors.filter(m => m.selected).forEach(m => {
        m.power = "off";
      })
    }, 1200);
  }

  toggleVideoWallOn() {
    this.control.monitors.filter(m => m.selected).forEach(m => m.power = "pending");

    // TODO: validate -> dont act on powered off displays

    setTimeout(() => {
      this.control.monitors.filter(m => m.selected).forEach(m => {
        m.videowall = true;
        m.power = "on";
      })
    }, 1200);
  }

  toggleVideoWallOff() {
    this.control.monitors.filter(m => m.selected).forEach(m => m.power = "pending");

    setTimeout(() => {
      this.control.monitors.filter(m => m.selected).forEach(m => {
        m.videowall = false;
        m.power = "on";
      })
    }, 1200);
  }

  get selectionMode() {
    return this.control.selectionMode;
  }

}
