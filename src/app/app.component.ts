import { Component,OnInit } from '@angular/core';
import { HubConnection} from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './core/service/config.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  public AppParameters;
  public hubConnection!: HubConnection;
  clientId: string = '';
  title = 'spat';
 
  constructor(private http: HttpClient, private configService: ConfigService) {
    this.AppParameters = this.configService.config;
  }

  ngOnInit(): void {
    console.log('base URL ='+this.AppParameters.apiUrl  )
        this.hubConnection =new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Debug)
    .withUrl(this.AppParameters.apiUrl+"notif", {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    })
    .build();

    this.hubConnection.start().then(() => {
      
      console.log('connection started');
    }).catch(err => console.log(err));

    this.hubConnection.on('WelcomeMethodName', (data) => { 
     
    console.log('client Id:' + data);
    this .clientId = data;

    this.hubConnection.invoke('GetDataFromClient',data).catch(err => console.log(err));
  });
    this.hubConnection.onclose(() => {
  
      setTimeout(() => {
        console.log('try to re start connection');
    
        this.hubConnection.start().then(() => {
     
          console.log('connection re started');
        }).catch(err => console.log(err));
      }, 5000);
    });

    this.hubConnection.on('privateMessageMethodName', (data) => {
      console.log('private Message:' + data);
    });

    this.hubConnection.on('publicMessageMethodName', (data) => {
      console.log('public Message:' + data);
    });

    this.hubConnection.on('clientMethodName', (data) => {

      console.log('server message:' + data);
    });

    
  }

  public stopConnection() {
    this.hubConnection.stop().then(() => {
      console.log('stopped');
    }).catch(err => console.log(err));
  

  }
}
