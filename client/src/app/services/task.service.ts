// TaskService is used to communicate with backend

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map, catchError } from "rxjs/operators";
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  domain = 'https://cavatica-api.sbgenomics.com';
  token;
  options; // headers

  constructor(
    private http: Http
  ) { }

  // handle unauthorized requests
  handleError(status) {
    if (status === 401) {
      return throwError('Unauthorized');
    }
  }

  // get user's info
  getMyInfo(options) { //to check if token is valid, when user tries to login(token still is not stored in localStorage)
    return this.http.get(this.domain + '/v2/user', options)
    .pipe(
      map(res => res.json()),
      catchError(e => this.handleError(e.status))
    );
  }

  // check if user is authorized (method used in route guard)
  checkAuth() {
    this.createAuthenticationHeader();
    console.log('checkAuth called, token= '+this.token);
    return this.http.get(this.domain + '/v2/user', this.options)
    .pipe(
      map(res => res.json()),
      catchError(e => this.handleError(e.status))
    );
  }

  //store token into local storage
  storeToken(token) {
    localStorage.setItem('token', token); //storing in key-value pairs
    this.token = token;
  }

  // load token from local storage
  loadToken() {
    this.token = localStorage.getItem('token');
  }

  // on logout
  logout() {
    this.token = null;
    localStorage.clear(); //clear token from localStorage
  }

  // create headers
  createAuthenticationHeader() {
    this.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'X-SBG-Auth-Token':this.token // put token into headers
      })
    })
  }

  // get tasks
  getTasks(filter) {
    this.createAuthenticationHeader();
    return this.http.get(this.domain + '/v2/tasks/'+filter, this.options)
    .pipe(
      map(res => res.json()),
      catchError(e => this.handleError(e.status))
    );
  }

  // get single task
  getSingleTask(id) {
    this.createAuthenticationHeader();
    return this.http.get(this.domain + '/v2/tasks/' + id, this.options)
    .pipe(
      map(res => res.json()),
      catchError(e => this.handleError(e.status))
    );
  }
}
