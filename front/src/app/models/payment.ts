import { Customer } from "./customer";
import { Biller } from "./biller";

export class Payment {
    id: number;
    createDate: Date;
    biller: Biller;
    customer: Customer;
    accountNumber: number;
    amount: number;
}