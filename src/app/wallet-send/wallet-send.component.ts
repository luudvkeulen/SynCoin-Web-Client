import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { WalletService } from '../wallet.service';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-wallet-send',
  templateUrl: './wallet-send.component.html',
  styleUrls: ['./wallet-send.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [WalletService]
})
export class WalletSendComponent implements OnInit {
  amount: number = 0;
  qrCode: string = '';
  data: any = false;
  socketId: string = '';

  camOpen: Boolean = false;

  txFailed: Boolean = false;
  txSuccess: Boolean = false;

  showModal: Boolean = false;

  constructor(
    private walletService: WalletService,
    private shopService: ShopService,
    private route: ActivatedRoute) {
  }

  onQrCodeScanned(event: string): void {
    console.log('Scanned ', event);
    this.camOpen = false;
    this.qrCode = event;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params) {
        this.qrCode = params.address;
        this.amount = params.amount;
        this.data = params.data;
        if (this.data && this.data !== '') {
          this.socketId = localStorage.getItem('socket-id') || '';
        }
      }
    });
  }

  isFormValid() {
    return (/^(0x)?[0-9a-f]{40}$/i.test(this.qrCode + "") && this.amount > 0)
  }

  sendTransaction(password) {
    console.log(this.data);
    this.walletService.sendTransaction(password, this.qrCode, this.amount, this.data, this.socketId).subscribe(result => {
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
