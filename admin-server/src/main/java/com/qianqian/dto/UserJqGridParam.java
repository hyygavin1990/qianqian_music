package com.qianqian.dto;


import com.qianqian.core.jqGrid.JqGridParam;

/**
 * @author fonlin
 * @date 2018/4/24
 */
public class UserJqGridParam extends JqGridParam {

    private String username;

    private String nickname;

    private Integer roleId;

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

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }
}
