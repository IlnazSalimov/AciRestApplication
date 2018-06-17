

import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer';
import { BillerService } from '../../services/biller.service';
import { Biller } from '../../models/biller';
import { Payment } from '../../models/payment';
import { RequestOptions, RequestMethod } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CreateUpdatePayment } from '../../models/createUpdatePayment';
import { ShowErrorComponent } from '../../components/show-errors/show-errors.component';
import { PaymentService } from '../../services/payment.service';
import { UtilsService } from '../../services/utils.service';


@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  public customers: Customer[];
  public billers: Biller[];

  private submitted: boolean;
  private isRequestError: boolean;
  private postErrorMessage: string;

  customerForm: FormGroup;

  constructor(private customerService: CustomerService, private http: HttpClient,
    private formBuilder: FormBuilder, private utilsService: UtilsService) { }

  ngOnInit() {
    this.customerForm = this.getValidators();

    this.customerService.getAll().subscribe(customers => {
      this.customers = customers;
    });
  }

  processForm({ value, valid }) {
    if (this.customerForm.invalid) {
      Object.keys(this.customerForm.controls).forEach(field => {
        const control = this.customerForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });

      return;
    }

    this.customerService.post(value, (res) => {
      this.isRequestError = false;
      this.customerForm.reset();
    }, (error) => {
      this.isRequestError = true;
      this.postErrorMessage = error.message;
    });
    this.submitted = true;
  }

  displayFieldClass(field: string) {
    let control = this.customerForm.get(field);
    if (control && (control.dirty || control.touched)) {
      return control.valid ? 'is-valid' : 'is-invalid';
    }

    return '';
  }

  private getValidators() {
    return this.formBuilder.group({
      firstName: ['', [
        Validators.required
      ]],
      lastName: ['', [
        Validators.required
      ]],
      dateOfBirth: ['', [
        Validators.required,
        this.isDateCorrectFormat
      ]],
      address: ['', [
        Validators.required
      ]]
    });
  }

  private isDateCorrectFormat(input: FormControl) {
    let isCorrect = new RegExp(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/).test(input.value);
    return isCorrect ? null : { date: true };
  }
}
