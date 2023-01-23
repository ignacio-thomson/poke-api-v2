import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;
const modules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatPaginatorModule,
  MatTableModule,
  MatSortModule
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PokemonListComponent,
    CanvasJSChart,
    FooterComponent,
  ],
  exports: [[...modules]],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    [...modules],
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
