import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-shop-product',
  templateUrl: './shop-product.component.html',
  styleUrls: ['./shop-product.component.css']
})
export class ShopProductComponent implements OnInit {
  @Input() product: Product;
  showModal: boolean;
  address: string;

  timeLeft: number;
  countDown: Observable<any>;

  orderPayed: boolean = false;
  orderCanceled: boolean = false;
  
  constructor() {
    this.showModal = false;
    this.address = '0x32Be343B94f860124dC4fEe278FDCBD38C102D88';
  }

  ngOnInit() {
  }

  resetOrder() {
    this.timeLeft = 60 * 10 - 590;
    this.orderPayed = false;
    this.orderCanceled = false;
  }

  orderProduct(product: Product) {
    this.showModal = true;
    this.resetOrder();
    this.countDown = Observable.timer(150, 1000)
      .take(this.timeLeft)
      .takeWhile(() => this.timeLeft !== 0 || this.orderPayed || this.orderCanceled)
      .do(() => { }
      , () => { }
      , () => {
        if (this.orderPayed) {
          this.showOrderPayed();
        } else {
          this.cancelOrder();
        }
      })
      .map(() => {
        --this.timeLeft
        const amountOfMinutesLeft = Math.floor((this.timeLeft / 60) % 60).toString();
        const amountOfSecondsLeft = (this.timeLeft % 60).toString();
        return `${amountOfMinutesLeft.length === 1 ? `0${amountOfMinutesLeft}` : amountOfMinutesLeft}:${amountOfSecondsLeft.length === 1 ? `0${amountOfSecondsLeft}` : amountOfSecondsLeft}`;
      });
  }

  showOrderPayed() {
    throw new Error("Method not implemented.");
  }

  cancelOrder() {
    this.orderCanceled = true;
  }

  hideModal() {
    this.showModal = false;
  }
}
