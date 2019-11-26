package com.qianqian.service;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by hyygavin on 2017/11/21.
 */
@Service
public class SongListService {

   /* @Resource
    private MListDao listDao;
    @Resource
    private ListSongRlService listSongRlService;

    public List<MList> findByUserid(String userid) {
        return listDao.findByUserid(userid);
    }


    public String insert(String userid, String newlistname) {
        MList mList = new MList();
        mList.setUserid(new ObjectId(userid));
        mList.setName(newlistname);
        return listDao.insert(mList);
    }

    public void renameList(String id, String name) {
        listDao.updateNameById(id, name);
    }

    public void removeList(String id) {
        listDao.removeById(id);
        listSongRlService.removeByListid(id);
    }*/
}
