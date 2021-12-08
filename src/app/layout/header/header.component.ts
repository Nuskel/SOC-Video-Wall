import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {ControlService} from "../../shared/service/control.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public control: ControlService,
    private router: Router
  ) { }

  ngOnInit(): void {
    return;
  }

  get isSettings() {
    return this.router.url.endsWith("settings");
  }

}
