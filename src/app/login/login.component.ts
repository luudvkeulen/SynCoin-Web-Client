import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AccountService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  fb: FormBuilder;

  loginFailed: boolean;

  constructor(
    fb: FormBuilder, 
    private accountService: AccountService,
    private router: Router
  ) {
    this.fb = fb;
    this.createForm();
    this.loginFailed = false;
  }

  ngOnInit() {

  }

  createForm() {
    this.loginForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      const controls = this.loginForm.controls;
      Object.values(controls).forEach(control => control.markAsTouched());
    } else {
      this.accountService.login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value)
        .subscribe(res => {
          this.loginFailed = false;
          this.router.navigateByUrl('/wallet/balance');
        }, error => {
          this.loginFailed = true;
        });
    }
  }
}
