import { Component, OnInit } from '@angular/core';
import { ControlService } from './shared/service/control.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(private control: ControlService) {}
  
  ngOnInit() {
    this.control.initLoad();
  }

}
