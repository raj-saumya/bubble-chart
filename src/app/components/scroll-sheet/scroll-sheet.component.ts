import { Component, Input, OnInit } from "@angular/core";
import * as d3 from "d3";
import { EventService } from "src/app/core/services/event.service";

@Component({
  selector: "app-scroll-sheet",
  templateUrl: "./scroll-sheet.component.html",
  styleUrls: ["./scroll-sheet.component.css"],
})
export class ScrollSheetComponent implements OnInit {
  @Input() height: number;
  @Input() width: number;
  @Input() margin: any;
  @Input() zoomLevel: number;

  private svg: any;
  private zoom: any;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.svg = d3
      .select("#scroll-sheet")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .append("g")
      .attr(
        "transform",
        "translate(" + this.margin.left + "," + this.margin.top / 2 + ")"
      );

    this.zoom = d3
      .zoom()
      .scaleExtent([1, 20])
      .extent([
        [0, 0],
        [this.width, this.height],
      ])
      .on("zoom", (event) => this.updateChart(event));

    this.svg
      .append("rect")
      .attr("width", this.width)
      .attr("height", this.height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .attr("x", -this.margin.left)
      .call(this.zoom);
  }

  updateChart(event) {
    this.eventService.sendScrollEvent(event.transform);
  }
}
