package com.qianqian.service;

import com.qianqian.dao.mysql.BaseDao;
import com.qianqian.entity.BaseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import tk.mybatis.mapper.entity.Condition;
import tk.mybatis.mapper.entity.Example;

import javax.persistence.NonUniqueResultException;
import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.ParameterizedType;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

/**
 * {@code service}的基类，提供一些通用的crud方法
 *
 * @param <T>   实体bean，必须继承自{@link BaseEntity}
 * @author fonlin
 * @date 2018/04/21
 */
public abstract class AbstractService<T extends BaseEntity> {

    private Class<T> entityClass;

    @SuppressWarnings("unchecked")
    public AbstractService() {
        //getGenericSuperclass()获取直接父类
        //转成ParameterizedType
        //getActualTypeArguments()获取泛型数组
        this.entityClass = (Class<T>) ((ParameterizedType) this.getClass().getGenericSuperclass()).getActualTypeArguments()[0];
    }

    protected abstract BaseDao<T> getDao();

    /**
     * 根据主键查询实体
     *
     * @param id    主键
     * @return  实体bean
     */
    public T select(Integer id) {
        return getDao().selectByPrimaryKey(id);
    }

    /**
     * 查询所有的记录
     *
     * @return  实体集
     */
    public List<T> selectAll() {
        Condition condition = new Condition(entityClass);
        Example.Criteria criteria = condition.createCriteria();
        criteria.andEqualTo("deleted", false);
        return getDao().selectByExample(condition);
    }


    /**
     * 根据字段名和值查询，只能有一个结果
     *
     * @param fieldName 字段名
     * @param value 值
     * @return  实体bean
     * @throws NonUniqueResultException 当结果不唯一时
     */
    public T select(String fieldName, Object value) throws NonUniqueResultException {
        List<T> list = selectList(fieldName, value);
        if (!CollectionUtils.isEmpty(list)) {
            if (list.size() == 1) {
                return list.get(0);
            }
            throw new NonUniqueResultException("结果不唯一");
        }
        return null;
    }

    /**
     * 根据字段名和值查询，有多个结果
     *
     * @param fieldName 字段名
     * @param value 值
     * @return  结果集
     */
    public List<T> selectList(String fieldName, Object value) {
        Condition condition = new Condition(entityClass);
        Example.Criteria criteria = condition.createCriteria();
        criteria.andEqualTo(fieldName, value);
        //排除已经逻辑删除的数据
        criteria.andEqualTo("deleted", false);
        return getDao().selectByExample(condition);
    }

    /**
     * in查询
     *
     * @param idList    id集合
     * @return          结果集
     */
    public List<T> selectIn(Collection<Integer> idList) {
        if (idList == null || idList.size() == 0) {
            return new ArrayList<>();
        }
        Condition condition = new Condition(entityClass);
        Example.Criteria criteria = condition.createCriteria();
        criteria.andIn("id", idList);
        //排除已经逻辑删除的数据
        criteria.andEqualTo("deleted", false);
        return getDao().selectByExample(condition);
    }


    /**
     * insert接口
     *
     * @param entity 实体bean
     * @return  插入数据主键
     */
    public int insert(T entity) {
        saveBasicInfo(entity);
        getDao().insert(entity);
        return entity.getId();
    }

    /**
     * 根据主键更新全部字段，null值也会被更新
     *
     * @param entity    实体bean
     * @return  主键
     */
    public int update(T entity) {
        if (entity.getId() == null) {
            return -1;
        }
        saveBasicInfo(entity);
        return getDao().updateByPrimaryKey(entity);
    }

    /**
     * 根据主键更新属性不为null的值
     *
     * @param entity    实体bean
     * @return  主键
     */
    public int updateSelective(T entity) {
        if (entity.getId() == null) {
            return -1;
        }
        saveBasicInfo(entity);
        return getDao().updateByPrimaryKeySelective(entity);
    }

    /**
     * 逻辑删除（实际上是更新）
     *
     * @param id    主键
     */
    public int deleteLogically(Integer id) {
        try {
            T entity = entityClass.newInstance();
            entity.setId(id);
            entity.setDeleted(true);
            return updateSelective(entity);
        } catch (InstantiationException | IllegalAccessException e) {
            return -1;
        }
    }

    /**
     * 保存时设置基础属性
     *
     * 这里无需区分新增或更新，因为在{@link BaseEntity}中设置了
     * 创建人和创建时间无非更新
     *
     * @param entity 实体bean
     */
    protected void saveBasicInfo(T entity) {
        ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = servletRequestAttributes.getRequest();
        request.getSession().getAttribute("musicuser");
//        UserDetail userDetail = SpringSecurityUtil.getUser();
        Integer userid = -1;
//        if(userDetail!=null){
//            userid = userDetail.getId();
//        }
        entity.setUpdateBy(userid);
        entity.setUpdateDate(new Date());
        entity.setCreateBy(userid);
        entity.setCreateDate(new Date());
    }

}
