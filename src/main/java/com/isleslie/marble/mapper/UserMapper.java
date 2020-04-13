package com.isleslie.marble.mapper;

import com.isleslie.marble.model.User;

import java.util.List;

public interface UserMapper {

    /**
     * 通过username和password选user
     * @return
     */
    boolean selectUserByUsernameAndPassword(String username,String password);

    /**
     * 通过phoneNumber和password选user
     * @param phoneNumber
     * @param password
     * @return
     */
    boolean selectUserByPhoneNumberAndPassword(String phoneNumber,String password);

    /**
     * 查询所有
     * @return
     */
    List<User> findAllUsers();

    /**
     * 通过username查找
     * @return
     */
    User findUserByUsername(String username);

    /**
     * 通过phoneNumber查找
     * @param phoneNumber
     * @return
     */
    User findUserByPhoneNumber(String phoneNumber);

    /**
     * 增加user
     * @return
     */
    boolean addUser(User user);

    /**
     * 删除user
     * @param username
     * @return
     */
    boolean deleteUser(String username);

    /**
     * 修改user
     * @param user
     * @return
     */
    boolean updateUser(User user);
}
