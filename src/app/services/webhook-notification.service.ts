import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebhookNotificationService {

  constructor(private http: HttpClient) { }

  listenForWebhookNotifications() {
    const url = 'https://example.com/webhook-notification';
    return this.http.post(url, {}).subscribe((response) => {
      console.log('Webhook notification received', response);
      // Ici vous pouvez prendre les mesures appropriées pour afficher la notification dans votre application.
    });
  }

}
