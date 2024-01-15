package com.example.yeet.exceptions;

public class SamePasswordException extends RuntimeException{

    public SamePasswordException(){super("Old and new password cannot be the same.");}
}
