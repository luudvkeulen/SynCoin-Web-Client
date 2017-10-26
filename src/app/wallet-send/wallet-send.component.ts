import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-wallet-send',
  templateUrl: './wallet-send.component.html',
  styleUrls: ['./wallet-send.component.css']
})
export class WalletSendComponent implements OnInit {

  qrCode: String;

  constructor() {
  }

  onQrCodeScanned(event: String): void {
    console.log('Scanned ', event);
    this.qrCode = event;
  }

  ngOnInit() {
  }

}
