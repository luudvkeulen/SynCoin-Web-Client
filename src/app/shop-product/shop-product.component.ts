import { Component, Input, OnInit, isDevMode } from '@angular/core';
import { Product } from '../product';
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
  showModal = false;

  orderCanceled = false;

  paymentInProgress = false;
  paymentNotConfirmedByUser = true;
  transactionInProgress = false;
  transactionMined = false;

  subscription: Subscription;



  // For production when websockets don't work
  paymentInProgressNoWebsockets: Boolean = false;

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

    this.paymentInProgressNoWebsockets = false;
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
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  openPaymentPage() {
    // Websockets aren't fully functional behind an NGINX webserve (/ reverse proxy).
    // Only use websockets on localhost.
    if (isDevMode()) {
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
    } else {
      this.paymentInProgressNoWebsockets = true;
      window.open(this.paymentLink);
    }
  }
}
