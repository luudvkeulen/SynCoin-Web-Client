import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  accountForm: FormGroup;
  fb: FormBuilder;
  formError: string;
  showExtra: boolean;
  updateSucceeded: boolean;
  updateFailed: boolean;
  user: User;

  constructor(
    fb: FormBuilder,
    private accountService: AccountService
  ) {
    this.fb = fb;
    this.showExtra = false;
    this.user = new User();

    this.createForm();
    this.accountForm.disable();
    this.getAccountData();
  }

  createForm() {
    this.accountForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'name': [''],
      'lastname': [''],
      'phone': [''],
      'company': [''],
      'address': ['']
    });
  }

  onSubmit(value: String) {
    this.formError = '';
    this.updateSucceeded = false;
    this.updateFailed = false;
    if (this.accountForm.disabled) {
      this.formError = 'U kunt nog geen wijzigingen doorvoeren omdat uw account informatie nog niet opgehaald is.';
      return;
    }

    if (!this.accountForm.valid) {
      const controls = this.accountForm.controls;
      // Mark everything as touched to show all errors
      (<any>Object).values(controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    
    this.accountService.updateData(this.user.id, this.accountForm.getRawValue()).subscribe(success => {
      this.updateSucceeded = true;
    }, (error) => {
      this.formError = 'Er ging iets fout';
      this.updateFailed = true;
    });
  }

  getAccountData() {
    this.accountService.getData().subscribe(user => {
      this.user = user;
      const hasOptionalValueBeenFilled = Object.entries(this.user)
        .filter(entry => entry[0] !== 'email' && entry[0] !== 'id')
        .some(entry => entry[1] !== '');
      this.showExtra = hasOptionalValueBeenFilled;
      this.accountForm.enable();
    });
  }

  ngOnInit() {
  }

}
