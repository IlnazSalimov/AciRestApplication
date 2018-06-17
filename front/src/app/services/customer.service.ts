import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Customer } from '../models/customer';

@Injectable()
export class CustomerService {

    private host: string = "http://localhost:8080/api";
    
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(this.host + '/customers')
            .map(res => {
                let customers = res as Customer[];
                customers.forEach((customer) => {
                    customer.dateOfBirth = new Date(customer.dateOfBirth);
                })
                return customers;
            });
    }

    getById(id: string) {
        return this.http.get(this.host + '/customer/' + id)
            .map(res => {
                let customer = res as Customer;
                customer.dateOfBirth = new Date(customer.dateOfBirth)
                return customer;
            });
    }

    post(customer: Customer, completeCallback: (res: any) => void, errorCallback: (error: any) => void = null) {
        customer.dateOfBirth = new Date(customer.dateOfBirth);
        this.http.post(this.host + '/customer', customer).subscribe(res => {
            completeCallback(res);
        }, error => {
            if(errorCallback){
                errorCallback(error)
            }
        });
    }

    delete(id: string, completeCallback: (res: any) => void, errorCallback: (error: any) => void = null) {
        this.http.delete(this.host + '/customer/' + id)
        .subscribe(res => {
            completeCallback(res);
        }, error => {
            if (errorCallback) {
                errorCallback(error)
            }
        });
    }
}
