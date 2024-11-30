import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';


const PolarClock = () => {
  const svgRef = useRef(null);
  const isMobile = window.innerWidth <= 480; // Define mobile screen break point
  const width = 900;
  const height = width;
  const radius = isMobile ? width / 1.73 : width / 2.5; 
  const dotRadius = isMobile ? radius / 24.6 - 9 : radius / 22 - 9; 


  const fields = [
    { radius: 0.2 * radius, interval: d3.timeYear, subinterval: d3.timeMonth, format: d3.timeFormat("%b") },
    { radius: 0.3 * radius, interval: d3.timeMonth, subinterval: d3.timeDay, format: d3.timeFormat("%d") },
    { radius: 0.4 * radius, interval: d3.timeWeek, subinterval: d3.timeDay, format: d3.timeFormat("%a") },
    { radius: 0.6 * radius, interval: d3.timeDay, subinterval: d3.timeHour, format: d3.timeFormat("%H") },
    { radius: 0.7 * radius, interval: d3.timeHour, subinterval: d3.timeMinute, format: d3.timeFormat("%M") },
    { radius: 0.8 * radius, interval: d3.timeMinute, subinterval: d3.timeSecond, format: d3.timeFormat("%S") }
  ];

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .style("display", "block")
    //   .style("font", "500 14px sans-serif");
    .style("font", "500 14px var(--sans-serif)");

    const field = svg.append("g")
      // .attr("transform", `translate(${width / 2},${height / 2 - 85})`)   // height change
      .attr("transform", `translate(${width / 2}, ${height / 2 - (isMobile ? 18 : 90)})`) 

      .selectAll("g")
      .data(fields)
      .enter()
      .append("g");

    field.append("circle")
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 0.7)
      .attr("r", d => d.radius);

    const fieldTick = field.selectAll("g")
      .data(d => {
        const date = d.interval(new Date(2000, 0, 1));
        d.range = d.subinterval.range(date, d.interval.offset(date, 1));
        return d.range.map(t => ({ time: t, field: d }));
      })
      .enter()
      .append("g")
      .attr("class", "field-tick")
      .attr("transform", (d, i) => {
        const angle = (i / d.field.range.length) * 2 * Math.PI - Math.PI / 2;
        return `translate(${Math.cos(angle) * d.field.radius},${Math.sin(angle) * d.field.radius})`;
      });

    const fieldCircle = fieldTick.append("circle")
      .attr("r", dotRadius + 3)
      .attr("fill", "black")
      .style("color", (d, i) => d3.interpolateRainbow(i / d.field.range.length * 2 * Math.PI))
      .style("transition", "fill 750ms ease-out");

    fieldTick.append("text")
      .attr("dy", "0.21em")
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      // .style("font-size", "11px")
      .style("font-size", isMobile ? "14.5px" : "11px")
      .text(d => d.field.format(d.time).slice(0, 2));

    const fieldFocus = field.append("circle")
      .attr("r", dotRadius + 3)
      .attr("fill", "none")
      .attr("stroke", "none")
      .attr("stroke-width", 1.9)
      .attr("cy", d => -d.radius)
      .style("transition", "transform 500ms ease");

    const update = () => {
      const now = Math.floor((Date.now() + 1) / 1000) * 1000;
      for (const d of fields) {
        const start = d.interval(now);
        const index = d.subinterval.count(start, now);
        d.cycle = (d.cycle || 0) + (index < d.index);
        d.index = index;
      }
      fieldCircle.attr("fill", (d, i) => i === d.field.index ? "currentColor" : "black");

      fieldFocus.attr("transform", d => `rotate(${(d.index / d.range.length + d.cycle) * 360})`);
    };

    const interval = setInterval(update, 1000);

    return () => {
      clearInterval(interval);
      svg.selectAll("*").remove(); // Clean up the SVG
    };
  }, [fields, dotRadius, width, height]);

  return(
  <>
    <svg ref={svgRef} />
  </>)
   
};

export default PolarClock;

