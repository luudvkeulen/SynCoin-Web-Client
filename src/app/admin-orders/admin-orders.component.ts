import {Component, OnInit} from '@angular/core';
import {ShopService} from '../shop.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
  providers: [ShopService]
})
export class AdminOrdersComponent implements OnInit {

  constructor(private shopService: ShopService) {
  }

  ngOnInit() {
    this.shopService.getAllOrders().subscribe(result => {
      console.log(result);
    }, err => {
      console.log(err);
    });
  }
}
