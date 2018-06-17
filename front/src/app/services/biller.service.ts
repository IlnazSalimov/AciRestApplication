import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Biller } from '../models/biller';

@Injectable()
export class BillerService {

    private host: string = "http://localhost:8080/api";

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(this.host + '/billers')
            .map(res => {
                let billers = res as Biller[];
                billers.forEach((biller) => {
                    biller.dateOfBirth = new Date(biller.dateOfBirth);
                })
                return billers;
            });
    }

    getById(id: string) {
        return this.http.get(this.host + '/billers/' + id)
            .map(res => {
                let biller = res as Biller;
                biller.dateOfBirth = new Date(biller.dateOfBirth)
                return biller;
            });
    }

    post(biller: Biller, completeCallback: (res: any) => void, errorCallback: (error: any) => void = null) {
        biller.dateOfBirth = new Date(biller.dateOfBirth);
        this.http.post(this.host + '/biller', biller).subscribe(res => {
            completeCallback(res);
        }, error => {
            if (errorCallback) {
                errorCallback(error)
            }
        });
    }

    delete(id: string, completeCallback: (res: any) => void, errorCallback: (error: any) => void = null) {
        this.http.delete(this.host + '/biller/' + id)
        .subscribe(res => {
            completeCallback(res);
        }, error => {
            if (errorCallback) {
                errorCallback(error)
            }
        });
    }

}
