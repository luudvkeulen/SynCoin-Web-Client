import {AccountService} from '../account.service';
import {Router} from '@angular/router';
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component ({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AccountService]
})

export class LogoutComponent {
  loginForm: FormGroup;
  fb: FormBuilder;
  constructor(fb: FormBuilder, private accountService: AccountService, private router: Router) {
    this.fb = fb;
    this.createForm();
    this.removeToken();
  }

  ngOnInit() {
  }

  createForm() {
    this.loginForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]]
    });
  }

  removeToken() {
    const token = localStorage.getItem('token');
    if (token != null) {
      console.log('Token: ' + token);
      localStorage.removeItem('token');
      console.log('Token removed');
    }else {
      console.log('Token does not exist.');
    }
  }
}
