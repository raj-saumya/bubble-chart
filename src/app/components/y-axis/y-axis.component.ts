import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import * as d3 from "d3";
import { EventService } from "src/app/core/services/event.service";

@Component({
  selector: "app-y-axis",
  templateUrl: "./y-axis.component.html",
  styleUrls: ["./y-axis.component.css"],
})
export class YAxisComponent implements OnInit, OnChanges {
  @Input() height: number;
  @Input() width: number;
  @Input() margin: any;
  @Input() yScale: any;
  @Input() zoomLevel: number;

  private svg: any;
  private zoom: any;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getScrollubjectEvent().subscribe((newPos: any) => {
      this.svg
        .transition()
        .duration(0)
        .call(
          this.zoom.transform,
          d3.zoomIdentity.translate(0, newPos.y).scale(this.zoomLevel)
        );
    });

    this.svg = d3
      .select("#y-axis")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .append("g")
      .attr(
        "transform",
        "translate(" + this.margin.left + "," + this.margin.top / 2 + ")"
      );

    const yAxis = d3
      .axisLeft(this.yScale)
      .tickPadding(16)
      .tickSize(-this.width - 8 + this.margin.left);

    const gY = this.svg.append("g").attr("class", "axis").call(yAxis);

    this.zoom = d3
      .zoom()
      .scaleExtent([1, 20])
      .extent([
        [0, 0],
        [this.width, this.height],
      ]);
    this.zoom.on("zoom", (event) => this.updateChart(event, yAxis, gY));
  }

  updateChart(event, axis, axisSelector) {
    axisSelector.call(axis.scale(event.transform.rescaleY(this.yScale)));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.zoomLevel.firstChange) {
      this.svg
        .transition()
        .call(this.zoom.transform, d3.zoomIdentity.scale(this.zoomLevel));
    }
  }
}
