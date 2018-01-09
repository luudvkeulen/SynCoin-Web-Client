import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnChanges {
  @Input() orders;
  _orders;
  loading = true;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const orders: SimpleChange = changes.orders;
    if (orders.currentValue != null) {
      this._orders = orders.currentValue;
      this.loading = false;
    }
  }
}
