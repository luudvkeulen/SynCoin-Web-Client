import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product';
import { Observable } from 'rxjs/Rx';
import { ShopService } from '../shop.service';
import { OrderRequest } from '../order-request';
import { SocketService } from '../socket.service';

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
  paymentReceived: Boolean = false;

  constructor(
    private shopService: ShopService,
    private socketService: SocketService) {
  }

  ngOnInit() {
  }

  resetOrder() {
    this.orderCanceled = false;
    this.paymentReceived = false;
  }

  orderProduct() {
    this.shopService.createOrder([this.product])
      .subscribe(result => {
        this.order = result.json();
        this.paymentLink = `${window.location.origin}/wallet/confirm-payment/${this.order.address}/${this.order.amount}/${this.order.data}`;
        this.showModal = true;
        this.resetOrder();
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
    this.socketService.awaitPayment()
      .subscribe(id => {
        localStorage.setItem('socket-id', id);
        window.open(`${this.paymentLink}`);
      }, () => window.open(this.paymentLink),
      () => this.paymentReceived = true);
  }
}
