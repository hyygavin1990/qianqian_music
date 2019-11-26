package com.qianqian.dao.mysql.first;

import com.qianqian.core.BaseDao;
import com.qianqian.entity.mysql.oauth.User;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * @author fonlin
 * @date 2018/4/19
 */
@Component
public interface UserDao extends BaseDao<User> {

    @Select("select * from user where username = #{username}")
    User findOneByUsername(@Param("username") String username);

    @Select("select u.*,(SELECT GROUP_CONCAT( r.`name` SEPARATOR ',') FROM role r " +
            "where r.id IN (SELECT ur.role_id FROM user_role ur WHERE ur.user_id = u.id )  )  as roleName " +
            "from user u left join user_company uc on u.id = uc.user_id  where ${sql} ")
    List<Map> selectBySql2(@Param("sql") String sql);


    @Select("select u.* from user u left join user_role ur on u.id = ur.user_id " +
            " left join role r on ur.role_id = r.id  " +
            "where r.name = '录音质检员' and u.deleted = 0 ")
    List<User> selectQualityUsers();

    @Select("select u.* from user u left join user_role ur on u.id = ur.user_id " +
            " left join role r on ur.role_id = r.id  " +
            "where r.name = '问题质检员' and u.deleted = 0 ")
    List<User> selectQtypeQualityUsers();

    @Select("select * from user where deleted = 0")
    List<User> getAllUser();
}