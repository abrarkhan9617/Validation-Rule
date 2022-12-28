import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { json } from 'body-parser';
import { Observable, catchError, throwError } from 'rxjs';
import { map } from 'rxjs/operators';






@Injectable({
  providedIn: 'root'
})
export class ValidationruleService {

  constructor(private HttpService: HttpClient) {
  }



  getAll(instance_url: string, access_token: string) {
    let token: string = "Bearer ";
    token = token.concat(access_token);
    return this.HttpService.get(instance_url + "/services/data/v48.0/tooling/query/?q=select+Id,Active,ValidationName,Description+from+validationrule", { 'headers': { 'Authorization': token } })
      .pipe(
        map(data => data[Object.keys(data).at(Object.keys(data).findIndex((key) => key === 'records'))?.toString()! as keyof object]),

      );
  }

  set(flag: boolean, access_token: string, instance_url: string, Id: string, metadata: any) {
    let token: string = "Bearer ";
    metadata.active = flag;
    token = token.concat(access_token);
    console.log(access_token);
    const body = {
      metadata
    };


    console.log(JSON.stringify(metadata));

    return this.HttpService.patch(instance_url + "/services/data/v56.0/tooling/sobjects/ValidationRule/" + Id, JSON.stringify(body), { 'headers': { 'Authorization': token, 'Content-Type': 'application/json' } }).subscribe(
      data => {
        console.log(data);
      }
    )


  }


  get(Id: string, access_token: string, instance_url: string) {
    let token: string = "Bearer ";
    token = token.concat(access_token);

    return this.HttpService.get(instance_url + "/services/data/v56.0/tooling/sobjects/ValidationRule/" + Id, { 'headers': { 'Authorization': token } })
      .pipe(
        map(data => data[Object.keys(data).at(Object.keys(data).findIndex((key) => key === 'Metadata'))?.toString() as keyof object]),
      );

  }


}

