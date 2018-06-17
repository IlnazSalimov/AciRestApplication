package ru.acirest.AciRestApplication.entities;

import javax.persistence.*;
import java.util.Calendar;

@Entity(name = "payment")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name="biller_id")
    private Biller biller;

    @OneToOne
    @JoinColumn(name="customer_id")
    private Customer customer;
    private Long accountNumber;
    private Long amount;

    private Calendar createDate;

    public Payment() {
    }

    public Payment(Biller biller, Customer customer, Long accountNumber, Long amount, Calendar date) {
        this.biller = biller;
        this.customer = customer;
        this.accountNumber = accountNumber;
        this.amount = amount;
        this.createDate = date;
    }

    public Integer getId() {
        return id;
    }

    public Biller getBiller() {
        return biller;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Long getAccountNumber() {
        return accountNumber;
    }

    public Long getAmount() {
        return amount;
    }

    public Calendar getCreateDate() {
        return createDate;
    }
}
