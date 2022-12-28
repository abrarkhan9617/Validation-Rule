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





  setRefreshToken(refresh_token: string) {

    localStorage.setItem("refresh_token", refresh_token);
  }

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


  getRefreshToken() {
    return localStorage.getItem("refresh_token");
  }

  getAccessToken() {
    return localStorage.getItem("access_token");
  }




  getNewAccesToken() {


    const body: String = `grant_type=refresh_token&client_id=3MVG9n_HvETGhr3A8CXLjbiSW.G32QdbrNlm9nSYijmV8WF56baeu6rq2VpxBeGFD5ED9jdrqzkoCtnklhWU9&client_secret=9F3D106D9197D05D32E6EAD64059054B2691A4DA095B4254486E6BFB97BA9094&refresh_token=${this.getRefreshToken()}`;





    return this.http.post("https://testcom-67e-dev-ed.develop.my.salesforce.com/services/oauth2/token", body, { 'headers': { 'content-type': 'application/x-www-form-urlencoded' } })




  }
}
