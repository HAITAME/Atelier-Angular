import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarModule } from './car/car.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CarServiceService {

  private readonly headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + localStorage.getItem('jwt'));

  // url principal 
  url:string = "http://127.0.0.1:5000";

  getCarById(id_car: any) {
    console.log(this.url + '/car/' + id_car);
    return this.http.get(this.url + '/car/' + id_car, {headers:this.headers});
 }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http:HttpClient) { }


  saveCare(car:CarModule){

    console.log(this.url+"/savecar");

    console.log("car service" + car);

    return this.http.post(this.url+"/savecar" , car ,   {headers:this.headers}  );

  }
  getAllcars():Observable<CarModule[]>{

     return  this.http.get<CarModule[]>(this.url+"/cars" ,  {headers:this.headers} );



  }
  
  deleteCar(id: number): Observable<any> {
    return this.http.delete(`${this.url}/deletecar/${id}`,  {headers:this.headers} );
  }
  updateCar(car:CarModule): Observable<CarModule> {
    console.log("update22 !!!!")
    // id : number =car.id_car;
    console.log("id : "+car.id_car);
    console.log("marque : "+car.marque);
    console.log("model : "+car.model);
    console.log("hp : "+car.hp);


    return this.http.put<CarModule>(this.url+"/updatecar/"+car.id_car, car,   {headers:this.headers} );
  }




}
