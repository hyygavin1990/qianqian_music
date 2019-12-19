package com.qianqian.entity;

import lombok.Data;

/**
 * Created by hyygavin on 2019/5/13.
 */
@Data
public class LoginInfo {
    String username;
    String password;
    String verify;
    String autologin;
}
