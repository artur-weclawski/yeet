package com.example.yeet.controller;

import com.example.yeet.exceptions.EmailAlreadyTakenException;
import com.example.yeet.exceptions.MemeNotFoundException;
import com.example.yeet.exceptions.SamePasswordException;
import com.example.yeet.exceptions.UserAlreadyExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class ControllerAdvisor extends ResponseEntityExceptionHandler {

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<?> handleUserAlreadyExistsException(UserAlreadyExistsException exception, WebRequest request) {
        Map<String, Object> nameToMessage = new HashMap<>();
        nameToMessage.put("message: ", exception.getMessage());
        return new ResponseEntity<>(nameToMessage, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EmailAlreadyTakenException.class)
    public ResponseEntity<?> handleEmailAlreadyTakenException(EmailAlreadyTakenException exception, WebRequest request) {
        Map<String, Object> nameToMessage = new HashMap<>();
        nameToMessage.put("message: ", exception.getMessage());
        return new ResponseEntity<>(nameToMessage, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(MemeNotFoundException.class)
    public ResponseEntity<?> handleMemeNotFoundException(MemeNotFoundException exception, WebRequest request) {
        Map<String, Object> nameToMessage = new HashMap<>();
        nameToMessage.put("message: ", exception.getMessage());
        return new ResponseEntity<>(nameToMessage, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(SamePasswordException.class)
    public ResponseEntity<?> handleSamePasswordException(SamePasswordException exception, WebRequest request) {
        Map<String, Object> nameToMessage = new HashMap<>();
        nameToMessage.put("message: ", exception.getMessage());
        return new ResponseEntity<>(nameToMessage, HttpStatus.BAD_REQUEST);
    }
}