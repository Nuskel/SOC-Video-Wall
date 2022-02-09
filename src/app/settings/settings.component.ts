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
  config: {
    devices: {
      [key: string]: {
        type: string,
        name: string,
        ip: string
      }
    }
  } | null = null;

  constructor(
    public control: ControlService,
    private request: RequestService
  ) { }

  ngOnInit(): void {
    this.fetchConfig();
  }

  isMe(desktop: Desktop): boolean {
    return desktop.ip === this.control.me.ip;
  }

  fetchConfig() {
    this.loading = true;
    this.request.fetchConfig().subscribe(cfg => {
      (<any>this.config) = cfg;
      this.loading = false;
    });
  }

  get devices() {
    if (this.config) {
      return Object.entries(this.config.devices).filter(x => x[1].type !== "config");
    }

    return [];
  }

}
