import {Component, OnInit} from '@angular/core';
import {WalletService} from '../wallet.service';

@Component({
  selector: 'app-wallet-balance',
  templateUrl: './wallet-balance.component.html',
  styleUrls: ['./wallet-balance.component.css'],
  providers: [WalletService]
})
export class WalletBalanceComponent implements OnInit {

  balance: string;

  constructor(private walletService: WalletService) {
  }

  ngOnInit() {
    this.getBalance();
  }

  getBalance() {
    this.walletService.getBalance().subscribe(result => {
      this.balance = Number(result).toFixed(2);
    }, err => {
      console.log(err);
    });
  }
}
