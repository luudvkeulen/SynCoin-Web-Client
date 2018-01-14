import { Injectable, isDevMode } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpService {
  private url: string = 'https://syncoin.luudvankeulen.nl/api/';

  constructor(private http: Http) {
    if (isDevMode()) {
      this.url = 'http://localhost:8080/';
    }
  }

  createHeaders(withAuthorization: boolean): RequestOptions {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    if (withAuthorization) {
      const authorization = JSON.parse(localStorage.getItem('token'));
      if (authorization) {
        const bearerToken = authorization.token;
        headers.append('Authorization', `Bearer ${bearerToken}`);
      }
    }
    return new RequestOptions({
      headers
    });
  }

  post(endPoint: string, body: object, useAuthorization: boolean): Observable<any> {
    return this.http.post(`${this.url}${endPoint}`, body, this.createHeaders(useAuthorization));
  }

  get(endPoint: string, useAuthorization: boolean) {
    return this.http.get(`${this.url}${endPoint}`, this.createHeaders(useAuthorization));
  }
}
