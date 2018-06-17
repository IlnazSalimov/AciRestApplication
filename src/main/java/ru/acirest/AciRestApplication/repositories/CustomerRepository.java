package ru.acirest.AciRestApplication.repositories;

import org.springframework.data.repository.CrudRepository;
import ru.acirest.AciRestApplication.entities.Customer;

public interface CustomerRepository extends CrudRepository<Customer, Integer> {

}
