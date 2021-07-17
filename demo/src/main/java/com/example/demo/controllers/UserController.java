package com.example.demo.controllers;

import com.example.demo.entities.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class UserController {
    @Autowired
    UserService service;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> allUsers = service.getAllUsers();
        return new ResponseEntity<>(allUsers, HttpStatus.OK);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id){
        User userById = service.getUserById(id);
        return new ResponseEntity<>(userById, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<?> createUser(@RequestBody User user){
        service.createUser(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    @CrossOrigin("http://localhost:63342")
    @Transactional
    public ResponseEntity<?> deleteUserById(@PathVariable("id") Long id){
        service.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable("id") Long id, @RequestBody User user){
        service.updateUser(user, id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
