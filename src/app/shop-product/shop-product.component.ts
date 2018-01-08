import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product';
import { Observable } from 'rxjs/Rx';
import {ShopService} from '../shop.service';
import {OrderRequest} from '../order-request';

@Component({
  selector: 'app-shop-product',
  templateUrl: './shop-product.component.html',
  styleUrls: ['./shop-product.component.css'],
  providers: [ShopService]
})
export class ShopProductComponent implements OnInit {
  @Input() product: Product;
  paymentLink: string;
  order: OrderRequest;
  showModal: boolean = false;

  paymentTimeLimitSeconds: number = 10;

  timeLeft: number;
  countDownTimer: Observable<any>;

  orderCanceled: boolean = false;

  constructor(private shopService: ShopService) {
  }

  ngOnInit() {
  }

  resetOrder() {
    this.timeLeft = this.paymentTimeLimitSeconds;
    this.orderCanceled = false;
  }

  orderProduct() {
    const emptyFunction = () => {
    };

    this.shopService.createOrder([this.product])
      .subscribe(result => {
        this.order = result.json();
        this.paymentLink = `${window.location.origin}/wallet/confirm-payment/${this.order.address}/${this.order.amount}/${this.order.data}`;

        this.showModal = true;
        this.resetOrder();
        this.countDownTimer = Observable.timer(150, 1000)
          .take(this.timeLeft)
          // Stops counting down until one of the three expressions is true.
          .takeWhile(() => this.timeLeft !== 0 || this.orderCanceled)
          .do(emptyFunction
            , emptyFunction
            , () => {
              // This will be executed when the timer is done (when one of the three expressions above evaluate to true).
              this.cancelOrder();
            })
          .map(() => {
            --this.timeLeft
            const amountOfMinutesLeft = Math.floor((this.timeLeft / 60) % 60).toString();
            const amountOfSecondsLeft = (this.timeLeft % 60).toString();
            return `${amountOfMinutesLeft.length === 1 ? `0${amountOfMinutesLeft}` : amountOfMinutesLeft}:${amountOfSecondsLeft.length === 1 ? `0${amountOfSecondsLeft}` : amountOfSecondsLeft}`;
          });
      });
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

  openPaymentPage() {
    window.open(this.paymentLink);
  }
}
