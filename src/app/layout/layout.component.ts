import { Component, OnInit } from '@angular/core';
import {ControlService} from "../shared/service/control.service";
import {Router} from "@angular/router";
import { Sources } from "../shared/domain/monitor";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  readonly Sources = Sources;

  constructor(
    private router: Router,
    public control: ControlService
  ) { }

  ngOnInit(): void {

  }

  setMe(target: any) {
    const desktop = this.control.desktops.find(d => d.name === target.value);

    if (desktop) {
      this.control.me = desktop;
      this.router.navigateByUrl(`#${ desktop.name }`);
    }
  }

  getInput() {
    if (this.control.me) {
      if (this.control.me.input) {
        return Sources.find(s => s.id === this.control.me?.input)?.name || this.control.me.input;
      }
    }

    return "";
  }

}
