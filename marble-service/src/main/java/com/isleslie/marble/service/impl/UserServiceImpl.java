package com.isleslie.marble.service.impl;

import com.isleslie.marble.mapper.UserMapper;
import com.isleslie.marble.model.entity.User;
import com.isleslie.marble.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public boolean loginByUsername(User user) {
        return userMapper.selectUserByUsernameAndPassword(user.getUsername(),user.getPassword());
    }

    @Override
    public boolean loginByPhoneNumber(User user) {
        return userMapper.selectUserByPhoneNumberAndPassword(user.getPhoneNumber(),user.getPassword());
    }

    @Override
    public boolean register(User user) {
        boolean flag = false;
        User u1 = userMapper.findUserByUsername(user.getUsername());
        User u2 = userMapper.findUserByPhoneNumber(user.getPhoneNumber());
        if(u1 == null && u2 == null){
            user.setCreateTime(System.currentTimeMillis() / 1000);
            flag = userMapper.addUser(user);
        }
        return flag;
    }

    @Override
    public List<User> findAllUsers() {
        return userMapper.findAllUsers();
    }


}
