import {Injectable} from '@angular/core';
import {Product} from './product';
import {HttpService} from './http.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ShopService {

  constructor(private httpService: HttpService) {
  }

  createOrder(products: Product[]) {
    return this.httpService.post('shop/order', {products: products.map(product => product.id)}, true);
  }

  confirmTransaction(password: string, address: string, amount: number, data: string) {
    return this.httpService.post('wallet/tx', {
      password,
      address,
      amount,
      data
    }, true);
  }

  getAllOrders(): Observable<any> {
    return this
      .httpService
      .get('shop/orders', true)
      /*.map(result => result.json())*/
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
