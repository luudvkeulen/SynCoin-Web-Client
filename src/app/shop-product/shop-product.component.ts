import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../product';

@Component({
  selector: 'app-shop-product',
  templateUrl: './shop-product.component.html',
  styleUrls: ['./shop-product.component.css']
})
export class ShopProductComponent implements OnInit {
  @Input() product: Product;

  constructor() { }

  ngOnInit() {
  }

}
