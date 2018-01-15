import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ClarityModule } from 'clarity-angular';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { WalletComponent } from './wallet/wallet.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShopProductsComponent } from './shop-products/shop-products.component';
import { ShopOrdersComponent } from './shop-orders/shop-orders.component';
import { WalletBalanceComponent } from './wallet-balance/wallet-balance.component';
import { WalletSendComponent } from './wallet-send/wallet-send.component';
import { WalletReceiveComponent } from './wallet-receive/wallet-receive.component';
import { WalletTransactionsComponent } from './wallet-transactions/wallet-transactions.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { QrScannerModule } from 'angular2-qrscanner/dist';
import { TransactionComponent } from './transaction/transaction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ShopProductComponent } from './shop-product/shop-product.component';
import { ClipboardModule } from 'ngx-clipboard';
import { QRCodeModule } from 'angular2-qrcode';
import { HttpService } from './http.service';
import { ShopService } from './shop.service';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { OrdersComponent } from './orders/orders.component';
import { ShopOrderComponent } from './shop-order/shop-order.component';
import { LoginGuard } from './login.guard';
import { AccountService } from './account.service';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { SocketService } from './socket.service';
import {CollapseDirective} from './collapse-directive';

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
    WalletTransactionsComponent,
    LoginComponent,
    RegisterComponent,
    TransactionComponent,
    ShopProductComponent,
    AccountComponent,
    AdminComponent,
    OrdersComponent,
    ShopOrderComponent,
    UserOrdersComponent,
    AdminOrdersComponent,
    CollapseDirective
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    AppRoutingModule,
    QRCodeModule,
    QrScannerModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    ClipboardModule
  ],
  providers: [
    HttpService,
    ShopService,
    AccountService,
    LoginGuard,
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
