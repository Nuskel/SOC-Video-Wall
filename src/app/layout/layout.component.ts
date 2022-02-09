import { Component, OnInit } from '@angular/core';
import {ControlService} from "../shared/service/control.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(public control: ControlService) { }

  ngOnInit(): void {
  }

}
