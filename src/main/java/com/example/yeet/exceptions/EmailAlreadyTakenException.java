package com.example.yeet.exceptions;

public class EmailAlreadyTakenException  extends RuntimeException{
    public EmailAlreadyTakenException(String email){super("Email: " + email + " already taken.");}
}
