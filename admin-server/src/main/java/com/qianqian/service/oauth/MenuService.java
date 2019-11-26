package com.qianqian.service.oauth;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.qianqian.core.AbstractService;
import com.qianqian.core.BaseDao;
import com.qianqian.core.jqGrid.JqGridParam;
import com.qianqian.dao.mysql.first.MenuDao;
import com.qianqian.entity.mysql.oauth.Menu;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import javax.annotation.Resource;
import java.util.Comparator;
import java.util.List;

/**
 * @author fonlin
 * @date 2018/5/22
 */
@Service
public class MenuService extends AbstractService<Menu> {

    @Resource
    private MenuDao menuDao;

    @Override
    protected BaseDao<Menu> getDao() {
        return menuDao;
    }

    @Override
    public List<Menu> selectByJqGridParam(JqGridParam param) {
        return null;
    }

    public List<Menu> selectAllByRole(Integer roleId) {
        return menuDao.selectAllByRole(roleId);
    }

    public List<Menu> selectAllByCompanyRole() {
        return menuDao.selectAllByCompanyRole();
    }


    public List<Menu> selectAllEnabledByUser(Integer userId) {
        return menuDao.selectAllEnabledByUser(userId);
    }

    @Transactional
    @Override
    public void deleteLogically(Integer id) {
        Menu menu = select(id);
        List<Menu> children = selectList("pcode", menu.getCode());
        if (!CollectionUtils.isEmpty(children)) {
            children.forEach(m -> super.deleteLogically(m.getId()));
        }
        super.deleteLogically(id);
    }

    @Transactional
    @Override
    public void updateSelective(Menu menu) {
        List<Menu> children = selectList("pcode", select(menu.getId()).getCode());
        if (!CollectionUtils.isEmpty(children)) {
            children.forEach(m -> {
                m.setEnabled(menu.getEnabled());
                m.setPcode(menu.getCode());
                MenuService.super.updateSelective(m);
            });
        }
        super.updateSelective(menu);
    }

    /**
     * 构造jstree菜单json
     *
     * @param all   所有菜单
     * @param selected  已选中的菜单
     * @return  json
     */
    public JSONArray jstree(List<? extends Menu> all, List<? extends Menu> selected) {
        //根据菜单拼出页面上jstree所需的json
        all.sort(Comparator.comparingInt(Menu::getSequence));
        JSONArray jsonArray = new JSONArray();
        for (Menu menu : all) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("id", menu.getCode());
            jsonObject.put("parent", StringUtils.isEmpty(menu.getPcode()) ? "#" : menu.getPcode());
            jsonObject.put("text", menu.getName());
            jsonObject.put("icon", StringUtils.isNotEmpty(menu.getIcon()) ? "fa " + menu.getIcon() : "");
            JSONObject state = new JSONObject();
            state.put("opened", true);
            //如果有一选择的并且此菜单没有子菜单并且已选中
            state.put("selected", !CollectionUtils.isEmpty(selected) && (!hasChildren(all, menu) && selected.contains(menu)));
            jsonObject.put("state", state);
            jsonArray.add(jsonObject);
        }
        return jsonArray;
    }

    private boolean hasChildren(List<? extends Menu> all, Menu parent) {
        for (Menu menu : all) {
            if (parent.getCode().equals(menu.getPcode())) {
                return true;
            }
        }
        return false;
    }



    /**
     * 获取menu列表构造成的json
     */
    public JSONArray jstreeMenu(List<? extends Menu> selected) {
        return jstree(selectAll(), selected);
    }



}
