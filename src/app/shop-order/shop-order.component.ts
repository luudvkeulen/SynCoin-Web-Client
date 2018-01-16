import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AccountService} from '../account.service';
import {User} from '../user';
import {ShopService} from '../shop.service';
import {Order} from '../order';
import {WalletService} from '../wallet.service';

@Component({
  selector: 'app-shop-order',
  templateUrl: './shop-order.component.html',
  styleUrls: ['./shop-order.component.css'],
  providers: [WalletService]
})
export class ShopOrderComponent implements OnInit, OnDestroy {
  protected orderId: string;
  private routeSubscription: any;
  user: User;
  order: Order;

  txFailed: Boolean = false;
  txSuccess: Boolean = false;
  showModal: Boolean = false;
  address: String;
  amount: Number;
  data: String;
  password = '';

  constructor(private route: ActivatedRoute, private accountService: AccountService,
    private shopService: ShopService, private walletService: WalletService) {
  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.orderId = params['id'];

      this.refreshOrder();
    });

    this.accountService.getData().subscribe(user => {
      this.user = user;

      console.log(user);
    });
  }

  ngOnDestroy() {
      this.routeSubscription.unsubscribe();
  }

  confirmDelivering() {
    this.shopService.confirmDelivering(this.order.id).subscribe((request) => {
      this.performRequest(request);
    });
  }

  confirmReceived() {
    this.shopService.confirmReceived(this.order.id).subscribe((request) => {
      this.performRequest(request);
    });
  }

  cancel() {
    this.shopService.cancel(this.order.id).subscribe((request) => {
      this.performRequest(request);
    });
  }

  private performRequest(request) {
    this.address = request.address;
    this.amount = request.amount;
    this.data = request.data;

    this.showModal = true;
  }

  sendTransaction(password: String) {
    this.walletService
      .sendTransaction(password, this.address, this.amount, this.data)
      .subscribe(() => {
        this.showModal = false;
        this.txSuccess = true;
        this.txFailed = false;

        this.refreshOrder();
      }, () => {
        this.showModal = false;
        this.txFailed = true;
        this.txSuccess = false;
      });
  }

  refreshOrder() {
    this.shopService.getOrder(this.orderId).subscribe(order => {
      console.log(order);

      this.order = order;
    });
  }
}
