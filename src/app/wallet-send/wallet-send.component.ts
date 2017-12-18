import {Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-wallet-send',
  templateUrl: './wallet-send.component.html',
  styleUrls: ['./wallet-send.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WalletSendComponent implements OnInit {
  address: string = '';
  amount: number = 0;

  camOpen: Boolean = false;

  qrCode: String = '';

  constructor(
    private shopService: ShopService) {
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

  confirmTransaction() {
    //this.shopService.confirmTransaction(this.password, this.address, this.amount, this.data)
     // .subscribe(result => console.log(result));
  }
}
