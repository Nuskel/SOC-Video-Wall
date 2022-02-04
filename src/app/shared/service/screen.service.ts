import * as net from 'net';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  constructor() { }
/*
  checksum(id: number, command: number, values?: number[]) {
    let len = values ? values.length : 0;
    let checksum = id + len + command;

    values.forEach(v => checksum += v);

    return checksum;
  }

  execute(id, command, values) {
    const c = checksum(id, command, values);
    const len = values ? values.length : 0;
    const host = '192.168.35.16' + id;
    const port = 1515;

    let bytes = [0xAA, command, id, len];
    values.forEach(v => bytes.push(v));

    bytes.push(c);

    const payload = new Uint8Array(bytes);

    const client = new net.Socket();
    client.connect(1515, '192.168.35.16' + id, function() {
      console.log('<', payload);
      client.write(payload);
    });

    client.on('data', function() {
      client.destroy();
    });
  }
*/
  powerMode(id, mode: 0 | 1) {
   // this.execute(id, 0x11, [mode]);
  }

}
