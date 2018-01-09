import {Component, OnInit} from '@angular/core';
import {AccountService} from '../account.service';

@Component({
  selector: 'app-shop-orders',
  templateUrl: './shop-orders.component.html',
  styleUrls: ['./shop-orders.component.css']
})
export class ShopOrdersComponent implements OnInit {
  user: String;

  constructor() {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.user = 'Fake user'; //localStorage.getItem('token');
  }
}
