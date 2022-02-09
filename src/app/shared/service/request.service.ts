import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, of} from "rxjs";
import {Result} from "../domain/request";
import {PowerState} from "../domain/monitor";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private http: HttpClient
  ) { }

  fetchConfig() {
    return this.http.get("https://localhost:9001/config");
  }

  togglePower(device: string, mode: 1 | 0) {
    return this.http.post(`https://localhost:9001/${ device }/power`, mode, {responseType: "text", observe: "response"}).pipe(map(r => { return { data: r.body } as Result<PowerState>; }), catchError(err => {
      return of({error: err} as Result<PowerState>);
    }));
  }

  execute(id: string, command: string, args: string) {}

}
