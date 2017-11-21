import { Component, OnInit } from '@angular/core';
import {Product} from '../product';

@Component({
  selector: 'app-shop-products',
  templateUrl: './shop-products.component.html',
  styleUrls: ['./shop-products.component.css']
})
export class ShopProductsComponent implements OnInit {
  products: Product[];
  constructor() {}

  ngOnInit() {
    this.generateProducts();
  }

  public generateProducts() {
    this.products = [
      {id: 1, name: 'Syn bier', description: 'Blond bier voor de bitches die niet tegen alcohol kunnen', price: 1,
        image: 'https://www.synbier.nl/wp-content/uploads/2016/07/synbier2.jpg'},
      {id: 2, name: 'Syn bier', description: 'Donker bier voor de echte mannen die weten wat lekker is', price: 1,
        image: 'data:image/jpeg;base64,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'}
      ];
  }
}
