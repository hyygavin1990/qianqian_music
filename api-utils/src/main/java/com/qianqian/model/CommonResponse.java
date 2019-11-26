package com.qianqian.model;

import java.io.Serializable;

/**
 * Created by satroler on 16-9-19.
 */
public class CommonResponse<T> implements Serializable{

    //业务状态码
    private int bizcode;

    //状态码说明
    private String bizmsg;

    //返回的数据
    private T data;

    //数据签名
    private String sign;

    //时间戳
    private long timestamp;

    public CommonResponse() {
    }

    public CommonResponse(String bizmsg,
                          T data, int bizcode) {
        this.bizmsg = bizmsg;
        this.data = data;
        this.bizcode = bizcode;
    }

    public int getBizcode() {
        return bizcode;
    }

    public void setBizcode(int bizcode) {
        this.bizcode = bizcode;
    }

    public String getBizmsg() {
        return bizmsg;
    }

    public void setBizmsg(String bizmsg) {
        this.bizmsg = bizmsg;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getSign() {
        return sign;
    }

    public void setSign(String sign) {
        this.sign = sign;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }
}
