package ru.acirest.AciRestApplication.repositories;

import org.springframework.data.repository.CrudRepository;
import ru.acirest.AciRestApplication.entities.Biller;
import ru.acirest.AciRestApplication.entities.Customer;

public interface BillerRepository extends CrudRepository<Biller, Integer> {

}
