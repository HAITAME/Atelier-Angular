import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { ProfComponent } from './prof/prof.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { CarComponent } from './car/car.component';
import { CarsComponent } from './cars/cars.component';
import { UpdateComponent } from './update/update.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
// url avec la componenent 
{
  path:"addcar" , component:CarComponent} ,
  {path:"lisofcars" , component:CarsComponent} ,
  {path:"calculator" , component:CalculatorComponent} ,
  {path:"updatecar/:id_car" , component:UpdateComponent} ,
  {path:"login" , component:LoginComponent} ,
  {path:"register" , component:RegisterComponent} ,

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
