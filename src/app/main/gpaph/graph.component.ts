import { Component, HostListener, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss',
})
export class GraphComponent implements OnInit {
  @Input() fullArray: any[] = [];

  ngOnInit(): void {

  this.createChart();
  }

  createChart(): void {
    const windowWidth = window.innerWidth;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
 
   
    const width = windowWidth < 400 ? 350 - margin.left - margin.right : 
                  windowWidth < 450 ? 400 - margin.left - margin.right : 
                  450 - margin.left - margin.right;

    const height = windowWidth < 400 ? 200 - margin.top - margin.bottom : 
                   windowWidth < 450 ? 220 - margin.top - margin.bottom : 
                   250 - margin.top - margin.bottom;

    const yMin = Math.min(...this.fullArray);
    const yMax = Math.max(...this.fullArray);

    
    const xScale = d3.scaleLinear()
      .domain([0, this.fullArray.length - 1]) 
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain([yMin, yMax]) 
      .range([height - margin.bottom, margin.top]);

    const line = d3.line<number>()
      .x((d, i) => xScale(i))
      .y(d => yScale(d))
      .curve(d3.curveMonotoneX);

    d3.select('svg').selectAll('*').remove();

    const svg = d3.select('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xAxis = svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    xAxis.selectAll('path, line')
      .style('stroke', 'white'); 

    xAxis.selectAll('text')
      .style('fill', 'white'); 


    const yAxis = svg.append('g')
      .call(d3.axisLeft(yScale));


    yAxis.selectAll('path, line')
      .style('stroke', 'rgb(255, 215, 0)'); 

    yAxis.selectAll('text')
      .style('fill', 'rgb(255, 215, 0)'); 


    svg.append('path')
      .datum(this.fullArray)
      .attr('fill', 'none')
      .attr('stroke', '#B22222')
      .attr('stroke-width', 2)
      .attr('d', line);
      
      svg.append('text') 
      .attr('y', height + margin.bottom - 15)
      .attr('text-anchor', 'middle')
      .style('fill', 'white') 
      .text('Games'); 

      svg.append('text')
      .attr('y', height + margin.bottom - 35)
      .attr('text-anchor', 'middle')
      .style('fill', 'rgb(255, 215, 0)')
      .text('MMR'); 
    
    
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.createChart();
  }


  
}
