import { TokenserviceService } from './tokenservice.service';
import { ActivatedRoute, Router } from '@angular/router';
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




  constructor(private oauthservice: OAuthService, private route: ActivatedRoute, private token: TokenserviceService, private Router: Router) {
    this.configureSSO();
  }

  configureSSO() {
    this.oauthservice.configure(authConfig);
    this.oauthservice.loadDiscoveryDocumentAndTryLogin().catch(
      (error: Response) => {
        if (error.status == 404 || error.status == 400)
          alert("Invalid Url or Bad Request");
        else
          if (error.status == 401) {
            this.Router.navigate(['']).then(_ =>
              alert("Session Expired You Must Login"))
          }
          else
            alert("Unexpected Error occurred");
      });


  }


  login() {

    this.oauthservice.initImplicitFlow();
  }


  logout() {

    this.Router.navigate([''], { replaceUrl: true });

  }


  authorization() {


    this.token.setAccessToken(new URLSearchParams(this.route.snapshot.fragment!).get('access_token')!);
    this.token.setInstanceUrl(new URLSearchParams(this.route.snapshot.fragment!).get('instance_url')!);

    let access_token: string = this.token.getAccessToken()!;
    return access_token != "null" ? true : false;

  }








}




