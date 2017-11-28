import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ShopComponent} from './shop/shop.component';
import {WalletComponent} from './wallet/wallet.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ShopProductsComponent} from './shop-products/shop-products.component';
import {ShopOrdersComponent} from './shop-orders/shop-orders.component';
import {WalletBalanceComponent} from './wallet-balance/wallet-balance.component';
import {WalletSendComponent} from './wallet-send/wallet-send.component';
import {WalletReceiveComponent} from './wallet-receive/wallet-receive.component';
import {WalletTransactionsComponent} from './wallet-transactions/wallet-transactions.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {Product} from './product';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'shop',
    component: ShopComponent,
    children: [
      {
        path: 'products',
        component: ShopProductsComponent,
        children: [
          {
            path: 'bier',
            component: Product
          },
          {
            path: 'vlag',
            component: Product
          },
          {
            path: 'paraplu',
            component: Product
          }
        ]
      },
      {
        path: 'orders',
        component: ShopOrdersComponent
      },
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'wallet',
    component: WalletComponent,
    children: [
      {
        path: 'balance',
        component: WalletBalanceComponent
      },
      {
        path: 'send',
        component: WalletSendComponent
      },
      {
        path: 'receive',
        component: WalletReceiveComponent
      },
      {
        path: 'transactions',
        component: WalletTransactionsComponent
      },
      {
        path: '',
        redirectTo: 'balance',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
