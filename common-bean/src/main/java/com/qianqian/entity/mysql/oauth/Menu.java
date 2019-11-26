package com.qianqian.entity.mysql.oauth;


import com.qianqian.entity.BaseEntity;

/**
 * 菜单资源类（菜单及页面上的按钮链接等资源）
 *
 * @author fonlin
 * @date 2018/4/19
 */
public class Menu extends BaseEntity {

    //url
    private String url;

    //名称
    private String name;

    //排序
    private Integer sequence;

    //key，唯一
    private String code;

    //图标
    private String icon;

    //描述
    private String description;

    //上级菜单id
    private String pcode;

    //层级
//    private Integer level;

    //类型 1-菜单 0-不是菜单
    private Integer type;

    //是否启用
    private Boolean enabled;

    //是否显示
    private Boolean displayed;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getSequence() {
        return sequence;
    }

    public void setSequence(Integer sequence) {
        this.sequence = sequence;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Menu menu = (Menu) o;

        return getId() != null ? getId().equals(menu.getId()) : menu.getId() == null;
    }

    @Override
    public int hashCode() {
        return url.hashCode();
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getPcode() {
        return pcode;
    }

    public void setPcode(String pcode) {
        this.pcode = pcode;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Boolean getDisplayed() {
        return displayed;
    }

    public void setDisplayed(Boolean displayed) {
        this.displayed = displayed;
    }
}
