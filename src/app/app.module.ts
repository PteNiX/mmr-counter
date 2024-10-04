import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { GraphComponent } from "./main/gpaph/graph.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NumbersComponent } from "./main/numbers/numbers.component";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { SlideToggleComponent } from './main/slide-toggle/slide-toggle.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MainComponent,
    SlideToggleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    GraphComponent,
    NumbersComponent,

    MatSlideToggleModule
    
],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
