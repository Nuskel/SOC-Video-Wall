import { Component, OnInit } from '@angular/core';
import {ControlService} from "../shared/service/control.service";
import {Desktop} from "../shared/domain/desktop";
import {RequestService} from "../shared/service/request.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  loading = false;
  devices: any;

  constructor(
    public control: ControlService,
    private request: RequestService
  ) { }

  ngOnInit(): void {
    this.fetchConfig();
  }

  isMe(desktop: Desktop): boolean {
    return desktop.name === this.control.me?.name;
  }

  fetchConfig() {
    this.loading = true;
    this.request.fetchConfig().subscribe(cfg => {
      this.devices = Object.entries((<any>cfg.data));
      this.loading = false;
    });
  }

}
