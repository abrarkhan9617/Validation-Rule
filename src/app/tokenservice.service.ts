import { Router, ActivatedRoute } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenserviceService {

  access_token: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }


  setAccessToken(Access_token: string) {

    localStorage.setItem("access_token", Access_token);
    this.access_token = Access_token;

  }

  setInstanceUrl(instance_url: string) {

    localStorage.setItem("instance_url", instance_url);
  }

  getInstanceUrl() {

    return localStorage.getItem("instance_url");
  }


  getAccessToken() {
    return localStorage.getItem("access_token");
  }


}
