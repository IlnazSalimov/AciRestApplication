package ru.acirest.AciRestApplication.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.acirest.AciRestApplication.entities.Biller;
import ru.acirest.AciRestApplication.entities.CreateUpdatePayment;
import ru.acirest.AciRestApplication.entities.Customer;
import ru.acirest.AciRestApplication.entities.Payment;
import ru.acirest.AciRestApplication.repositories.BillerRepository;
import ru.acirest.AciRestApplication.repositories.CustomerRepository;
import ru.acirest.AciRestApplication.repositories.PaymentRepository;

import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class PaymentController {

    private final PaymentRepository paymentRepository;
    private final BillerRepository billerRepository;
    private final CustomerRepository customerRepository;

    @Autowired
    public PaymentController(final PaymentRepository paymentRepository,
                             final BillerRepository billerRepository,
                             final  CustomerRepository customerRepository) {
        this.paymentRepository = paymentRepository;
        this.billerRepository = billerRepository;
        this.customerRepository = customerRepository;
    }

    @GetMapping("/payments")
    public Iterable<Payment> getCustomers(){
        return paymentRepository.findAll();
    }

    @GetMapping("/payment/{id}")
    public Optional<Payment> getCustomer(@PathVariable Integer id){
        return paymentRepository.findById(id);
    }

    @DeleteMapping("/payment/{id}")
    public boolean deleteCustomer(@PathVariable Integer id){
        paymentRepository.deleteById(id);
        return true;
    }

    @PostMapping("/payment")
    public Payment createCustomer(@RequestBody CreateUpdatePayment payment) {
        Biller biller = billerRepository.findById(payment.billerId).get();
        Customer customer = customerRepository.findById(payment.customerId).get();

        if (biller == null || customer == null){

        }
        Calendar createDate = GregorianCalendar.getInstance();
        createDate.setTimeInMillis(payment.dateTimestamp);
        return paymentRepository.save(new Payment(biller, customer, payment.accountNumber, payment.amount, createDate));
    }

    @PutMapping("/payment")
    public Payment updateCustomer(CreateUpdatePayment payment){
        Payment currentPayment = paymentRepository.findById(payment.id).get();

        return paymentRepository.save(currentPayment);
    }
}
