import {Component} from '@angular/core';
import {AccountService} from './account.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AccountService]
})
export class AppComponent {

  constructor(private accountService: AccountService, private router: Router) {
  }

  logout() {
    const loggedOut = this.accountService.logout();
    if (loggedOut) {
      this.router.navigate(['login']);
    }
  }
}
