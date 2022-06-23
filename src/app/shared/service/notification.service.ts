import { Injectable } from '@angular/core';
import { Notification } from "../domain/notification";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  readonly NOTIFICATION_STAY_TIME = 5000;

  notifications: Notification[] = [];

  constructor() {}

  remove(id: number) {
    this.notifications = this.notifications.filter(x => x.id !== id);
  }

  info(msg: string, title: string = "Information") {
    this.notify({ id: this.notifications.length, title, text: msg, class: "notification-text" });
  }

  error(msg: string, title: string = "Fehler") {
    this.notify({ id: this.notifications.length, title, text: msg, class: "notification-error" });
  }

  notify(notification: Notification) {
    this.notifications.push(notification);

    setTimeout(() => {
      this.remove(notification.id);
    }, this.NOTIFICATION_STAY_TIME)
  }

}
