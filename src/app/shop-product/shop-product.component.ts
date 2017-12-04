import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../product';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-shop-product',
  templateUrl: './shop-product.component.html',
  styleUrls: ['./shop-product.component.css']
})
export class ShopProductComponent implements OnInit {
  @Input() product: Product;
  showModal = false;
  address: string;

  paymentTimeLimitSeconds = 10;

  timeLeft: number;
  countDownTimer: Observable<any>;

  orderPayed = false;
  orderCanceled = false;

  constructor() {
    this.address = '0x32Be343B94f860124dC4fEe278FDCBD38C102D88';
  }

  ngOnInit() {
  }

  resetOrder() {
    this.timeLeft = this.paymentTimeLimitSeconds;
    this.orderPayed = false;
    this.orderCanceled = false;
  }

  orderProduct() {
    const doNothing = () => {
    };

    this.showModal = true;
    this.resetOrder();
    this.countDownTimer = Observable.timer(150, 1000)
      .take(this.timeLeft)
      // Stops counting down until one of the three expressions is true.
      .takeWhile(() => this.timeLeft !== 0 || this.orderPayed || this.orderCanceled)
      .do(doNothing
        , doNothing
        , () => {
          // This will be executed when the timer is done (when one of the three expressions above evaluate to true).
          if (this.orderPayed) {
            this.showOrderPayed();
          } else {
            this.cancelOrder();
          }
        })
      .map(() => {
        --this.timeLeft;
        const amountOfMinutesLeft = Math.floor((this.timeLeft / 60) % 60).toString();
        const amountOfSecondsLeft = (this.timeLeft % 60).toString();
        return `${amountOfMinutesLeft.length === 1 ? `0${amountOfMinutesLeft}` : amountOfMinutesLeft}:${amountOfSecondsLeft.length === 1 ? `0${amountOfSecondsLeft}` : amountOfSecondsLeft}`;
      });
  }

  showOrderPayed() {
    throw new Error('Method not implemented.');
  }

  cancelOrder() {
    this.orderCanceled = true;
  }

  cancelOrderAndExitModal() {
    this.cancelOrder();
    this.hideModal();
  }

  hideModal() {
    this.showModal = false;
  }
}
