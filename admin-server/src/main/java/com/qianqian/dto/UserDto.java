package com.qianqian.dto;

import javax.validation.constraints.NotEmpty;

/**
 * @author fonlin
 * @date 2018/4/25
 */
public class UserDto {

    private Integer id;

    @NotEmpty(message = "用户名不能为空")
    private String username;

    @NotEmpty(message = "昵称不能为空")
    private String nickname;

    @NotEmpty(message = "昵称不能为空")
    private String phone;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
