export class CreateUpdatePayment {
    constructor() {
        this.id = 0;
        this.billerId = 0;
        this.customerId = 0;
        this.accountNumber = 0;
        this.amount = 0;
    }

    id: number;
    dateTimestamp: number;
    billerId: number;
    customerId: number;
    accountNumber: number;
    amount: number;
}