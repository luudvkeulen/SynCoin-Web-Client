import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WalletService } from '../wallet.service';

@Component({
  selector: 'app-wallet-receive',
  templateUrl: './wallet-receive.component.html',
  styleUrls: ['./wallet-receive.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [WalletService]
})
export class WalletReceiveComponent implements OnInit {

  address: String;

  constructor(private walletService: WalletService) {
  }

  ngOnInit() {
    this.getBalance();
  }

  getBalance() {
    this.walletService.getWalletAddress().subscribe(result => {
      this.address = result.address;
    }, err => {
      console.log(err);
    });
  }
}
