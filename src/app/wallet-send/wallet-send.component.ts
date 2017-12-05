import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-wallet-send',
  templateUrl: './wallet-send.component.html',
  styleUrls: ['./wallet-send.component.css']
})
export class WalletSendComponent implements OnInit {
  @Input() address: string = 'test';
  @Input() amount: number = 1.5;

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
