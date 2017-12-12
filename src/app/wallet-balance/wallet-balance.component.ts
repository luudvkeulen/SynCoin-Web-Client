import {Component, OnInit} from '@angular/core';
import {WalletService} from '../wallet.service';

@Component({
  selector: 'app-wallet-balance',
  templateUrl: './wallet-balance.component.html',
  styleUrls: ['./wallet-balance.component.css'],
  providers: [WalletService]
})
export class WalletBalanceComponent implements OnInit {

  balance: number;

  constructor(private walletService: WalletService) {
  }

  ngOnInit() {
    this.getBalance();
  }

  getBalance() {
    this.walletService.getBalance().subscribe(result => {
      console.log(result);
      this.balance = result / 1000000000000000000;
    }, err => {
      console.log(err);
    });
  }
}
