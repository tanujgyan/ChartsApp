import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { OrdertypeComponent } from './components/ordertype/ordertype.component';
import { OrderstatusComponent } from './orderstatus/orderstatus.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdertypeComponent,
    OrderstatusComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
