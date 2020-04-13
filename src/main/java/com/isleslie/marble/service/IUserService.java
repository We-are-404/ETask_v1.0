package com.isleslie.marble.service;

import com.isleslie.marble.model.User;

import java.util.List;

public interface IUserService {

    /**
     * 通过username登录
     * @return
     */
    boolean loginByUsername(User user);

    /**
     * 通过phoneNumber登录
     * @param user
     * @return
     */
    boolean loginByPhoneNumber(User user);

    /**
     * 注册
     * @param user
     * @return
     */
    boolean register(User user);

    /**
     * 查询所有
     * @return
     */
    List<User> findAllUsers();


}
