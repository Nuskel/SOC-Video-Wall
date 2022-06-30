import { Component, OnInit } from '@angular/core';
import { Sources } from "../../shared/domain/monitor";
import { ControlService } from "../../shared/service/control.service";
import {forkJoin} from "rxjs";
import {Route, Router} from "@angular/router";

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
    public control: ControlService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.applyMeToFragment();
  }

  applyMeToFragment() {
    if (this.control.me) {
      this.router.navigateByUrl(`#${ this.control.me.name }`);
    }
  }

  changeDesktop(desktop: any) {
    const value = desktop.value;

    forkJoin([...this.control.monitors.filter(m => m.selected).map(m => this.control.bindMonitor(m, value))])
      .subscribe(() => desktop.value = "__select__");
  }

  changeSource(source: any) {
    const value = source.value;

    forkJoin([...this.control.monitors.filter(m => m.selected).map(m => this.control.selectSource(m, value))])
      .subscribe(() => source.value = "__select__");
  }

  selectMe(desktop: any) {
    const me = this.control.me;

    if (me) {
      desktop.value = me.name;

      forkJoin([...this.control.monitors.filter(m => m.selected).map(m => this.control.bindMonitor(m, me.name))])
        .subscribe(() => desktop.value = "__select__");
    }
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

  toggleVideoWall() {
    this.control.createVideoWall();
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

  get anySelected() {
    return this.control.monitors.find(m => m.selected);
  }

}
