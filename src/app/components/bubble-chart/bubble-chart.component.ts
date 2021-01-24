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
  selector: "app-bubble-chart",
  templateUrl: "./bubble-chart.component.html",
  styleUrls: ["./bubble-chart.component.css"],
})
export class BubbleChartComponent implements OnInit, OnChanges {
  @Input() containerId: number;
  @Input() height: number;
  @Input() width: number;
  @Input() margin: any;
  @Input() yScale: any;
  @Input() zoomLevel: number;

  private svg: any;
  private zoom: any;

  plotColors: string[] = ["", "#b07aa1", "#c3002f", "#0099ff", "#4c4c4c"];

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
    setTimeout(() => this.initGraph(), 0);
  }

  initGraph() {
    this.svg = d3
      .select(`#${this.containerId}`)
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height - this.margin.top / 2)
      .style("background", "rgba(0, 118, 168, 0.2)")
      .append("g")
      .attr("transform", "translate(" + 0 + "," + this.margin.top / 2 + ")");

    const colorIndex = Math.floor(Math.random() * 4) + 1;

    const data = Array(Math.max(Math.floor(Math.random() * 10), 4))
      .fill(0)
      .map(() => Math.floor(Math.random() * 10));

    this.svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", this.width / 2)
      .attr("cy", (d) => this.yScale(d))
      .attr("r", (d) => d * 4)
      .style("fill", this.plotColors[colorIndex])
      .style("fill-opacity", 0.8)
      .style("stroke", this.plotColors[colorIndex]);

    this.zoom = d3
      .zoom()
      .scaleExtent([1, 20])
      .extent([
        [0, 0],
        [this.width, this.height],
      ]);
    this.zoom.on("zoom", (event) => this.updateChart(event));
  }

  updateChart(event) {
    const newYScale = event.transform.rescaleY(this.yScale);
    this.svg.selectAll("circle").attr("cy", (d) => newYScale(d));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.zoomLevel.firstChange) {
      this.svg
        .transition()
        .call(this.zoom.transform, d3.zoomIdentity.scale(this.zoomLevel));
    }
  }
}
