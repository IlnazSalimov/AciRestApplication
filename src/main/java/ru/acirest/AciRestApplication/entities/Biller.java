package ru.acirest.AciRestApplication.entities;

import javax.persistence.*;
import java.util.Calendar;

@Entity(name = "biller")
public class Biller {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String firstName;
    private String lastName;
    private Calendar dateOfBirth;
    private String address;

    public Biller() {
    }

    public Biller(String firstName, String lastName, Calendar dateOfBirth, String address) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
    }

    public Integer getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Calendar getDateOfBirth() {
        return dateOfBirth;
    }

    public String getAddress() {
        return address;
    }
}
