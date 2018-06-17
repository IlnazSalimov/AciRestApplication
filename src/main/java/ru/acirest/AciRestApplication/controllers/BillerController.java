package ru.acirest.AciRestApplication.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.acirest.AciRestApplication.entities.Biller;
import ru.acirest.AciRestApplication.repositories.BillerRepository;

import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class BillerController {

    private final BillerRepository billerRepository;

    @Autowired
    public BillerController(final BillerRepository billerRepository) {
        this.billerRepository = billerRepository;
    }

    @GetMapping("/billers")
    public Iterable<Biller> getCustomers(){
        return billerRepository.findAll();
    }

    @GetMapping("/biller/{id}")
    public Optional<Biller> getCustomer(@PathVariable Integer id){
        return billerRepository.findById(id);
    }

    @DeleteMapping("/biller/{id}")
    public boolean deleteCustomer(@PathVariable Integer id){
        billerRepository.deleteById(id);
        return true;
    }

    @PostMapping("/biller")
    public Biller createCustomer(@RequestBody Biller biller){
        return billerRepository.save(biller);
    }

    @PutMapping("/biller")
    public Biller updateCustomer(@RequestBody Biller biller){
        return billerRepository.save(biller);
    }
}
