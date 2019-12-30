package com.qianqian.musicplayer.dao.mysql.musicbox;

import com.qianqian.entity.mysql.player.Song;
import com.qianqian.musicplayer.dao.mysql.BaseDao;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

/**
 * @author fonlin
 * @date 2018/4/19
 */
public interface SongDao extends BaseDao<Song> {

    @Select("SELECT T1.*,GROUP_CONCAT(T3.name) author FROM song T1 LEFT JOIN song_relation T2 ON T1.id = T2.songid LEFT JOIN singer T3 ON T2.singerid = T3.id  WHERE ${sql} GROUP BY T1.id  ")
    List<Map> getList(@Param("sql") String sql);

}