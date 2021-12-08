import { Component, OnInit } from '@angular/core';
import {ControlService} from "../shared/service/control.service";
import {Desktop} from "../shared/domain/desktop";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    public control: ControlService
  ) { }

  ngOnInit(): void {
    return;
  }

  isMe(desktop: Desktop): boolean {
    return desktop.ip === this.control.me.ip;
  }

}
