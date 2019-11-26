package com.qianqian.dao.mysql.first;

import com.qianqian.dao.mysql.BaseDao;
import com.qianqian.entity.mysql.oauth.User;
import com.qianqian.entity.mysql.player.MusicUser;
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
public interface MusicUserDao extends BaseDao<MusicUser> {


}