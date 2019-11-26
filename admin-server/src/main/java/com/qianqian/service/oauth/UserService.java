package com.qianqian.service.oauth;

import com.qianqian.core.AbstractService;
import com.qianqian.core.BaseDao;
import com.qianqian.core.BusinessException;
import com.qianqian.core.ErrorCode;
import com.qianqian.core.jqGrid.JqGridParam;
import com.qianqian.dao.mysql.first.UserDao;
import com.qianqian.dao.mysql.first.UserRoleDao;
import com.qianqian.dto.UserDto;
import com.qianqian.dto.UserJqGridParam;
import com.qianqian.entity.mysql.oauth.User;
import com.qianqian.entity.mysql.oauth.UserRole;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import tk.mybatis.mapper.entity.Condition;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * @author fonlin
 * @date 2018/4/24
 */
@Service
public class UserService extends AbstractService<User> {

    @Resource
    private UserDao userDao;
    @Resource
    private UserRoleDao userRoleDao;

    @Override
    protected BaseDao<User> getDao() {
        return userDao;
    }

    @Override
    public List<User> selectByJqGridParam(JqGridParam param) {
        UserJqGridParam userJqGridParam = (UserJqGridParam) param;
        StringBuilder sql = new StringBuilder();
        sql.append("deleted = 0 ");
        if (StringUtils.isNotEmpty(userJqGridParam.getUsername())) {
            sql.append("and username like '%").append(userJqGridParam.getUsername()).append("%' ");
        }
        if (StringUtils.isNotEmpty(userJqGridParam.getNickname())) {
            sql.append("and nickname like '%").append(userJqGridParam.getNickname()).append("%' ");
        }
        if (userJqGridParam.getRoleId() != null) {
            sql.append("and id in (select user_id from user_role ur where ur.role_id = ").append(userJqGridParam.getRoleId()).append(")");
        }
        if (StringUtils.isNotEmpty(userJqGridParam.getSidx())) {
            sql.append("order by ").append(userJqGridParam.getSidx()).append(" ").append(userJqGridParam.getSord());
        }
        return userDao.selectBySql("user", sql.toString());
    }

    public List<Map> selectUserMapByPage(JqGridParam param) {
        UserJqGridParam userJqGridParam = (UserJqGridParam) param;
        StringBuilder sql = new StringBuilder();
        sql.append("1=1 ");
        sql.append("and u.deleted = 0 and uc.user_id is null ");
        if (StringUtils.isNotEmpty(userJqGridParam.getUsername())) {
            sql.append("and u.username like '%").append(userJqGridParam.getUsername()).append("%' ");
        }
        if (StringUtils.isNotEmpty(userJqGridParam.getNickname())) {
            sql.append("and u.nickname like '%").append(userJqGridParam.getNickname()).append("%' ");
        }
        if (StringUtils.isNotEmpty(userJqGridParam.getSidx())) {
            sql.append("order by u.").append(userJqGridParam.getSidx()).append(" ").append(userJqGridParam.getSord()).append("");
        }
        return userDao.selectBySql2(sql.toString());
    }

    @Transactional
    public void saveRoles(Integer userId, List<Integer> roleIds) {
        //先删除所有的
        Condition condition = new Condition(UserRole.class);
        Example.Criteria criteria = condition.createCriteria();
        criteria.andEqualTo("userId", userId);
        userRoleDao.deleteByExample(condition);

        if (!CollectionUtils.isEmpty(roleIds)) {
            List<UserRole> userRoles = new ArrayList<>();
            for (Integer roleId : roleIds) {
                UserRole userRole = new UserRole();
                userRole.setUserId(userId);
                userRole.setRoleId(roleId);
                userRoles.add(userRole);
            }
            userRoleDao.insertList(userRoles);
        }
    }


    public User selectByUsername(String username) {
        return userDao.findOneByUsername(username);
    }

    public List<User> selectQualityUsers() {
        return userDao.selectQualityUsers();
    }


    public void checkRepeatPhone(UserDto dto){
        User user=select("phone",dto.getPhone());
        if(user!=null){
            throw new BusinessException(ErrorCode.BAD_REQUEST,"手机号已存在");
        }
    }

    /** 
    * @Description: 获取问题质检员 
    * @Author: xf
    * @Date: 2019/1/15
    */ 
    public List<User> selectQtypeQualityUsers() {
        return userDao.selectQtypeQualityUsers();
    }
}
