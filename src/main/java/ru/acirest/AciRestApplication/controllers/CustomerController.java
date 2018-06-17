package ru.acirest.AciRestApplication.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.acirest.AciRestApplication.entities.Customer;
import ru.acirest.AciRestApplication.repositories.CustomerRepository;

import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class CustomerController {

    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerController(final CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @GetMapping("/customers")
    public Iterable<Customer> getCustomers(){
        return customerRepository.findAll();
    }

    @GetMapping("/customer/{id}")
    public Optional<Customer> getCustomer(@PathVariable Integer id){
        return customerRepository.findById(id);
    }

    @DeleteMapping("/customer/{id}")
    public boolean deleteCustomer(@PathVariable Integer id){
        customerRepository.deleteById(id);
        return true;
    }

    @PostMapping("/customer")
    public Customer createCustomer(@RequestBody Customer customer){
        return customerRepository.save(customer);
    }

    @PutMapping("/customer")
    public Customer updateCustomer(@RequestBody Customer customer){
        return customerRepository.save(customer);
    }
}
