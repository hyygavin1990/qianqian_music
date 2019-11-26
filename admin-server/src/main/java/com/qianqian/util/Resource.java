package com.qianqian.util;

import java.util.List;

/**
 * 对应页面上的一个按钮或者链接
 * 按钮点进去可以对应更多的Resource
 *
 * @author fonlin
 * @date 2018/6/27
 */
public class Resource {

    private String name;

    private String code;

    private List<Resource> children;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public List<Resource> getChildren() {
        return children;
    }

    public void setChildren(List<Resource> children) {
        this.children = children;
    }
}
