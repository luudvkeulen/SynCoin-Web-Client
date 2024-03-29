import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
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
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { ShopOrderComponent } from './shop-order/shop-order.component';
import { LoginGuard } from './login.guard';

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
        component: ShopProductsComponent
      },
      {
        path: 'orders',
        component: ShopOrdersComponent
      },
      {
        path: 'order/:id',
        component: ShopOrderComponent
      },
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
      }
    ],
    canActivate: [LoginGuard]
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
        path: 'confirm-payment/:address/:amount/:data/:reference',
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
    ],
    canActivate: [LoginGuard]
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [LoginGuard]
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
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'orders',
        component: AdminOrdersComponent
      },
      {
        path: '',
        redirectTo: 'orders',
        pathMatch: 'full'
      }
    ],
    canActivate: [LoginGuard]
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
