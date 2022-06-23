import { Component, OnInit } from '@angular/core';
import { Sources } from "../../shared/domain/monitor";
import { ControlService } from "../../shared/service/control.service";

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  readonly Sources = Sources;

  changes = false;

  desktop?: any;
  source?: any = Sources[0];

  constructor(
    public control: ControlService
  ) {
    this.desktop = control.desktops[0];
  }

  ngOnInit(): void {
    return;
  }

  changeDesktop(desktop: any) {
    this.desktop = desktop.value;
    this.changes = true;
  }

  changeSource(source: any) {
    this.source = source.value;
    this.changes = true;
  }

  selectMe() {
    this.control.monitors.filter(m => m.selected).forEach(m => {
      this.control.bindMonitor(m, this.control.me.name).subscribe();
    });
  }

  applyChanges() {
    this.changes = false;
    this.control.monitors.filter(m => m.selected).forEach((m, i) => {
      if (this.source != undefined) {
        this.control.selectSource(m, this.source.id).subscribe();
      }

      if (this.desktop != undefined) {
        this.control.bindMonitor(m, this.desktop).subscribe();
      }
    });
  }

  selectAll() {
    this.control.monitors.forEach(m => m.selected = true);
  }

  selectNone() {
    this.control.monitors.forEach(m => m.selected = false);
  }

  toggleOn() {
    this.control.monitors.filter(m => m.selected).forEach(m => this.control.togglePower(m, 1).subscribe());
  }

  toggleOff() {
    this.control.monitors.filter(m => m.selected).forEach(m => this.control.togglePower(m, 0).subscribe());
  }

  toggleVideoWallOn() {
    this.control.monitors.filter(m => m.selected).forEach(m => this.control.toggleVideoWall(m, true).subscribe());
  }

  toggleVideoWallOff() {
    this.control.monitors.filter(m => m.selected).forEach(m => this.control.toggleVideoWall(m, false).subscribe());
  }

  get selectionMode() {
    return this.control.selectionMode;
  }

}
