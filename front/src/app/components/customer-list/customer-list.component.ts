import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  public customers: Customer[];
  private submitted: boolean;
  private isRequestError: boolean;
  private postErrorMessage: string;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.refreshCustomerList();
  }

  refreshCustomerList(callback: () => any = null) {
    this.customerService.getAll().subscribe((customers) => {
      this.customers = customers;
      if (callback) {
        callback();
      }
    });
  }

  deleteCustomer(id: string) {
    this.customerService.delete(id, () => {
      this.isRequestError = false;
      this.refreshCustomerList();
    }, (error) => {
      this.isRequestError = true;
      this.postErrorMessage = error.message;
    });
    this.submitted = true;
  }

}
