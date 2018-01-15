import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product';
import { Observable } from 'rxjs/Rx';
import { ShopService } from '../shop.service';
import { OrderRequest } from '../order-request';
import { SocketService } from '../socket.service';
import { Subscription } from 'rxjs/Subscription';

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

  orderCanceled: boolean = false;

  paymentInProgress: Boolean = false;
  paymentNotConfirmedByUser: Boolean = true;
  transactionInProgress: Boolean = false;
  transactionMined: Boolean = false;

  subscription: Subscription;

  constructor(
    private shopService: ShopService,
    private socketService: SocketService) {
  }

  ngOnInit() {
  }

  resetOrder() {
    this.orderCanceled = false;
    this.paymentInProgress = false;
    this.paymentNotConfirmedByUser = true;
    this.transactionInProgress = false;
    this.transactionMined = false;
  }

  orderProduct() {
    this.resetOrder();
    this.shopService.createOrder([this.product])
      .subscribe(result => {
        this.order = result.json();
        this.paymentLink = `${window.location.origin}/wallet/confirm-payment/${this.order.address}/${this.order.amount}/${this.order.data}/${this.order.reference}`;
        this.showModal = true;
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
    this.subscription.unsubscribe();
  }

  openPaymentPage() {
    this.paymentInProgress = true;
    this.subscription = this.socketService.awaitPayment()
      .subscribe(event => {
        if (event.type === 'connected') {
          localStorage.setItem('socket-id', event.data.id);
          window.open(`${this.paymentLink}`);
        } else if (event.type === 'user-sent-transaction') {
          this.paymentNotConfirmedByUser = false;
          this.transactionInProgress = true;
        }
      }, () => {
        window.open(this.paymentLink);
      }, () => {
        this.paymentInProgress = false;
        this.transactionInProgress = false;
        this.transactionMined = true;
        this.subscription.unsubscribe();
      });
  }
}
