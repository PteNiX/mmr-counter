import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  errorMessage="";
  errorMessage1="";
  url="";
  urlMax='';
  urlMax1='';
  urlMax2='';
  urlMax3='';
  urlMax4='';
  urlMax5='';
  urlMax6='';
  urlMax7='';
  urlMax8='';
  urlMax9='';
  urlMax10='';
  urlMax11='';
  urlMax12='';
  urlMax13='';
  urlMax14='';
  urlMax15='';
  urlMax16='';
  urlMax17='';
  urlMax18='';
  urlMax19='';
  title = 'mmr';
  mmrForm: any = {
    name: 'PteN',
    number: '21803',
    season:'12',
    race:'2',
    mode:'1',
    
    
  }

    
   

  async showCurrentMmr () {
    
    this.url = `https://website-backend.w3champions.com/api/players/${this.mmrForm.name}%23${this.mmrForm.number}/game-mode-stats?gateWay=20&season=${this.mmrForm.season}`;
   
      const res  = await fetch(this.url);
      const data  = await res.json();
      let queryDoc = document.querySelector(".current-mmr-number");

      if(this.mmrForm.number<1000){
        this.errorMessage ="Number must be greater!";
           return;
      }

      else if(this.mmrForm.number>100000){
        this.errorMessage ="Number must be less!";
           return;
      }

      else {
        this.errorMessage ='';
      }

      if(this.mmrForm.name.length<'3'){
        this.errorMessage1 ="Name must be longer!";
           return;
      }

      else if(this.mmrForm.name.length>12){
        this.errorMessage1 ="Name must be shorter!";
           return;
      }

      else {
        this.errorMessage1 =''
      }
    
    
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
    this.urlMax =
  `https://website-backend.w3champions.com/api/matches/search?playerId=${this.mmrForm.name}%23${this.mmrForm.number}&gateway=0&offset=0&pageSize=100&season=${this.mmrForm.season}&gamemode=${this.mmrForm.mode}`;

  const res  = await fetch(this.urlMax);
      const data  = await res.json();
      let queryDocMax:any = document.querySelector(".max-mmr");
      let queryDocMin:any = document.querySelector(".min-mmr");
      let queryDocMed:any = document.querySelector(".med-mmr");
      let queryDocAv:any = document.querySelector(".av-mmr");




  let array = [];

  for (let i = 0; i < data.matches.length; i++) {
    if (
      data.matches[i].teams[0].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}` &&
      data.matches[i].teams[0].players[0].race == `${this.mmrForm.race}`
    ) {
      array.push(data.matches[i].teams[0].players[0].currentMmr);
    }
    if (
      data.matches[i].teams[1].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}`  &&
      data.matches[i].teams[1].players[0].race == `${this.mmrForm.race}`
    ) {
      array.push(data.matches[i].teams[1].players[0].currentMmr);
    }
  }

  if(data.count>100){
    this.urlMax2 =
    `https://website-backend.w3champions.com/api/matches/search?playerId=${this.mmrForm.name}%23${this.mmrForm.number}&gateway=0&offset=100&pageSize=100&season=${this.mmrForm.season}&gamemode=${this.mmrForm.mode}`;

    const res2  = await fetch(this.urlMax2);
    const data2  = await res2.json();

    for (let i = 0; i < data2.matches.length; i++) {
      if (
        data2.matches[i].teams[0].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}` &&
        data2.matches[i].teams[0].players[0].race == `${this.mmrForm.race}`
      ) {
        array.push(data2.matches[i].teams[0].players[0].currentMmr);
      }
      if (
        data2.matches[i].teams[1].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}`  &&
        data2.matches[i].teams[1].players[0].race == `${this.mmrForm.race}`
      ) {
        array.push(data2.matches[i].teams[1].players[0].currentMmr);
      }
    }
        
  }

  if(data.count>200){
    this.urlMax3 =
    `https://website-backend.w3champions.com/api/matches/search?playerId=${this.mmrForm.name}%23${this.mmrForm.number}&gateway=0&offset=200&pageSize=100&season=${this.mmrForm.season}&gamemode=${this.mmrForm.mode}`;

    
    const res3  = await fetch(this.urlMax3);
    const data3  = await res3.json();

    for (let i = 0; i < data3.matches.length; i++) {
      if (
        data3.matches[i].teams[0].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}` &&
        data3.matches[i].teams[0].players[0].race == `${this.mmrForm.race}` &&  data3.matches[i].teams[0].players[0].name == `${this.mmrForm.name}`
      ) {
        array.push(data3.matches[i].teams[0].players[0].currentMmr);
      }
      if (
        data3.matches[i].teams[1].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}`  &&
        data3.matches[i].teams[1].players[0].race == `${this.mmrForm.race}` &&  data3.matches[i].teams[1].players[0].name == `${this.mmrForm.name}`
      ) {
        array.push(data3.matches[i].teams[1].players[0].currentMmr);
      }
    }
    
        
  }

  if(data.count>300){
    this.urlMax4 =
    `https://website-backend.w3champions.com/api/matches/search?playerId=${this.mmrForm.name}%23${this.mmrForm.number}&gateway=0&offset=300&pageSize=100&season=${this.mmrForm.season}&gamemode=${this.mmrForm.mode}`;

    const res4  = await fetch(this.urlMax4);
    const data4  = await res4.json();

    for (let i = 0; i < data4.matches.length; i++) {
      if (
        data4.matches[i].teams[0].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}` &&
        data4.matches[i].teams[0].players[0].race == `${this.mmrForm.race}`
      ) {
        array.push(data4.matches[i].teams[0].players[0].currentMmr);
      }
      if (
        data4.matches[i].teams[1].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}`  &&
        data4.matches[i].teams[1].players[0].race == `${this.mmrForm.race}`
      ) {
        array.push(data4.matches[i].teams[1].players[0].currentMmr);

      }

    }

   
        
  }

  if(data.count>400){
    this.urlMax5 =
    `https://website-backend.w3champions.com/api/matches/search?playerId=${this.mmrForm.name}%23${this.mmrForm.number}&gateway=0&offset=400&pageSize=100&season=${this.mmrForm.season}&gamemode=${this.mmrForm.mode}`;

    const res5  = await fetch(this.urlMax5);
    const data5  = await res5.json();

    for (let i = 0; i < data5.matches.length; i++) {
      if (
        data5.matches[i].teams[0].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}` &&
        data5.matches[i].teams[0].players[0].race == `${this.mmrForm.race}`
      ) {
        array.push(data5.matches[i].teams[0].players[0].currentMmr);
      }
      if (
        data5.matches[i].teams[1].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}`  &&
        data5.matches[i].teams[1].players[0].race == `${this.mmrForm.race}`
      ) {
        array.push(data5.matches[i].teams[1].players[0].currentMmr);
      }
    }
        
  }


  if(data.count>500){
    this.urlMax6 =
    `https://website-backend.w3champions.com/api/matches/search?playerId=${this.mmrForm.name}%23${this.mmrForm.number}&gateway=0&offset=500&pageSize=100&season=${this.mmrForm.season}&gamemode=${this.mmrForm.mode}`;

    const res6  = await fetch(this.urlMax6);
    const data6  = await res6.json();

    for (let i = 0; i < data6.matches.length; i++) {
      if (
        data6.matches[i].teams[0].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}` &&
        data6.matches[i].teams[0].players[0].race == `${this.mmrForm.race}`
      ) {
        array.push(data6.matches[i].teams[0].players[0].currentMmr);
      }
      if (
        data6.matches[i].teams[1].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}`  &&
        data6.matches[i].teams[1].players[0].race == `${this.mmrForm.race}`
      ) {
        array.push(data6.matches[i].teams[1].players[0].currentMmr);
      }
    }
        
  }

  if(data.count>600){
    this.urlMax7 =
    `https://website-backend.w3champions.com/api/matches/search?playerId=${this.mmrForm.name}%23${this.mmrForm.number}&gateway=0&offset=600&pageSize=100&season=${this.mmrForm.season}&gamemode=${this.mmrForm.mode}`;

    const res7  = await fetch(this.urlMax7);
    const data7  = await res7.json();

    for (let i = 0; i < data7.matches.length; i++) {
      if (
        data7.matches[i].teams[0].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}` &&
        data7.matches[i].teams[0].players[0].race == `${this.mmrForm.race}`
      ) {
        array.push(data7.matches[i].teams[0].players[0].currentMmr);
      }
      if (
        data7.matches[i].teams[1].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}`  &&
        data7.matches[i].teams[1].players[0].race == `${this.mmrForm.race}`
      ) {
        array.push(data7.matches[i].teams[1].players[0].currentMmr);
      }
    }
        
  }

  if(data.count>700){
    this.urlMax8 =
    `https://website-backend.w3champions.com/api/matches/search?playerId=${this.mmrForm.name}%23${this.mmrForm.number}&gateway=0&offset=700&pageSize=100&season=${this.mmrForm.season}&gamemode=${this.mmrForm.mode}`;

    const res8  = await fetch(this.urlMax8);
    const data8  = await res8.json();

    for (let i = 0; i < data8.matches.length; i++) {
      if (
        data8.matches[i].teams[0].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}` &&
        data8.matches[i].teams[0].players[0].race == `${this.mmrForm.race}`
      ) {
        array.push(data8.matches[i].teams[0].players[0].currentMmr);
      }
      if (
        data8.matches[i].teams[1].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}`  &&
        data8.matches[i].teams[1].players[0].race == `${this.mmrForm.race}`
      ) {
        array.push(data8.matches[i].teams[1].players[0].currentMmr);
      }
    }
        
  }

  if(data.count>800){
    this.urlMax9 =
    `https://website-backend.w3champions.com/api/matches/search?playerId=${this.mmrForm.name}%23${this.mmrForm.number}&gateway=0&offset=800&pageSize=100&season=${this.mmrForm.season}&gamemode=${this.mmrForm.mode}`;

    const res9  = await fetch(this.urlMax9);
    const data9  = await res9.json();

    for (let i = 0; i < data9.matches.length; i++) {
      if (
        data9.matches[i].teams[0].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}` &&
        data9.matches[i].teams[0].players[0].race == `${this.mmrForm.race}`
      ) {
        array.push(data9.matches[i].teams[0].players[0].currentMmr);
      }
      if (
        data9.matches[i].teams[1].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}`  &&
        data9.matches[i].teams[1].players[0].race == `${this.mmrForm.race}`
      ) {
        array.push(data9.matches[i].teams[1].players[0].currentMmr);
      }
    }
        
  }

  if(data.count>900){
    this.urlMax10 =
    `https://website-backend.w3champions.com/api/matches/search?playerId=${this.mmrForm.name}%23${this.mmrForm.number}&gateway=0&offset=900&pageSize=100&season=${this.mmrForm.season}&gamemode=${this.mmrForm.mode}`;

    const res10  = await fetch(this.urlMax10);
    const data10  = await res10.json();

    for (let i = 0; i < data10.matches.length; i++) {
      if (
        data10.matches[i].teams[0].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}` &&
        data10.matches[i].teams[0].players[0].race == `${this.mmrForm.race}`
      ) {
        array.push(data10.matches[i].teams[0].players[0].currentMmr);
      }
      if (
        data10.matches[i].teams[1].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}`  &&
        data10.matches[i].teams[1].players[0].race == `${this.mmrForm.race}`
      ) {
        array.push(data10.matches[i].teams[1].players[0].currentMmr);
      }
    }
        
  }

  if(data.count>1000){
    this.urlMax11 =
    `https://website-backend.w3champions.com/api/matches/search?playerId=${this.mmrForm.name}%23${this.mmrForm.number}&gateway=0&offset=1000&pageSize=100&season=${this.mmrForm.season}&gamemode=${this.mmrForm.mode}`;

    const res11  = await fetch(this.urlMax11);
    const data11  = await res11.json();

    for (let i = 0; i < data11.matches.length; i++) {
      if (
        data11.matches[i].teams[0].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}` &&
        data11.matches[i].teams[0].players[0].race == `${this.mmrForm.race}`
      ) {
        array.push(data11.matches[i].teams[0].players[0].currentMmr);
      }
      if (
        data11.matches[i].teams[1].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}`  &&
        data11.matches[i].teams[1].players[0].race == `${this.mmrForm.race}`
      ) {
        array.push(data11.matches[i].teams[1].players[0].currentMmr);
      }
    }
        
  }

  if(data.count>1100){
    this.urlMax12 =
    `https://website-backend.w3champions.com/api/matches/search?playerId=${this.mmrForm.name}%23${this.mmrForm.number}&gateway=0&offset=1100&pageSize=100&season=${this.mmrForm.season}&gamemode=${this.mmrForm.mode}`;

    const res12  = await fetch(this.urlMax12);
    const data12  = await res12.json();

    for (let i = 0; i < data12.matches.length; i++) {
      if (
        data12.matches[i].teams[0].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}` &&
        data12.matches[i].teams[0].players[0].race == `${this.mmrForm.race}`
      ) {
        array.push(data12.matches[i].teams[0].players[0].currentMmr);
      }
      if (
        data12.matches[i].teams[1].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}`  &&
        data12.matches[i].teams[1].players[0].race == `${this.mmrForm.race}`
      ) {
        array.push(data12.matches[i].teams[1].players[0].currentMmr);
      }
    }
        
  }

  if(data.count>1200){
    this.urlMax13 =
    `https://website-backend.w3champions.com/api/matches/search?playerId=${this.mmrForm.name}%23${this.mmrForm.number}&gateway=0&offset=1200&pageSize=100&season=${this.mmrForm.season}&gamemode=${this.mmrForm.mode}`;

    const res13  = await fetch(this.urlMax13);
    const data13  = await res13.json();

    for (let i = 0; i < data13.matches.length; i++) {
      if (
        data13.matches[i].teams[0].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}` &&
        data13.matches[i].teams[0].players[0].race == `${this.mmrForm.race}`
      ) {
        array.push(data13.matches[i].teams[0].players[0].currentMmr);
      }
      if (
        data13.matches[i].teams[1].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}`  &&
        data13.matches[i].teams[1].players[0].race == `${this.mmrForm.race}`
      ) {
        array.push(data13.matches[i].teams[1].players[0].currentMmr);
      }
    }
        
  }


  if(data.count>1300){
    this.urlMax14 =
    `https://website-backend.w3champions.com/api/matches/search?playerId=${this.mmrForm.name}%23${this.mmrForm.number}&gateway=0&offset=1300&pageSize=100&season=${this.mmrForm.season}&gamemode=${this.mmrForm.mode}`;

    const res14  = await fetch(this.urlMax14);
    const data14  = await res14.json();

    for (let i = 0; i < data14.matches.length; i++) {
      if (
        data14.matches[i].teams[0].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}` &&
        data14.matches[i].teams[0].players[0].race == `${this.mmrForm.race}`
      ) {
        array.push(data14.matches[i].teams[0].players[0].currentMmr);
      }
      if (
        data14.matches[i].teams[1].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}`  &&
        data14.matches[i].teams[1].players[0].race == `${this.mmrForm.race}`
      ) {
        array.push(data14.matches[i].teams[1].players[0].currentMmr);
      }
    }
        
  }

  if(data.count>1400){
    this.urlMax15 =
    `https://website-backend.w3champions.com/api/matches/search?playerId=${this.mmrForm.name}%23${this.mmrForm.number}&gateway=0&offset=1400&pageSize=100&season=${this.mmrForm.season}&gamemode=${this.mmrForm.mode}`;

    const res15  = await fetch(this.urlMax15);
    const data15  = await res15.json();

    for (let i = 0; i < data15.matches.length; i++) {
      if (
        data15.matches[i].teams[0].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}` &&
        data15.matches[i].teams[0].players[0].race == `${this.mmrForm.race}`
      ) {
        array.push(data15.matches[i].teams[0].players[0].currentMmr);
      }
      if (
        data15.matches[i].teams[1].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}`  &&
        data15.matches[i].teams[1].players[0].race == `${this.mmrForm.race}`
      ) {
        array.push(data15.matches[i].teams[1].players[0].currentMmr);
      }
    }
        
  }

  if(data.count>1500){
    this.urlMax16 =
    `https://website-backend.w3champions.com/api/matches/search?playerId=${this.mmrForm.name}%23${this.mmrForm.number}&gateway=0&offset=1500&pageSize=100&season=${this.mmrForm.season}&gamemode=${this.mmrForm.mode}`;

    const res16  = await fetch(this.urlMax16);
    const data16  = await res16.json();

    for (let i = 0; i < data16.matches.length; i++) {
      if (
        data16.matches[i].teams[0].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}` &&
        data16.matches[i].teams[0].players[0].race == `${this.mmrForm.race}`
      ) {
        array.push(data16.matches[i].teams[0].players[0].currentMmr);
      }
      if (
        data16.matches[i].teams[1].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}`  &&
        data16.matches[i].teams[1].players[0].race == `${this.mmrForm.race}`
      ) {
        array.push(data16.matches[i].teams[1].players[0].currentMmr);
      }
    }
        
  }

  if(data.count>1600){
    this.urlMax17 =
    `https://website-backend.w3champions.com/api/matches/search?playerId=${this.mmrForm.name}%23${this.mmrForm.number}&gateway=0&offset=1600&pageSize=100&season=${this.mmrForm.season}&gamemode=${this.mmrForm.mode}`;

    const res17  = await fetch(this.urlMax17);
    const data17  = await res17.json();

    for (let i = 0; i < data17.matches.length; i++) {
      if (
        data17.matches[i].teams[0].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}` &&
        data17.matches[i].teams[0].players[0].race == `${this.mmrForm.race}`
      ) {
        array.push(data17.matches[i].teams[0].players[0].currentMmr);
      }
      if (
        data17.matches[i].teams[1].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}`  &&
        data17.matches[i].teams[1].players[0].race == `${this.mmrForm.race}`
      ) {
        array.push(data17.matches[i].teams[1].players[0].currentMmr);
      }
    }
        
  }

  if(data.count>1700){
    this.urlMax18 =
    `https://website-backend.w3champions.com/api/matches/search?playerId=${this.mmrForm.name}%23${this.mmrForm.number}&gateway=0&offset=1700&pageSize=100&season=${this.mmrForm.season}&gamemode=${this.mmrForm.mode}`;

    const res18  = await fetch(this.urlMax18);
    const data18  = await res18.json();

    for (let i = 0; i < data18.matches.length; i++) {
      if (
        data18.matches[i].teams[0].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}` &&
        data18.matches[i].teams[0].players[0].race == `${this.mmrForm.race}`
      ) {
        array.push(data18.matches[i].teams[0].players[0].currentMmr);
      }
      if (
        data18.matches[i].teams[1].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}`  &&
        data18.matches[i].teams[1].players[0].race == `${this.mmrForm.race}`
      ) {
        array.push(data18.matches[i].teams[1].players[0].currentMmr);
      }
    }
        
  }

  if(data.count>1800){
    this.urlMax19 =
    `https://website-backend.w3champions.com/api/matches/search?playerId=${this.mmrForm.name}%23${this.mmrForm.number}&gateway=0&offset=1800&pageSize=100&season=${this.mmrForm.season}&gamemode=${this.mmrForm.mode}`;

    const res19  = await fetch(this.urlMax19);
    const data19  = await res19.json();

    for (let i = 0; i < data19.matches.length; i++) {
      if (
        data19.matches[i].teams[0].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}` &&
        data19.matches[i].teams[0].players[0].race == `${this.mmrForm.race}`
      ) {
        array.push(data19.matches[i].teams[0].players[0].currentMmr);
      }
      if (
        data19.matches[i].teams[1].players[0].battleTag == `${this.mmrForm.name}#${this.mmrForm.number}`  &&
        data19.matches[i].teams[1].players[0].race == `${this.mmrForm.race}`
      ) {
        array.push(data19.matches[i].teams[1].players[0].currentMmr);
      }
    }

    
        
  }


  const sumOfNumbers = Math.round((array.reduce((acc, number) => acc + number, 0))/array.length);
  const aveOfSumb = Math.round((Math.max.apply(null, array)+Math.min.apply(null, array))/2);
   
  let queryDoc:any = document.querySelector(".current-mmr-number");
      
    queryDocMax.innerHTML = Math.max.apply(null, array);
    queryDocMin.innerHTML = Math.min.apply(null, array);
    queryDocAv.innerHTML = sumOfNumbers;
    queryDocMed.innerHTML = aveOfSumb;



    console.log(array);

    if(data.count>1900){
      queryDocMax.innerHTML= "Cas need a rest";
      queryDocMin.innerHTML= "Cas need a rest";
          
    }
   
    if (queryDocMax.innerHTML == -Infinity) {
      queryDocMax.innerHTML = "0";
      queryDocMed.innerHTML = "0";
      queryDocAv.innerHTML = "0";
      queryDoc.innerHTML = "0";
      
    }

    if (queryDocMin.innerHTML == Infinity) {
      queryDocMin.innerHTML = "0";
      queryDocMed.innerHTML = "0";
      queryDocAv.innerHTML = "0";
      queryDoc.innerHTML = "0";
    }



  }
  }
