import {EventEmitter, Injectable} from '@angular/core';
import {HubConnection, HubConnectionBuilder, LogLevel} from '@aspnet/signalr';
@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  message = new EventEmitter<string>();
  private hubConnection: HubConnection;

  constructor() {
    this.createConnection();
    this.register();
    this.startConnection();
  }

  private createConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5000/inform')
      .configureLogging(LogLevel.Debug)
      .build();
  }

  private register(): void {
    this.hubConnection.on('InformClient', (param: string) => {
      console.log(param);
      this.message.emit(param);
    });
  }

  private startConnection(): void {
    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started.');
      })
      .catch(err => {
        console.log('Opps!');
      });
  }
}
