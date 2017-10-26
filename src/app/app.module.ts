import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {ClarityModule} from 'clarity-angular';
import {AppRoutingModule} from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { WalletComponent } from './wallet/wallet.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShopProductsComponent } from './shop-products/shop-products.component';
import {ShopOrdersComponent} from './shop-orders/shop-orders.component';
import {WalletBalanceComponent} from './wallet-balance/wallet-balance.component';
import {WalletSendComponent} from './wallet-send/wallet-send.component';
import {WalletReceiveComponent} from './wallet-receive/wallet-receive.component';
import {WalletTransactionsComponent} from './wallet-transactions/wallet-transactions.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShopComponent,
    WalletComponent,
    PageNotFoundComponent,
    ShopProductsComponent,
    ShopOrdersComponent,
    WalletBalanceComponent,
    WalletSendComponent,
    WalletReceiveComponent,
    WalletTransactionsComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
