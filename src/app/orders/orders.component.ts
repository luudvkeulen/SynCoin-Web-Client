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
  isCollapsed: boolean;

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

  showContent() {
    const tdElements = document.getElementById('tableInfo').getElementsByTagName('td');
    if (tdElements != null) {
      if (!this.isCollapsed) {
        console.log('collapsed');
        for (let i = 0; i < tdElements.length; i++) {
          tdElements[i].style.overflow = 'hidden';
          tdElements[i].style.whiteSpace = 'nowrap';
          tdElements[i].style.textOverflow = 'ellipsis';
        }
        this.isCollapsed = true;
      }else if (this.isCollapsed) {
        console.log('expanded');
        for (let i = 0; i < tdElements.length; i++) {
          tdElements[i].style.whiteSpace = '';
          tdElements[i].style.maxWidth = '100px';
          tdElements[i].style.overflow = 'auto';
          tdElements[i].style.textOverflow = '';
          tdElements[i].style.wordWrap = 'break-word';
        }
        this.isCollapsed = false;
      }
    }
  }
}
