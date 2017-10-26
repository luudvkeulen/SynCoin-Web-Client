import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-wallet-send',
  templateUrl: './wallet-send.component.html',
  styleUrls: ['./wallet-send.component.css']
})
export class WalletSendComponent implements OnInit {

  constructor() {
  }

  onQrCodeScanned(event): void {
    console.log('Scanned');
  }

  ngOnInit() {
  }

}
