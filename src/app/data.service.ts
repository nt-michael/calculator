import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  //fake api
  getUsers() {
    return this.http.get('https://reqres.in/api/users')
  }

  //creating a method in our data service
  firstClick() {
    return console.log('Click - Our Data method');
  }
}
