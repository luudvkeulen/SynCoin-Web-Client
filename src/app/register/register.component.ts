import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from './password-validation';
import {AccountService} from '../account.service';
import { Collapse } from './../collapse';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AccountService],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  fb: FormBuilder;
  formError: String;
  showExtra: boolean;
  registeringAccount: boolean;

constructor(fb: FormBuilder, private accountService: AccountService) {
    this.fb = fb;
    this.createForm();
    this.showExtra = false;
  }

  createForm() {
    this.registerForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(8)]],
      'passwordvalidation': ['', [Validators.required, CustomValidators.matchPassword]],
      'name': [''],
      'lastname': [''],
      'phone': [''],
      'company': [''],
      'address': ['']
    });
  }

  onSubmit(value: String) {
    this.formError = '';
    if (!this.registerForm.valid) {
      const controls = this.registerForm.controls;
      // Mark everything as touched to show all errors
      (<any>Object).values(controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    this.registeringAccount = true;
    this.accountService.registerUser(this.registerForm.getRawValue()).subscribe(success => {
      this.registerForm.reset();
      this.registeringAccount = false;
    }, (error) => {
      this.formError = 'Er ging iets fout';
      this.registeringAccount = false;
    });
  }

  ngOnInit() {
  }

}
