import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpService} from './http.service';

@Injectable()
export class WalletService {

  url = 'http://localhost:8080/wallet';

  constructor(private httpService: HttpService) {
  }

  getBalance(): Observable<any> {
    return this
      .httpService
      .get(this.url + '/balance', true)
      .map(result => result.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
