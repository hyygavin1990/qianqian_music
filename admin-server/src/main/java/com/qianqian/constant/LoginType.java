package com.qianqian.constant;

/**
 * @author fonlin
 * @date 2018/10/25
 */
public enum LoginType {

    SUCCESS(0, "登录成功"),

    LOGOUT(1, "登出成功"),

    BAD_CREDENTIALS(2, "用户名密码错误"),

    DISABLED(3, "账号不可用"),

    EXPIRED(4, "登录状态失效");

    int code;

    String msg;

    LoginType(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public int code() {
        return this.code;
    }

    public String msg() {
        return this.msg;
    }
}
