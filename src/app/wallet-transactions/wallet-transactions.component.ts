import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-wallet-transactions',
  templateUrl: './wallet-transactions.component.html',
  styleUrls: ['./wallet-transactions.component.css']
})
export class WalletTransactionsComponent implements OnInit {

  isCollapsed: boolean;

  constructor() {
  }

  ngOnInit() {
    this.showContent();
  }

  showContent() {
    if (!this.isCollapsed) {
      const tdElements = document.getElementById('tableInfo').getElementsByTagName('td');
      console.log('collapsed');
      for (let i = 0; i < tdElements.length; i++) {
        tdElements[i].style.overflow = 'hidden';
        tdElements[i].style.whiteSpace = 'nowrap';
        tdElements[i].style.textOverflow = 'ellipsis';
      }
      this.isCollapsed = true;
    }else if (this.isCollapsed) {
      const tdElements = document.getElementById('tableInfo').getElementsByTagName('td');
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
