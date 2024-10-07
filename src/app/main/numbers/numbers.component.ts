import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-numbers',
  standalone: true,
  imports: [],
  templateUrl: './numbers.component.html',
  styleUrl: './numbers.component.scss'
})
export class NumbersComponent implements OnInit, OnChanges {
  @Input() fullArray: any[] = [];

  ngOnInit(): void {

   
    }

    ngOnChanges(changes: SimpleChanges) {
      if (changes['fullArray']) {

        this.updateMMR();
      }
    }

   updateMMR () {
    const sumOfNumbers = Math.round((this.fullArray.reduce((acc, number) => acc + number, 0))/this.fullArray.length);
    const aveOfSumb = Math.round((Math.max.apply(null, this.fullArray)+Math.min.apply(null, this.fullArray))/2);
     
    let queryDoc:any = document.querySelector(".current-mmr-number");
    let queryDocMax:any = document.querySelector(".max-mmr");
    let queryDocMin:any = document.querySelector(".min-mmr");
    let queryDocMed:any = document.querySelector(".med-mmr");
    let queryDocAv:any = document.querySelector(".av-mmr");

        
      queryDocMax.innerHTML = Math.max.apply(null, this.fullArray);
      queryDocMin.innerHTML = Math.min.apply(null, this.fullArray);
      queryDocAv.innerHTML = sumOfNumbers;
      queryDocMed.innerHTML = aveOfSumb;
  

      
     
      if (queryDocMax.innerHTML == -Infinity) {
        queryDocMax.innerHTML = "0";
        queryDocMed.innerHTML = "0";
        queryDocAv.innerHTML = "0";
        // queryDoc.innerHTML="0";
        
      }
  
      if (queryDocMin.innerHTML == Infinity) {
        queryDocMin.innerHTML = "0";
        queryDocMed.innerHTML = "0";
        queryDocAv.innerHTML = "0";
        // queryDoc.innerHTML="0";
        
      }
    }
}
