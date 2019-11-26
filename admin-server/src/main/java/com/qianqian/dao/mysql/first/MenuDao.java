package com.qianqian.dao.mysql.first;

import com.qianqian.core.BaseDao;
import com.qianqian.entity.mysql.oauth.Menu;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @author fonlin
 * @date 2018/4/20
 */
@Component
public interface MenuDao extends BaseDao<Menu> {

    @Select("SELECT m.* FROM menu m " +
            "INNER JOIN role_menu rm on rm.menu_id = m.id " +
            "INNER JOIN user_role ur on ur.role_id = rm.role_id " +
            "WHERE ur.user_id = #{userId} AND m.deleted = 0")
    List<Menu> selectAllByUser(@Param("userId") Integer userId);

    @Select("SELECT m.* FROM menu m " +
            "INNER JOIN role_menu rm on rm.menu_id = m.id " +
            "INNER JOIN user_role ur on ur.role_id = rm.role_id " +
            "WHERE ur.user_id = #{userId} AND m.deleted = 0 AND m.enabled = 1")
    List<Menu> selectAllEnabledByUser(@Param("userId") Integer userId);

    @Select("SELECT * FROM menu m INNER JOIN role_menu rm ON m.id = rm.menu_id WHERE rm.role_id = #{roleId}")
    List<Menu> selectAllByRole(@Param("roleId") Integer roleId);

    @Select("SELECT * FROM menu m INNER JOIN role_menu rm ON m.id = rm.menu_id WHERE rm.role_id = #{roleId}")
    List<Menu> selectAllByCompany(@Param("companyId") Integer companyId);

    @Select("<script>" +
            "SELECT id FROM menu WHERE code IN " +
            "<foreach collection='codes' index='index' item='item' open='(' separator=',' close=')'>" +
            " #{item} " +
            "</foreach>" +
            "</script>")
    List<Integer> selectAllIdByCode(@Param("codes") List<String> codes);


    @Select("SELECT * FROM menu m INNER JOIN role_menu rm ON m.id = rm.menu_id  left join role r on rm.role_id = r.id WHERE r.name = '企业用户'")
    List<Menu> selectAllByCompanyRole();


}
