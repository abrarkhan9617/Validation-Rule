import { TokenserviceService } from './../tokenservice.service';
import { Observable, catchError, combineLatest, observable, forkJoin, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ValidationruleService } from '../validationrule.service';
import { map, tap } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {


  Rules: any = [];

  constructor(private validationrule: ValidationruleService, private token: TokenserviceService, private router: Router) {
  }


  ngOnInit() {


    this.validationrule.getAll(this.token.getInstanceUrl()!, this.token.getAccessToken()!).subscribe(data => {
      this.Rules = data;
    },
      (error: Response) => {
        if (error.status == 404 || error.status == 400)
          alert("Invalid Url or Bad Request");
        else
          alert("Unexpected Error occurred");
      });
  }




  toggle(Active: boolean, Id: string, index: number) {

    let tempflag: boolean = this.Rules[index].Active;
    this.Rules[index].Active = Active;

    this.validationrule.get(Id, this.token.getAccessToken()!, this.token.getInstanceUrl()!).
      pipe(
        map(data => {
          let Metadata: any = data;
          return this.validationrule.set(Active, this.token.getAccessToken()!, this.token.getInstanceUrl()!, Id, Metadata);
        })).subscribe(null, (error: Response) => {
          this.Rules[index].Active = tempflag;
          if (error.status == 404 || error.status == 400)
            alert("Invalid Url or Bad Request");
          else
            alert("Unexpected Error occurred");
          return;
        })

  }


  toggleAll(flag: boolean) {
    let tempflags: any = [];
    let observable = new Array();

    for (let i = 0; i < this.Rules.length; i++) {
      tempflags[i] = this.Rules[i].Active;
      this.Rules[i].Active = flag;

      observable.push(this.validationrule.get(this.Rules[i].Id, this.token.getAccessToken()!, this.token.getInstanceUrl()!).
        pipe(
          map(data => {
            console.log(data);
            let Metadata: any = data;
            return this.validationrule.set(flag, this.token.getAccessToken()!, this.token.getInstanceUrl()!, this.Rules[i].Id, Metadata);
          })));
    }
    forkJoin(observable).subscribe(
      (data) => {
      }, (error: Response) => {
        for (let i = 0; i < this.Rules.length; i++) {
          this.Rules[i].Active = tempflags[i];
        }
        if (error.status == 404 || error.status == 400)
          alert("Invalid Url or Bad Request");
        else
          alert("Unexpected Error occurred");
      })

  }


}



