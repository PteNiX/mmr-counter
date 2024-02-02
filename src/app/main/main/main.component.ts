import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  errorMessage="";
  errorMessage1="";
  url="";
  urlMax='';
  title = 'mmr';
  mmrForm: any = {

    season:'17',
    race:'4',
    mode:'1',
    tag:'KAHO#31819',
       
  }

  urlTag= `https://website-backend.w3champions.com/api/players/global-search?search=${this.mmrForm.tag}&pageSize=20`;

  fullArray: any[] = [];



 urlFunction() {


  (async () => {
    const resTag  = await fetch(this.urlTag);
    const dataTag  = await resTag.json();

    this.tagReturn = dataTag;

    this.tagReturn1a = this.tagReturn.filter((e: { battleTag: string | string[]; })=>e.battleTag.includes('#') && !e.battleTag.includes(')') && !e.battleTag.includes('(') && !e.battleTag.includes('W3CHAMPIONS') && !e.battleTag.includes('W3Champions') && !e.battleTag.includes('W3CHAMPIOI'));


       }) ();

}

  tagReturn:any;
  tagReturn1a:any;

   ngOnInit ():void{
 
    this.urlFunction();

    const obsUsingConstructor = new Observable((observer) => {
      observer.next();

      const search2 = document.querySelector('.final-input');

      search2?.addEventListener('input', (event) => {

        if(this.mmrForm.tag.length>2){
        this.urlTag= `https://website-backend.w3champions.com/api/players/global-search?search=${this.mmrForm.tag.trim().replace('#', '%23')}&pageSize=20`;}
        observer.next(event);
      });
  
    });

    obsUsingConstructor.subscribe(() => this.urlFunction());
  
  }


  async showCurrentMmr () {

   
  this.url = `https://website-backend.w3champions.com/api/players/${this.mmrForm.tag.trim().replace('#', '%23')}/game-mode-stats?gateWay=20&season=${this.mmrForm.season}`;

  if(this.mmrForm.season=='all'){
    this.url = `https://website-backend.w3champions.com/api/players/${this.mmrForm.tag.trim().replace('#', '%23')}/game-mode-stats?gateWay=20&season=14`;
  }

        
      const res  = await fetch(this.url);
      const data  = await res.json();
      let queryDoc = document.querySelector(".current-mmr-number");
   
      /* console.log(this.url); */
    
      for (let i = 0; i < data.length; i++) {
        if (data[i].gameMode == `1` && data[i].gameMode == `${this.mmrForm.mode}` && data[i].race == `${this.mmrForm.race}`) {
          if(queryDoc!=null){
         queryDoc.innerHTML = data[i].mmr;
          }
        } 

       else if (data[i].gameMode != `1` && data[i].gameMode == `${this.mmrForm.mode}` ) {
          if(queryDoc!=null){
         queryDoc.innerHTML = data[i].mmr;
          }
        }      
        


}

  }

  

  async showMaxMmr () {

    if(this.mmrForm.season!='all'){

  let preUrlMax = `https://website-backend.w3champions.com/api/matches/search?playerId=${this.mmrForm.tag.trim().replace('#', '%23')}&gateway=0&offset=0&pageSize=100&season=${this.mmrForm.season}&gamemode=${this.mmrForm.mode}`

    const preres  = await fetch(preUrlMax);
    const predata  = await preres.json();

    let countGames = Math.floor(predata.count/100);
  
    for (let j=0; j<countGames+1;j++) {
    this.urlMax =
  `https://website-backend.w3champions.com/api/matches/search?playerId=${this.mmrForm.tag.trim().replace('#', '%23')}&gateway=0&offset=${j+"00"}&pageSize=100&season=${this.mmrForm.season}&gamemode=${this.mmrForm.mode}`;

  const res  = await fetch(this.urlMax);
      const data  = await res.json();

  let array = [];




  if (this.mmrForm.mode =="301") {
    for (let i = 0; i < data.matches.length; i++) {
      if (
        data.matches[i].teams[0].players[0].battleTag == `${this.mmrForm.tag.trim()}` 
      ) {
        array.push(data.matches[i].teams[0].players[0].currentMmr);
      }
      if (
        data.matches[i].teams[1].players[0].battleTag == `${this.mmrForm.tag.trim()}`  
      ) {
        array.push(data.matches[i].teams[1].players[0].currentMmr);
      }
    }

  }

  else if (this.mmrForm.mode =="203") {
    for (let i = 0; i < data.matches.length; i++) {
      if (
        data.matches[i].teams[0].players[0].battleTag == `${this.mmrForm.tag.trim()}` 
      ) {
        array.push(data.matches[i].teams[0].players[0].currentMmr);
      }
      if (
        data.matches[i].teams[1].players[0].battleTag == `${this.mmrForm.tag.trim()}`  
      ) {
        array.push(data.matches[i].teams[1].players[0].currentMmr);
      }
    }

  }

  else{
  for (let i = 0; i < data.matches.length; i++) {
    if (
      data.matches[i].teams[0].players[0].battleTag == `${this.mmrForm.tag.trim()}` &&
      data.matches[i].teams[0].players[0].race == `${this.mmrForm.race}`
    ) {
      array.push(data.matches[i].teams[0].players[0].currentMmr);
    }
    if (
      data.matches[i].teams[1].players[0].battleTag == `${this.mmrForm.tag.trim()}`  &&
      data.matches[i].teams[1].players[0].race == `${this.mmrForm.race}`
    ) {
      array.push(data.matches[i].teams[1].players[0].currentMmr);
    }
  }
}

  let av = this.fullArray;
  this.fullArray=av.concat(array);

     }

    /* console.log(this.fullArray); */

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
      queryDoc.innerHTML="0";
      
    }

    if (queryDocMin.innerHTML == Infinity) {
      queryDocMin.innerHTML = "0";
      queryDocMed.innerHTML = "0";
      queryDocAv.innerHTML = "0";
      queryDoc.innerHTML="0";
      
    }

  this.fullArray=[];

  }

  else{ 
  
  for(let i=2;i<18; i++) {

    this.mmrForm.season=i;
    let preUrlMax = `https://website-backend.w3champions.com/api/matches/search?playerId=${this.mmrForm.tag.trim().replace('#', '%23')}&gateway=0&offset=0&pageSize=100&season=${this.mmrForm.season}&gamemode=${this.mmrForm.mode}`

    const preres  = await fetch(preUrlMax);
    const predata  = await preres.json();

    let countGames = Math.floor(predata.count/100);
  
    for (let j=0; j<countGames+1;j++) {
    this.urlMax =
  `https://website-backend.w3champions.com/api/matches/search?playerId=${this.mmrForm.tag.trim().replace('#', '%23')}&gateway=0&offset=${j+"00"}&pageSize=100&season=${this.mmrForm.season}&gamemode=${this.mmrForm.mode}`;

  const res  = await fetch(this.urlMax);
      const data  = await res.json();

  let array = [];




  if (this.mmrForm.mode =="301") {
    for (let i = 0; i < data.matches.length; i++) {
      if (
        data.matches[i].teams[0].players[0].battleTag == `${this.mmrForm.tag.trim()}` 
      ) {
        array.push(data.matches[i].teams[0].players[0].currentMmr);
      }
      if (
        data.matches[i].teams[1].players[0].battleTag == `${this.mmrForm.tag.trim()}`  
      ) {
        array.push(data.matches[i].teams[1].players[0].currentMmr);
      }
    }

  }

  else if (this.mmrForm.mode =="203") {
    for (let i = 0; i < data.matches.length; i++) {
      if (
        data.matches[i].teams[0].players[0].battleTag == `${this.mmrForm.tag.trim()}` 
      ) {
        array.push(data.matches[i].teams[0].players[0].currentMmr);
      }
      if (
        data.matches[i].teams[1].players[0].battleTag == `${this.mmrForm.tag.trim()}`  
      ) {
        array.push(data.matches[i].teams[1].players[0].currentMmr);
      }
    }

  }

  else{
  for (let i = 0; i < data.matches.length; i++) {
    if (
      data.matches[i].teams[0].players[0].battleTag == `${this.mmrForm.tag.trim()}` &&
      data.matches[i].teams[0].players[0].race == `${this.mmrForm.race}`
    ) {
      array.push(data.matches[i].teams[0].players[0].currentMmr);
    }
    if (
      data.matches[i].teams[1].players[0].battleTag == `${this.mmrForm.tag.trim()}`  &&
      data.matches[i].teams[1].players[0].race == `${this.mmrForm.race}`
    ) {
      array.push(data.matches[i].teams[1].players[0].currentMmr);
    }
  }
}

  let av = this.fullArray;
  this.fullArray=av.concat(array);

     }

    console.log(this.fullArray);

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
      queryDoc.innerHTML="0";
      
    }

    if (queryDocMin.innerHTML == Infinity) {
      queryDocMin.innerHTML = "0";
      queryDocMed.innerHTML = "0";
      queryDocAv.innerHTML = "0";
      queryDoc.innerHTML="0";
      
    }


  }
  
  this.fullArray=[];

}


  }


}
