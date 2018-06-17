import { Component, OnInit } from '@angular/core';
import { Payment } from '../../models/payment';
import { PaymentService } from '../../services/payment.service';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Customer } from '../../models/customer';
import { Biller } from '../../models/biller';
import { CustomerService } from '../../services/customer.service';
import { BillerService } from '../../services/biller.service';

@Component({
    selector: 'app-payment-list',
    templateUrl: './payment-list.component.html',
    styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
    public customers: Customer[];
    public billers: Biller[];
    public payments: Payment[];
    public allPayments: Payment[];
    private submitted: boolean;
    private isRequestError: boolean;
    private postErrorMessage: string;

    paymentForm: FormGroup;

    constructor(private customerService: CustomerService, private billerService: BillerService,
        private paymentService: PaymentService, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.refreshPaymentList();

        this.customerService.getAll().subscribe(customers => {
            this.customers = customers;
        });

        this.billerService.getAll().subscribe(billers => {
            this.billers = billers;
        });

        this.paymentForm = this.formBuilder.group({
            billerSelect: [''],
            customerSelect: ['']
        });
    }

    onFilterCange() {
        var filteredPayments = this.allPayments;

        let billerSelect = this.paymentForm.controls.billerSelect;
        if (billerSelect.value !== "") {
            filteredPayments = filteredPayments.filter(c => c.biller.id == billerSelect.value);
            this.payments = filteredPayments;
        }

        let customerSelect = this.paymentForm.controls.customerSelect;
        if (customerSelect.value !== "") {
            filteredPayments = filteredPayments.filter(c => c.customer.id == customerSelect.value);
            this.payments = filteredPayments;
        }

        if (billerSelect.value === "" && customerSelect.value === "") {
            this.payments = this.allPayments;
        }
    }

    refreshPaymentList(callback: () => any = null) {
        this.paymentService.getAll().subscribe(payments => {
            this.payments = this.allPayments = payments;
            if(callback){
                callback();
            }
        });
    }

    deletePayment(id: string) {
        this.paymentService.delete(id, () => {
            this.isRequestError = false;
            this.refreshPaymentList(()=>{
                this.onFilterCange();
            });
        }, (error) => {
            this.isRequestError = true;
            this.postErrorMessage = error.message;
        });
        this.submitted = true;
    }

}
