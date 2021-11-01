import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { ChartModel } from '../interfaces/ChartModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SignalRService {
   constructor(private http: HttpClient) {}
  public data: ChartModel[];
  public orderstatusdata: ChartModel[];
  public bradcastedData: ChartModel[];
 readonly baseURL = 'https://teranethackathon20211030215000.azurewebsites.net/api/Orders';
private hubConnection: signalR.HubConnection
  
  getOrderTypeList()
  {
     this.http.get<ChartModel[]>(this.baseURL+"/GetOrderTypeChart").subscribe((result)=>{
        this.data= result;
      });
  }
  getOrderStatusList()
  {
     this.http.get<ChartModel[]>(this.baseURL+"/GetOrderStatusChart").subscribe((result)=>{
        this.orderstatusdata= result;
      });
  }
  
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('https://teranethackathon20211030215000.azurewebsites.net/chart')
                            .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public addTransferChartDataListener = () => {
    this.hubConnection.on('transferchartdata', (data) => {
     this.getOrderTypeList();
     this.getOrderStatusList();
    });
  }

  public broadcastChartData = () => {
    this.hubConnection.invoke('broadcastchartdata', this.data)
    .catch(err => console.error(err));
  }

  public addBroadcastChartDataListener = () => {
    this.hubConnection.on('broadcastchartdata', (data) => {
      this.bradcastedData = data;
    })
  }
}
