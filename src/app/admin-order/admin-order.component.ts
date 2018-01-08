import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AccountService} from '../account.service';
import {User} from '../user';
import {ShopService} from '../shop.service';
import {Order} from '../order';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit, OnDestroy {
  protected orderId: string;
  private routeSubscription: any;
  protected user: User;
  protected order: Order;

  constructor(private route: ActivatedRoute, private accountService: AccountService,
    private shopService: ShopService) {
  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.orderId = params['id'];

      this.shopService.getOrder(this.orderId).subscribe(order => {
        this.order = order;
      });
    });

    this.accountService.getData().subscribe(user => this.user = user);
  }

  ngOnDestroy() {
      this.routeSubscription.unsubscribe();
  }

  confirmDelivering() {
    this.shopService.confirmDelivering(this.order.id).subscribe((request) => {
      window.location.assign(`${window.location.origin}/wallet/confirm-payment/${request.address}/${request.amount}/${request.data}`);
    });
  }

  confirmReceived() {
    this.shopService.confirmReceived(this.order.id).subscribe((request) => {
      window.location.assign(`${window.location.origin}/wallet/confirm-payment/${request.address}/${request.amount}/${request.data}`);
    });
  }

  cancel() {
    this.shopService.cancel(this.order.id).subscribe((request) => {
      window.location.assign(`${window.location.origin}/wallet/confirm-payment/${request.address}/${request.amount}/${request.data}`);
    });
  }
}
