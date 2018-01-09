import {Component, OnInit} from '@angular/core';
import {WalletService} from '../wallet.service';

@Component({
  selector: 'app-wallet-transactions',
  templateUrl: './wallet-transactions.component.html',
  styleUrls: ['./wallet-transactions.component.css'],
  providers: [WalletService]
})
export class WalletTransactionsComponent implements OnInit {
  transactions;
  walletAddress;
  isCollapsed: boolean;

  constructor(private walletService: WalletService) {
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
