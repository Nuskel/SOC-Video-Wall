import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, map, of } from "rxjs";
import { Result, Response } from "../domain/request";
import { DeviceMonitor } from "../domain/monitor";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  static readonly BASE = "https://localhost:9001/api/v1";
  static readonly R_CONFIG = "";
  static readonly DEVICES = "devices";

  constructor(
    private http: HttpClient
  ) { }

  fetchConfig() {
    return this.fetchDevices();
  }

  fetchDevices() {
    return this.get<{[key: string]: any}>(`${ RequestService.R_CONFIG }/config?devices`);
  }

  togglePower(device: string, mode: 1 | 0) {
    return this.post<string, 1 | 0>(`${ RequestService.DEVICES }/${ device }/power`, mode);
  }

  toggleVideoWall(device: string, mode: 1 | 0) {
    return this.post<string, 1 | 0>(`${ RequestService.DEVICES }/${ device }/videowall`, mode);
  }

  selectSource(device: string, id: string) {
    return this.post<string, string>(`${ RequestService.DEVICES }/${ device }/source`, id, "text");
  }

  selectDesktop(desktop: string, monitor: string) {
    return this.post<string, any>(`${ RequestService.DEVICES }/aten-switch/bind`, `${ desktop },${ monitor }`);
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
