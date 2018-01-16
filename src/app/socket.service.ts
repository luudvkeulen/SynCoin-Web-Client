import { Injectable, isDevMode } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import { AccountService } from './account.service';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private url: string = 'https://syncoin.syntouch.nl/api';

  constructor(
    private accountService: AccountService
  ) {
    if (isDevMode()) {
      this.url = 'http://localhost:8080';
    }
  }

  awaitPayment(): Rx.Observable<any> {
    return Rx.Observable.create(observer => {
      const socket = io.connect(`${this.url}/await-payment`, {
        query: {
          token: this.accountService.getToken()
        },
        secure: true,
        transports: [
          'websocket',
          'flashsocket',
          'htmlfile',
          'xhr-polling',
          'jsonp-polling',
          'polling'
        ]
      });
      socket.on('connected', id => {
        observer.next({
          type: 'connected',
          data: id
        });
      });
      socket.on('user-sent-transaction', () => {
        observer.next({
          type: 'user-sent-transaction',
          data: {}
        })
      });
      socket.on('payment-received', () => {
        observer.complete();
        socket.disconnect();
      });
      return {
        dispose: socket.disconnect
      }
    });
  }
}