import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';

@Injectable()
export class WalletService {

  url = 'http://localhost:8080/wallet';

  constructor(private httpService: HttpService) {
  }

  getBalance(): Observable<any> {
    return this
      .httpService
      .get('wallet/balance', true)
      .map(result => result.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  getWalletAddress(): Observable<any> {
    return this
      .httpService
      .get('wallet/address', true)
      .map(result => result.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  sendTransaction(password: String, address: String, amount: Number, data: Boolean): Observable<any> {
    return this
      .httpService
      .post('wallet/tx', {
        password,
        address,
        amount,
        data
      }, true)
      .map(result => result)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
