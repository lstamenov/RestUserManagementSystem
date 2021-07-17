package com.example.demo.service;

import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public void createUser(User user){
        this.userRepository.saveAndFlush(user);
    }

    public User getUserById(Long id){
        return this.userRepository.findUserById(id);
    }

    public List<User> getAllUsers(){
        return this.userRepository.findAll();
    }

    public void updateUser(User user, Long id){
        User userById = this.userRepository.findUserById(id);
        if (!user.getEmail().isBlank()){
            userById.setEmail(user.getEmail());
        }
        if (user.getAge() != null){
            userById.setAge(user.getAge());
        }
        if (!user.getFirstName().isBlank()){
            userById.setFirstName(user.getFirstName());
        }
        if (!user.getLastName().isBlank()){
            userById.setLastName(user.getLastName());
        }
        this.userRepository.saveAndFlush(userById);
    }

    public void deleteUser(Long id){
        this.userRepository.deleteUserById(id);
    }
}
