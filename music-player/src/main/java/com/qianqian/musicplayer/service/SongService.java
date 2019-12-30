package com.qianqian.musicplayer.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.qianqian.entity.mysql.player.Song;
import com.qianqian.musicplayer.dao.mysql.musicbox.SongDao;
import com.qianqian.musicplayer.entity.Page;
import jodd.util.StringUtil;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Created by hyygavin on 2017/11/15.
 */
@Service
public class SongService {
    @Resource
    private SongDao songDao;

    public List<Map> searchSongsForList(String searchcontext, Page page){
        PageHelper.startPage(page.getNowPage(), page.getRollPage());
        String sql = "1=1";
        if(StringUtil.isNotBlank(searchcontext)){
            sql += " AND (T1.`name` LIKE '%"+searchcontext+"%' OR T3.`name` LIKE '%"+searchcontext+"%')";

        }
        List<Map> list = songDao.getList(sql);
        PageInfo<Map> pageInfo = new PageInfo<>(list);
        long totalCount = pageInfo.getTotal();
        page.setTotalRows((int) totalCount);
        page.calculate();
        return list;
    }

    public List<Map> getListByIds(List<String> ids) {
        if(CollectionUtils.isEmpty(ids)) return Collections.emptyList();
        String sql = " T1.id IN ("+String.join(",",ids)+")";
        return songDao.getList(sql);
    }

    /*


    public List<Song> findListByIds(String ids) {
        BasicDBList idList = new BasicDBList();
        List<String> arr = Arrays.asList(ids.split(","));
        for (String s : arr) {
            if(StringUtils.hasLength(s))
                idList.add(new ObjectId(s));
        }
        return songDao.getListByIds(idList);
    }

    public void addSongsToMylove(List<MyLoveSong> myLoveSongList) {

    }*/
}
