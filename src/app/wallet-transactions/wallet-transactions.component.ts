import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-wallet-transactions',
  templateUrl: './wallet-transactions.component.html',
  styleUrls: ['./wallet-transactions.component.css']
})
export class WalletTransactionsComponent implements OnInit {
  transactions;
  walletAddress;

  constructor(private walletService: WalletService) {
  isCollapsed: boolean;

  constructor() {
  }

  ngOnInit() {
    this.walletService.getUserTransactions().subscribe((result) => {
      this.transactions = result;
    }, err => {
      console.log(err);
    });

    this.walletService.getWalletAddress().subscribe(result => {
      this.walletAddress = result.address;
    }, err => {
      console.log(err);
    });
    this.showContent();
  }

  abs(value: number) {
    return Math.abs(value);
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
