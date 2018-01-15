import { Injectable, isDevMode } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';
import { User } from './user';

@Injectable()
export class AccountService {

  constructor(
    private httpService: HttpService) {
  }

  registerUser(user: JSON): Observable<any> {
    return this.httpService.post('user/register', user, false);
  }

  login(email: string, password: string): Observable<any> {
    return this.httpService.post('user/login', { email, password }, false).map((res: Response) => {
      const token = res.json() && res.json().token;
      if (token) {
        localStorage.setItem('token', JSON.stringify({ token: token }));
      }
      return res;
    });
  }

  logout(): boolean {
    const token = localStorage.getItem('token');
    if (token != null) {
      localStorage.removeItem('token');
      return true;
    } else {
      return false;
    }
  }

  getData(): Observable<User> {
    return this.httpService.get('user', true).map(result => result.json());
  }

  updateData(id: string, accountData: User): Observable<any> {
    return this.httpService.post('user/update', {
      ...accountData,
      id
    }, true);
  }

  isUserLoggedIn(): boolean {
    try {
      const tokenJSON = localStorage.getItem('token');
      const tokenObject = JSON.parse(tokenJSON);
      if (tokenObject.token) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  getToken() {
    try {
      const tokenJSON = localStorage.getItem('token');
      const tokenObject = JSON.parse(tokenJSON);
      if (tokenObject.token) {
        return tokenObject.token;
      } else {
        return '';
      }
    } catch (error) {
      return '';
    }
  }
}
