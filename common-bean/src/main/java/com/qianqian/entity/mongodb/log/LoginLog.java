package com.qianqian.entity.mongodb.log;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

/**
 * @author fonlin
 * @date 2018/10/25
 */
@Document(collection = LoginLog.COLLECTION_NAME)
public class LoginLog {

    public static final String COLLECTION_NAME = "login_log";

    @Id
    private String id;

    /**
     * 登录用户id
     */
    private Integer loginUserId;

    /**
     * 登录用户名
     */
    private String loginUsername;

    /**
     * 初始化时间
     */
    private Date inittime;

    /**
     * 具体信息
     */
    private String msg;

    /**
     * 登录标志
     *
     */
    private Integer flag;

    /**
     * 登录ip
     */
    private String ip;

    /**
     * 来源码，0-企业端 1-后台 2-坐席端
     */
    private Integer source;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getLoginUserId() {
        return loginUserId;
    }

    public void setLoginUserId(Integer loginUserId) {
        this.loginUserId = loginUserId;
    }

    public Date getInittime() {
        return inittime;
    }

    public void setInittime(Date inittime) {
        this.inittime = inittime;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Integer getFlag() {
        return flag;
    }

    public void setFlag(Integer flag) {
        this.flag = flag;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getLoginUsername() {
        return loginUsername;
    }

    public void setLoginUsername(String loginUsername) {
        this.loginUsername = loginUsername;
    }

    public Integer getSource() {
        return source;
    }

    public void setSource(Integer source) {
        this.source = source;
    }
}
