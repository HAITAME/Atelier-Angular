import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private router: Router, private http: HttpClient) {
    localStorage.setItem('jwt', '');
  }

  login() {
    const url = 'http://localhost:5000/login';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const body = {
      username: this.username,
      password: this.password
    };

    this.http.post(url, body, httpOptions)
      .subscribe((result: any) => {
        localStorage.setItem('jwt', result.data.jwt);
        this.router.navigate(['/listofcars']);
      }, (error) => {
        console.log('error', error);
      });
  }
}
