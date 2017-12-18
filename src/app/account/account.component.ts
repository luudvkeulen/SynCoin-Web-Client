import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor(
    fb: FormBuilder,
    private accountService: AccountService
  ) {
    this.fb = fb;
    this.createForm();
    this.showExtra = false;
  }

  createForm() {
    this.accountForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(value: String) {
    this.formError = '';
    if (!this.accountForm.valid) {
      const controls = this.accountForm.controls;
      // Mark everything as touched to show all errors
      (<any>Object).values(controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    
    this.accountService.updateData(this.accountForm.getRawValue()).subscribe(success => {
      this.accountForm.reset();
    }, (error) => {
      this.formError = 'Er ging iets fout';
    });
  }

  ngOnInit() {
  }

}
