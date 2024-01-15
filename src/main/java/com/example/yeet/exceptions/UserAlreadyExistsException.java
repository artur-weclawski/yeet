package com.example.yeet.exceptions;

public class UserAlreadyExistsException extends RuntimeException{
    public UserAlreadyExistsException(String name){super("User: " + name + " already exists.");}
}
