import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { ProfComponent } from './prof/prof.component';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { CalculatorComponent } from './calculator/calculator.component';
import { HttpClientModule } from '@angular/common/http';
import { CarComponent } from './car/car.component';
import { CarsComponent } from './cars/cars.component';
import { UpdateComponent } from './update/update.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule  } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';





@NgModule({
  declarations: [
    AppComponent,
    EtudiantComponent,
    ProfComponent,
    CalculatorComponent,
    CarComponent,
    CarsComponent,
    UpdateComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatInputModule ,
    MatFormFieldModule,
    MatTableModule,
    MatToolbarModule



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
