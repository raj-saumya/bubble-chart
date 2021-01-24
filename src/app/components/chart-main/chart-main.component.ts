import { Component, OnInit } from "@angular/core";
import { EventService } from "src/app/core/services/event.service";
import * as d3 from "d3";

@Component({
  selector: "app-chart-main",
  templateUrl: "./chart-main.component.html",
  styleUrls: ["./chart-main.component.css"],
})
export class ChartMainComponent implements OnInit {
  private containerHeight: number;
  private containerWidth: number;
  private margin: any;
  private yScale: any;
  private zoomLevel = 1;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.initGraph();
  }

  initGraph() {
    this.containerHeight =
      document.getElementById("chart-main").offsetHeight - 64;
    this.containerWidth = document.getElementById("chart-main").offsetWidth;

    this.margin = {
      left: 32,
      top: 24,
    };

    this.yScale = d3
      .scaleLinear()
      .range([this.containerHeight - this.margin.top, 0])
      .domain([0, 10]);
  }

  reScale(type: string) {
    this.zoomLevel =
      type === "in" ? this.zoomLevel + 0.2 : Math.max(1, this.zoomLevel - 0.2);
    // this.eventService.sendZoomEvent(this.zoomLevel);
  }
}
