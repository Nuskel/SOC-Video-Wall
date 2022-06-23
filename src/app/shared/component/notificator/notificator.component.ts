import { Component, OnInit } from '@angular/core';
import { Notification } from "../../domain/notification";
import { NotificationService } from "../../service/notification.service";

@Component({
  selector: 'app-notificator',
  templateUrl: './notificator.component.html',
  styleUrls: ['./notificator.component.scss']
})
export class NotificatorComponent implements OnInit {

  constructor(
    public service: NotificationService
  ) { }

  ngOnInit(): void {
  }

  remove(notification: Notification) {
    this.service.remove(notification.id);
  }

}
