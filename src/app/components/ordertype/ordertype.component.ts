import { Component, OnInit } from '@angular/core';
import { SignalRService } from 'src/app/services/signalr.service'
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-ordertype',
  templateUrl: './ordertype.component.html',
  styleUrls: ['./ordertype.component.css']
})
export class OrdertypeComponent implements OnInit {

  public chartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  public chartLabels: string[] = ['Real time data for the chart'];
  public chartType: string = 'bar';
  public chartLegend: boolean = true;
  public colors: any[] = [{ backgroundColor: '#5491DA' }, { backgroundColor: '#E74C3C' }, { backgroundColor: '#82E0AA' }, { backgroundColor: '#E5E7E9' }]

  constructor(public signalRService: SignalRService, private http: HttpClient) { }

  ngOnInit() {
    this.signalRService.startConnection();
  
    this.signalRService.addTransferChartDataListener();
    this.signalRService.addBroadcastChartDataListener();
    this.startHttpRequest();
    this.signalRService.getOrderTypeList();
  }

  private startHttpRequest = () => {
    this.http.get('https://localhost:5001/api/orders')
      .subscribe(res => {
        console.log(res);
      })
  }

  public chartClicked = (event) => {
    console.log(event);
    this.signalRService.broadcastChartData();
  }

}
