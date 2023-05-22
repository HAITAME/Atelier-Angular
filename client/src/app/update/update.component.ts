import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { CarModule } from '../car/car.module';
import { CarServiceService } from '../car-service.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  cars!:CarModule[];
  id_car!:number;
  model !:string;
  hp!:number;
  marque!:string;

  constructor(private myservice:CarServiceService , private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // this.createCarForm();
    this.activatedRoute.params.subscribe(
       (params: any) => {
        this.id_car =+ params['id_car'];
        // this.modekl = params['modele'];
        // this.hp = params['hp'];
        // this.marque = params['marque'];
      }
    );
    this.myservice.getAllcars().subscribe(
      (data)=>{
        this.cars = data;
      }
    );

  }
UpdateCar() {
  console.log("update me !!");
  let car = new CarModule()
  car.id_car =  this.id_car;
  car.model =  this.model;
  car.hp =  this.hp;
  car.marque =  this.marque;
  
  this.myservice.updateCar(car).subscribe();
}
  

}
