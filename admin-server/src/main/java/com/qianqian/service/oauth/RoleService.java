package com.qianqian.service.oauth;

import com.qianqian.core.AbstractService;
import com.qianqian.core.BaseDao;
import com.qianqian.core.jqGrid.JqGridParam;
import com.qianqian.dao.mysql.first.MenuDao;
import com.qianqian.dao.mysql.first.RoleDao;
import com.qianqian.dao.mysql.first.RoleMenuDao;
import com.qianqian.dto.RoleJqGridParam;
import com.qianqian.entity.mysql.oauth.Role;
import com.qianqian.entity.mysql.oauth.RoleMenu;
import com.qianqian.security.MySecurityMetadataSource;
import com.qianqian.util.SpringContextUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import tk.mybatis.mapper.entity.Condition;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * @author fonlin
 * @date 2018/4/25
 */
@Service
public class RoleService extends AbstractService<Role> {

    @Resource
    private RoleDao roleDao;
    @Resource
    private RoleMenuDao roleMenuDao;
    @Resource
    private MenuDao menuDao;

    @Override
    protected BaseDao<Role> getDao() {
        return roleDao;
    }

    @Override
    public List<Role> selectByJqGridParam(JqGridParam param) {
        RoleJqGridParam roleJqGridParam = (RoleJqGridParam) param;
        StringBuilder sql = new StringBuilder();
        sql.append("deleted = 0 ");
        if (StringUtils.isNotEmpty(roleJqGridParam.getName())) {
            sql.append("and name like '%").append(roleJqGridParam.getName()).append("%' ");
        }
        if (StringUtils.isNotEmpty(roleJqGridParam.getRoleKey())) {
            sql.append("and role_key like '%").append(roleJqGridParam.getRoleKey()).append("%' ");
        }
        if (StringUtils.isNotEmpty(roleJqGridParam.getSidx())) {
            sql.append("order by ").append(roleJqGridParam.getSidx()).append(" ").append(roleJqGridParam.getSord()).append("");
        }
        return roleDao.selectBySql("role", sql.toString());
    }

    @Transactional
    public void savePermission(Integer roleId, List<String> codes) {
        //先删除所有的
        Condition condition = new Condition(RoleMenu.class);
        Example.Criteria criteria = condition.createCriteria();
        criteria.andEqualTo("roleId", roleId);
        roleMenuDao.deleteByExample(condition);

        if (!CollectionUtils.isEmpty(codes)) {
            List<Integer> menuIds = menuDao.selectAllIdByCode(codes);
            List<RoleMenu> roleMenus = new ArrayList<>();
            for (Integer menuId : menuIds) {
                RoleMenu roleMenu = new RoleMenu();
                roleMenu.setMenuId(menuId);
                roleMenu.setRoleId(roleId);
                roleMenus.add(roleMenu);
            }
            roleMenuDao.insertList(roleMenus);
        }
        SpringContextUtil.getBean(MySecurityMetadataSource.class).refreshResources();
    }

    public List<Role> selectAllByUser(Integer userId) {
        return roleDao.selectAllByUser(userId);
    }

}
