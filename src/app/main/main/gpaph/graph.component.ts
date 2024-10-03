import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss'
})
export class GraphComponent implements OnInit {
  @Input() fullArray: any[] = [];

  ngOnInit(): void {

  this.createChart();
  }

  createChart(): void {
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Задаем диапазоны
    const yMin = Math.min(...this.fullArray);
    const yMax = Math.max(...this.fullArray);

    // Шкалы
    const xScale = d3.scaleLinear()
      .domain([0, this.fullArray.length - 1]) // По-прежнему используем индекс для оси X
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain([yMin, yMax]) // Устанавливаем диапазон для Y-оси
      .range([height - margin.bottom, margin.top]);

    // Линия для графика
    const line = d3.line<number>()
      .x((d, i) => xScale(i))
      .y(d => yScale(d))
      .curve(d3.curveMonotoneX);

    // Очищаем предыдущий график
    d3.select('svg').selectAll('*').remove();

    // Выбираем элемент SVG и задаем ему размеры
    const svg = d3.select('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Добавляем ось X
    const xAxis = svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    // Изменяем цвет оси X
    xAxis.selectAll('path, line')
      .style('stroke', 'white'); // Цвет линий оси

    xAxis.selectAll('text')
      .style('fill', 'white'); // Цвет подписей оси X

    // Добавляем ось Y
    const yAxis = svg.append('g')
      .call(d3.axisLeft(yScale));

    // Изменяем цвет оси Y
    yAxis.selectAll('path, line')
      .style('stroke', 'rgb(255, 215, 0)'); // Цвет линий оси

    yAxis.selectAll('text')
      .style('fill', 'rgb(255, 215, 0)'); // Цвет подписей оси Y

    // Добавляем линию графика
    svg.append('path')
      .datum(this.fullArray)
      .attr('fill', 'none')
      .attr('stroke', '#B22222')
      .attr('stroke-width', 2)
      .attr('d', line);
      
      svg.append('text') // Подпись оси X
      // .attr('x', width / 2) // Центрируем подпись по X
      .attr('y', height + margin.bottom - 15) // Увеличьте значение для смещения вниз
      .attr('text-anchor', 'middle') // Центрируем текст
      .style('fill', 'white') // Цвет подписи
      .text('Games'); // Текст подписи

      svg.append('text') // Подпись оси Y
      .attr('y', height + margin.bottom - 35) // Увеличьте значение для смещения вниз
      // .attr('x', -margin.left) // Позиция по X
      // .attr('y', height / 2) // Центрируем подпись по Y
      // .attr('dy', '2em') // Смещение по Y
      .attr('text-anchor', 'middle') // Центрируем текст
      // .attr('transform', `rotate(-90) translate(${-height + 50}, ${-margin.left + 10})`) // Поворачиваем и перемещаем текст
      .style('fill', 'rgb(255, 215, 0)') // Цвет подписи
      .text('MMR'); // Текст подписи
    
    
  }
}
