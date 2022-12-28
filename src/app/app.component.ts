import { TokenserviceService } from './tokenservice.service';
import { ActivatedRoute, Routes, Router } from '@angular/router';
import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './sso.config';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ValidationRule';
  heading = "VALIDATION RULE";




  constructor(private oauthservice: OAuthService, private route: ActivatedRoute, private token: TokenserviceService) {
    this.configureSSO();
  }

  configureSSO() {
    this.oauthservice.configure(authConfig);
    this.oauthservice.loadDiscoveryDocumentAndTryLogin().catch(
      (error: Response) => {
        if (error.status == 404 || error.status == 400)
          alert("Invalid Url or Bad Request");
        else
          alert("Unexpected Error occurred");
      });


  }


  login() {
    this.oauthservice.initImplicitFlow();
  }

  authorization() {




    this.token.setAccessToken(new URLSearchParams(this.route.snapshot.fragment!).get('access_token')!);
    this.token.setInstanceUrl(new URLSearchParams(this.route.snapshot.fragment!).get('instance_url')!);
    this.token.setRefreshToken(new URLSearchParams(this.route.snapshot.fragment!).get('refresh_token')!);

    let access_token: string = this.token.getAccessToken()!;
    return access_token != "null" ? true : false;



  }








}




