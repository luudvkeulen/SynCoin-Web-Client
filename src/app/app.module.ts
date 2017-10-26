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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShopComponent,
    WalletComponent,
    PageNotFoundComponent,
    ShopProductsComponent
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
