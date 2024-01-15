package com.example.yeet.exceptions;

public class MemeNotFoundException extends RuntimeException{
    public MemeNotFoundException(String name){super("User: " + name + " has no memes.");}
}
