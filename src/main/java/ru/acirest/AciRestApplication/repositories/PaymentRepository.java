package ru.acirest.AciRestApplication.repositories;

import org.springframework.data.repository.CrudRepository;
import ru.acirest.AciRestApplication.entities.Biller;
import ru.acirest.AciRestApplication.entities.Payment;

public interface PaymentRepository extends CrudRepository<Payment, Integer> {

}
