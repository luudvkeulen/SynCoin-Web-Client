import {Component, OnInit} from '@angular/core';
import {ShopService} from '../shop.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
  providers: [ShopService]
})
export class UserOrdersComponent implements OnInit {
  orders;

  constructor(private shopService: ShopService) {
  }

  ngOnInit() {
    this.shopService.getUserOrders().subscribe(result => {
      this.orders = result;
    }, err => {
      console.log(err);
    });
  }
}
