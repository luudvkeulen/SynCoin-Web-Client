import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from './password-validation';
import {AccountService} from '../account.service';

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

  constructor(fb: FormBuilder, private accountService: AccountService) {
    this.fb = fb;
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'name': ['', Validators.required],
      'lastname': ['', Validators.required],
      'phone': ['', Validators.required],
      'company': ['', Validators.required],
      'address': ['', Validators.required],
      'password': ['', [Validators.required, Validators.minLength(8)]],
      'passwordvalidation': ['', [Validators.required, CustomValidators.matchPassword]]
    });
  }

  onSubmit(value: String) {
    if (!this.registerForm.valid) {
      const controls = this.registerForm.controls;
      // Mark everything as touched to show all errors
      (<any>Object).values(controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    console.log('Submit');
    console.log(this.registerForm.getRawValue());
    this.accountService.registerUser(this.registerForm.getRawValue()).subscribe(success => {
      console.log('Success');
    }, errror => {
      console.log('Error message');
    });
  }

  ngOnInit() {
  }

}
