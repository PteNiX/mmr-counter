import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.scss'],
 
})
export class SlideToggleComponent {
  @Output() toggleEvent = new EventEmitter<boolean>();
  isGraphVisible: boolean = true;

  toggleGraph() {
    this.isGraphVisible = !this.isGraphVisible;
    this.toggleEvent.emit(this.isGraphVisible); 
  }
}