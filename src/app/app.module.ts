import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartMainComponent } from './components/chart-main/chart-main.component';
import { XAxisComponent } from './components/x-axis/x-axis.component';
import { YAxisComponent } from './components/y-axis/y-axis.component';
import { BubbleChartComponent } from './components/bubble-chart/bubble-chart.component';
import { ScrollSheetComponent } from './components/scroll-sheet/scroll-sheet.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartMainComponent,
    XAxisComponent,
    YAxisComponent,
    BubbleChartComponent,
    ScrollSheetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
