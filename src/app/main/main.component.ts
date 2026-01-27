import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { GraphComponent } from './gpaph/graph.component';
import { NumbersComponent } from './numbers/numbers.component';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isGraphVisible: boolean = true;
  errorMessage = "";
  errorMessage1 = "";
  url = "";
  urlMax = '';
  title = 'mmr';
  mmrForm: any = {

    season:'24',
    race:'4',
    mode:'1',
    tag:'KAHO#31819',
       
  }

  urlTag= `https://website-backend.w3champions.com/api/players/global-search?search=${this.mmrForm.tag}&pageSize=20`;

  fullArray: number [] = [];

  @ViewChild(GraphComponent) private graphComponent!: GraphComponent;
  @ViewChild(NumbersComponent) private numbersComponent!: NumbersComponent;


  public triggerChartCreation(): void {
    this.graphComponent.createChart();
  }

  public triggerNumbersCount () {
    this.numbersComponent.updateMMR();
  }


  onGraphToggle(isVisible: boolean) {

    this.isGraphVisible = isVisible;
  }


private isValidBattleTag(tag: string): boolean {
  return tag.includes('#') && 
         !tag.includes(')') && 
         !tag.includes('(') && 
         !tag.toLowerCase().includes('w3champions');
}


async urlFunction(): Promise<void> {
  try {
    const resTag = await fetch(this.urlTag);
    const dataTag = await resTag.json();

    this.tagReturn = dataTag;

    this.tagReturn1a = this.tagReturn.filter((e: { battleTag: string }) => this.isValidBattleTag(e.battleTag));
  } catch (error) {
    console.error('Error fetching battle tags:', error);
  }
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
    this.url = `https://website-backend.w3champions.com/api/players/${this.mmrForm.tag.trim().replace('#', '%23')}/game-mode-stats?gateWay=20&season=${this.mmrForm.season}`;
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
        }      else{
          if(queryDoc!=null){
          queryDoc.innerHTML = '0';
          }
        }
        

}

  }

  

  async showMaxMmr () {

    if(this.mmrForm.season!='all'){
      this.fullArray=[];

  let preUrlMax = `https://website-backend.w3champions.com/api/matches/search?playerId=${this.mmrForm.tag.trim().replace('#', '%23')}&gateway=20&offset=0&pageSize=100&season=${this.mmrForm.season}&gamemode=${this.mmrForm.mode}`

    const preres  = await fetch(preUrlMax);
    const predata  = await preres.json();

    let countGames = Math.floor(predata.count/100);
  
    for (let j=0; j<countGames+1;j++) {
    this.urlMax =
  `https://website-backend.w3champions.com/api/matches/search?playerId=${this.mmrForm.tag.trim().replace('#', '%23')}&gateway=20&offset=${j+"00"}&pageSize=100&season=${this.mmrForm.season}&gamemode=${this.mmrForm.mode}`;

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

  
    this.triggerNumbersCount();
    this.triggerChartCreation();


  }

  else{ 
    this.fullArray=[];
  
  for(let i=2;i<25; i++) {

    this.mmrForm.season=i;
    let preUrlMax = `https://website-backend.w3champions.com/api/matches/search?playerId=${this.mmrForm.tag.trim().replace('#', '%23')}&gateway=20&offset=0&pageSize=100&season=${this.mmrForm.season}&gamemode=${this.mmrForm.mode}`


    const preres  = await fetch(preUrlMax);
    const predata  = await preres.json();

    let countGames = Math.floor(predata.count/100);
  
    for (let j=0; j<countGames+1;j++) {
    this.urlMax =
  `https://website-backend.w3champions.com/api/matches/search?playerId=${this.mmrForm.tag.trim().replace('#', '%23')}&gateway=20&offset=${j+"00"}&pageSize=100&season=${this.mmrForm.season}&gamemode=${this.mmrForm.mode}`;

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


    this.triggerNumbersCount();
    this.triggerChartCreation();


  }
  
  

}




  }

  showGraph(){
    console.log('gpraph work');
    this.triggerChartCreation();
  
  }

}
