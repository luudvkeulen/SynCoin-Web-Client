import {Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WalletService } from '../wallet.service';

@Component({
  selector: 'app-wallet-send',
  templateUrl: './wallet-send.component.html',
  styleUrls: ['./wallet-send.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [WalletService]
})
export class WalletSendComponent implements OnInit {
  amount: number = 0;
  qrCode: String = '';

  camOpen: Boolean = false;

  txFailed: Boolean = false;
  txSuccess: Boolean = false;

  showModal: Boolean = false;


  constructor(
    private walletService: WalletService) {
  }

  onQrCodeScanned(event: String): void {
    console.log('Scanned ', event);
    this.camOpen = false;
    this.qrCode = event;
  }

  ngOnInit() {
  }

  isFormValid(){
    return (/^(0x)?[0-9a-f]{40}$/i.test(this.qrCode+"") && this.amount > 0)
  }

  sendTransaction(password){
    this.walletService.sendTransaction(password, this.qrCode, this.amount, false).subscribe(result => {
      this.showModal = false;
      this.txSuccess = true;
      this.txFailed = false;
    }, err => {
      this.showModal = false;
      this.txFailed = true;
      this.txSuccess = false;
    });
  }
}
