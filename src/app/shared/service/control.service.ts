import { Injectable } from '@angular/core';
import { Monitor } from "../domain/monitor";
import {Desktop} from "../domain/desktop";

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  desktops: Desktop[] = [
    {
      ip: "192.168.35.131",
      name: "soc-pc01"
    }
  ];

  monitors: Monitor[] = [
    {
      ip: "192.168.35.161",
      desktop: "soc-pc01",
      name: "soc-mon01",
      power: "on",
      source: "HDMI 1",
      videowall: true
    },
    {
      ip: "192.168.35.162",
      desktop: "soc-pc01",
      name: "soc-mon02",
      power: "on",
      source: "HDMI 1",
      videowall: false
    },
    {
      ip: "192.168.35.163",
      desktop: "soc-pc04",
      name: "soc-mon03",
      power: "on",
      source: "HDMI 1",
      videowall: false
    },
    {
      ip: "192.168.35.164",
      desktop: "soc-pc01",
      name: "soc-mon04",
      power: "on",
      source: "HDMI 1",
      videowall: true
    },
    {
      ip: "192.168.35.165",
      desktop: "soc-pc02",
      name: "soc-mon05",
      power: "on",
      source: "HDMI 1",
      videowall: true
    },
    {
      ip: "192.168.35.166",
      desktop: "soc-pc01",
      name: "soc-mon06",
      power: "on",
      source: "HDMI 1",
      videowall: false
    }
  ];

  me: Desktop = this.desktops[0];
  selectionMode = true;

  constructor() { }

}
