import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordValidation} from './password-validation';
import {User} from './user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: User;

  constructor(fb: FormBuilder) {
    this.user = new User();
    this.registerForm = fb.group({
      'email': [this.user.email, Validators.required],
      'surname': [this.user.surname, Validators.required],
      'lastname': [this.user.lastname, Validators.required],
      'phone': [this.user.phone, Validators.required],
      'company': [this.user.company, Validators.required],
      'address': [this.user.address, Validators.required],
      'password': [this.user.password, Validators.required],
      'passwordvalidation': [this.user.passwordvalidation, Validators.required]
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }

  ngOnInit() {
  }

}
