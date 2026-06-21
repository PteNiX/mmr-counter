import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-numbers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './numbers.component.html',
  styleUrl: './numbers.component.scss'
})
export class NumbersComponent {
  @Input() fullArray: number[] = [];
  @Input() currentMmr: number | string = 0;

  get maxMmr() {
    return this.fullArray.length ? Math.max(...this.fullArray) : 0;
  }

  get minMmr() {
    return this.fullArray.length ? Math.min(...this.fullArray) : 0;
  }

  get averageMmr() {
    if (!this.fullArray.length) return 0;
    const sum = this.fullArray.reduce((acc, val) => acc + val, 0);
    return Math.round(sum / this.fullArray.length);
  }

  get medianMmr() {
    if (!this.fullArray.length) return 0;
    return Math.round((this.maxMmr + this.minMmr) / 2);
  }
}