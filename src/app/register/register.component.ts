import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordValidation} from './password-validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  fb: FormBuilder;

  constructor(fb: FormBuilder) {
    this.fb = fb;
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      'email': ['', Validators.required],
      'surname': ['', Validators.required],
      'lastname': ['', Validators.required],
      'phone': ['', Validators.required],
      'company': ['', Validators.required],
      'address': ['', Validators.required],
      'password': ['', Validators.required],
      'passwordvalidation': ['', Validators.required]
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }

  onSubmit(value: String) {
    console.log('Submit');
  }

  ngOnInit() {
  }

}
