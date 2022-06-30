import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, map, of } from "rxjs";
import { Result, Response } from "../domain/request";
import { DeviceMonitor } from "../domain/monitor";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  static readonly BASE = "https://192.168.35.38:9001/api/v1";
  static readonly R_CONFIG = "";
  static readonly DEVICES = "devices";

  constructor(
    private http: HttpClient
  ) { }

  fetchConfig() {
    return this.fetchDevices();
  }

  fetchDevices() {
    return this.get<{[key: string]: any}>(`${ RequestService.R_CONFIG }config?devices`);
  }

  togglePower(device: string, mode: 1 | 0) {
    return this.post<string, 1 | 0>(`${ RequestService.DEVICES }/${ device }/power`, mode);
  }

  toggleVideoWall(device: string, mode: 1 | 0) {
    return this.post<string, 1 | 0>(`${ RequestService.DEVICES }/${ device }/videowall_toggle`, mode);
  }

  createVideoWall(monitors: string[][]) {
	  let pattern = "";

	  for (let r = 0; r < monitors.length; r++) {
		  for (let c = 0; c < monitors[r].length; c++) {
			pattern += monitors[r][c];

			if (c < monitors[r].length - 1) {
				pattern += ",";
			}
		  }

		  if (r < monitors.length - 1) {
		  	pattern += ";";
		  }
	  }

	  return this.post< boolean, string >("videowall", pattern);
  }

  selectSource(device: string, id: string) {
    return this.post<string, string>(`${ RequestService.DEVICES }/${ device }/source`, id, "text");
  }

  selectDesktop(monitor: string, desktop: string) {
    return this.post<boolean, string>(`${ RequestService.DEVICES }/aten-switch/bind`, `${ desktop },${ monitor }`);
  }

  loadDevice(name: string) {
    return this.get<DeviceMonitor>(`${ RequestService.DEVICES }/${ name }`);
  }

  /********************
   *  Request Utility *
   ********************/

  get<T>(path: string): Response<T> {
    return this.http.get(`${ RequestService.BASE }/${ path }`, {responseType: "json", observe: "response"}).pipe(
      map(r => {
        return { data: r.body } as Result<T>; }),
      catchError(err => {
        return of({ error: err } as Result<T>);
      })
    );
  }

  post<T, K>(path: string, body: K, responseType?: any): Response<T> {
    return this.http.post<T>(`${ RequestService.BASE }/${ path }`, body, {responseType: responseType || "json", observe: "response"}).pipe(
      map(r => {
        return { data: r.body } as Result<T>; }),
      catchError(err => {
        return of({ error: err } as Result<T>);
      })
    );
  }

}
