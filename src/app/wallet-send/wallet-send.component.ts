import {Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-wallet-send',
  templateUrl: './wallet-send.component.html',
  styleUrls: ['./wallet-send.component.css']
})
export class WalletSendComponent implements OnInit {
  @Input() address: string = '';
  @Input() amount: number = 0;
  data: string = '';
  password: string = '';

  showModal: boolean = false;

  qrCode: String = '';

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService) {
  }

  onQrCodeScanned(event: String): void {
    console.log('Scanned ', event);
    this.qrCode = event;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params) {
        this.address = params.address;
        this.amount = params.amount;
        this.data = params.data;
      }
    });
  }

  promptUserToConfirmTransaction() {
    this.showModal = true;
  }

  exitModal() {
    this.showModal = false;
  }

  confirmTransaction() {
    console.log(this.password);
    this.shopService.confirmTransaction(this.password, this.address, this.amount, this.data)
      .subscribe(result => console.log(result));
  }

}
