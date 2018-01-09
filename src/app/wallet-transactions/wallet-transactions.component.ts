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
  }

  abs(value: number) {
    return Math.abs(value);
  }
}
