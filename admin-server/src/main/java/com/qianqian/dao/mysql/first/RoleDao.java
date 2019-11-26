package com.qianqian.dao.mysql.first;

import com.qianqian.core.BaseDao;
import com.qianqian.entity.mysql.oauth.Role;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * @author fonlin
 * @date 2018/4/20
 */
@Component
public interface RoleDao extends BaseDao<Role> {

    @Select("SELECT * FROM role WHERE id IN (SELECT role_id FROM user_role WHERE user_id = #{userId})")
    List<Role> selectAllByUser(@Param("userId") Integer userId);

    @Select("SELECT * FROM role WHERE id IN (SELECT role_id FROM user_role WHERE user_id = #{userId}) and enabled = 1 and deleted = 0 ")
    List<Role> selectRoleByUser(@Param("userId") Integer userId);

    @Select("select * from role where id in (select role_id from user_role where user_id = ${id} ) and enabled = 1 and deleted='0'")
    Role getRoleById(@Param("id") Integer id);



}
