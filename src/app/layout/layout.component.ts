import { Component, OnInit } from '@angular/core';
import {ControlService} from "../shared/service/control.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

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

}
