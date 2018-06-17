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
  selector: 'app-create-payment',
  templateUrl: './create-payment.component.html',
  styleUrls: ['./create-payment.component.css']
})
export class CreatePaymentComponent implements OnInit {
  public customers: Customer[];
  public billers: Biller[];
  private submitted: boolean;
  private isRequestError: boolean;
  private postErrorMessage: string;

  paymentForm: FormGroup;

  constructor(private customerService: CustomerService, private billerService: BillerService,
    private paymentService: PaymentService, private http: HttpClient, private formBuilder: FormBuilder,
    private utilsService: UtilsService) { }

  ngOnInit() {
    this.paymentForm = this.getValidators();

    this.customerService.getAll().subscribe(customers => {
      this.customers = customers;
    });

    this.billerService.getAll().subscribe(billers => {
      this.billers = billers;
    });
  }

  processForm({ value, valid }) {
    if (this.paymentForm.invalid) {
      Object.keys(this.paymentForm.controls).forEach(field => {
        const control = this.paymentForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });

      return;
    }

    this.paymentService.post(value, (res) => {
      this.isRequestError = false;
      this.paymentForm.reset();
    }, (error) => {
      this.isRequestError = true;
      this.postErrorMessage = error.message;
    });
    this.submitted = true;
  }

  displayFieldClass(field: string) {
    let control = this.paymentForm.get(field);
    if (control && (control.dirty || control.touched)) {
      return control.valid ? 'is-valid' : 'is-invalid';
    }

    return '';
  }

  private getValidators() {
    return this.formBuilder.group({
      customerId: ['', [
        Validators.required
      ]],
      billerId: ['', [
        Validators.required
      ]],
      accountNumber: ['', [
        Validators.required,
        this.isDigits
      ]],
      amount: ['', [
        Validators.required,
        this.isDigits
      ]]
    });
  }

  private isDigits(input: FormControl) {
    let isCorrect = new RegExp(/^-?(0|[1-9]\d*)?$/).test(input.value);
    return isCorrect ? null : { digits: true };
  }
}
