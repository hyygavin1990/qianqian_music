package com.qianqian.entity.mysql.oauth;

import com.qianqian.entity.BaseEntity;

/**
 * 角色
 *
 * @author fonlin
 * @date 2018/4/20
 */
public class Role extends BaseEntity {

    /**
     * 角色名称
     */
    private String name;

    /**
     * 角色key，唯一
     */
    private String roleKey;

    /**
     * 角色是否可用
     * todo 为什么只有在用包装类时mybatis才会识别这个字段
     */
    private Boolean enabled = true;

    /**
     * 描述
     */
    private String description;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRoleKey() {
        return roleKey;
    }

    public void setRoleKey(String roleKey) {
        this.roleKey = roleKey;
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

        Role role = (Role) o;

        return getId() != null ? getId().equals(role.getId()) : role.getId() == null;
    }
}
