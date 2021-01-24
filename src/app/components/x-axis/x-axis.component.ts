import { Component, OnInit } from "@angular/core";
import * as d3 from "d3";

@Component({
  selector: "app-x-axis",
  templateUrl: "./x-axis.component.html",
  styleUrls: ["./x-axis.component.css"],
})
export class XAxisComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const containerHeight = document.getElementById("chart-main").offsetHeight;
    const containerWidth = document.getElementById("chart-main").offsetWidth;

    const margin = {
      left: 32,
      top: 24,
    };

    const svg = d3
      .select("#x-axis")
      .append("svg")
      .attr("width", containerWidth)
      .attr("height", containerHeight)
      .append("g")
      .attr(
        "transform",
        "translate(" + margin.left + "," + margin.top / 2 + ")"
      );

    const x = d3
      .scaleLinear()
      .range([containerHeight - margin.top, 0])
      .domain([0, 10]);

    const yAxis = d3
      .axisBottom(x)
      .tickPadding(8)
      .tickSize(-containerHeight + margin.top);

    const gX = svg.append("g").call(yAxis);
  }
}
