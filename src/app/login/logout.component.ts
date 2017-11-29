import {AccountService} from '../account.service';
import {Router} from '@angular/router';
import {Component} from '@angular/core';

@Component ({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AccountService]
})

export class LogoutComponent {
  private token: String;
  
  constructor(router: Router) {
    router.navigate(['login']);
    this.removeToken();
  }

  ngOnInit() {
  }

  removeToken() {
    this.token = localStorage.getItem('token');
    if (this.token != null) {
      console.log('Token value: ' + this.token);
      localStorage.removeItem('token');
      this.token = null;
      console.log('Token removed');
      console.log('Token value: ' + localStorage.getItem('token'));
    }else {
      console.log('Token does not exist.');
    }
  }
}
