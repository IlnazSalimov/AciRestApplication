package ru.acirest.AciRestApplication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import ru.acirest.AciRestApplication.entities.Biller;
import ru.acirest.AciRestApplication.entities.Customer;
import ru.acirest.AciRestApplication.entities.Payment;
import ru.acirest.AciRestApplication.repositories.BillerRepository;
import ru.acirest.AciRestApplication.repositories.CustomerRepository;
import ru.acirest.AciRestApplication.repositories.PaymentRepository;

import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;

@SpringBootApplication
public class AciRestApplication implements CommandLineRunner {
	@Autowired
	private CustomerRepository customerRepository;

	@Autowired
	private PaymentRepository paymentRepository;

	@Autowired
	private BillerRepository billerRepository;

	public static void main(String[] args) {
		SpringApplication.run(AciRestApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Biller biller1 = new Biller("Ilnaz", "Salimov", new GregorianCalendar(1993, 01, 6), "Kazan");
		Biller biller2 = new Biller("Marsel", "Legov", new GregorianCalendar(1993, 01, 6), "Kazan");
		Biller biller3 = new Biller("Lenar", "Burdumukhammetov", new GregorianCalendar(1993, 01, 6), "Kazan");
		Biller biller4 = new Biller("Sasha", "Kerzhakov", new GregorianCalendar(1993, 01, 6), "Kazan");

		Customer customer1 = new Customer("Marat", "Kurpatov", new GregorianCalendar(1993, 01, 6), "Kazan");
		Customer customer2 = new Customer("Timur", "Zaycev", new GregorianCalendar(1993, 01, 6), "Kazan");
		Customer customer3 = new Customer("Sasha", "Voynov", new GregorianCalendar(1993, 01, 6), "Kazan");
		Customer customer4 = new Customer("Kirill", "Holov", new GregorianCalendar(1993, 01, 6), "Kazan");

		customerRepository.save(customer1);
		customerRepository.save(customer2);
		customerRepository.save(customer3);
		customerRepository.save(customer4);

		billerRepository.save(biller1);
		billerRepository.save(biller2);
		billerRepository.save(biller3);
		billerRepository.save(biller4);

		paymentRepository.save(new Payment(biller1, customer1, 48994L, 123456L, GregorianCalendar.getInstance()));
		paymentRepository.save(new Payment(biller2, customer2, 447788L, 456789L, GregorianCalendar.getInstance()));
		paymentRepository.save(new Payment(biller3, customer3, 36547L, 852741L, GregorianCalendar.getInstance()));
		paymentRepository.save(new Payment(biller4, customer4, 987321L, 753421L, GregorianCalendar.getInstance()));
	}
}
