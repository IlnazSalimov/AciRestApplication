import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Payment } from '../models/payment';
import 'rxjs/add/operator/map';
import { CreateUpdatePayment } from '../models/createUpdatePayment';
import { Observable } from 'rxjs';

@Injectable()
export class PaymentService {

    private host: string = "http://localhost:8080/api";

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(this.host + '/payments')
            .map(res => {
                let payments = res as Payment[];
                payments.forEach((payment) => {
                    payment.createDate = new Date(payment.createDate);
                })
                return payments;
            });
    }

    getById(id: string) {
        return this.http.get(this.host + '/ecodes/' + id)
            .map(res => {
                let payment = res as Payment;
                payment.createDate = new Date(payment.createDate)
                return payment;
            });
    }

    post(payment: CreateUpdatePayment, completeCallback: (res: any) => void, errorCallback: (error: any) => void = null) {
        payment.dateTimestamp = new Date().getTime();
        this.http.post(this.host + '/payment', payment).subscribe(res => {
            completeCallback(res);
        }, error => {
            if(errorCallback){
                errorCallback(error)
            }
        });
    }

    delete(id: string, completeCallback: (res: any) => void, errorCallback: (error: any) => void = null) {
        this.http.delete(this.host + '/payment/' + id)
        .subscribe(res => {
            completeCallback(res);
        }, error => {
            if (errorCallback) {
                errorCallback(error)
            }
        });
    }
}
