package com.qianqian.service;

import com.qianqian.dao.mysql.first.SongDao;
import com.qianqian.entity.Page;
import com.qianqian.entity.mysql.player.Song;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by hyygavin on 2017/11/15.
 */
@Service
public class SongService {
    @Resource
    private SongDao songDao;

    public List<Song> searchSongsForList(String searchcontext, Page page){
        /*PageHelper.startPage(page.getNowPage(), page.getRollPage());
        Example example = new Example(Song.class);
        if(StringUtil.isNotBlank(searchcontext)){
            example.createCriteria().orLike("name","%"+searchcontext+"%");
        }
        List<Song> list = songDao.selectByExample(example);
        PageInfo<Song> pageInfo = new PageInfo<>(list);
        long totalCount = pageInfo.getTotal();
        page.setTotalRows((int) totalCount);
        page.calculate();*/
        return null;
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
