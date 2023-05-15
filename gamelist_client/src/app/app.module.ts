import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GamesService } from './games.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DisplayComponent } from './components/display/display.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [GamesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
