
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TokenserviceService {

  access_token: any;




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
