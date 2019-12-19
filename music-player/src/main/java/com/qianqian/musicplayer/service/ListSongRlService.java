package com.qianqian.musicplayer.service;

import org.springframework.stereotype.Service;

/**
 * Created by hyygavin on 2017/11/21.
 */
@Service
public class ListSongRlService {

    /*@Resource
    private MListSongRlDao listSongRlDao;
    @Resource
    private ListService listService;

    public JSONArray findListData(String userid) {
        List<MList> lists = listService.findByUserid(userid);
        BasicDBList listOids = new BasicDBList();
        Map<String,String> listNameMap = new HashMap<>();
        for (MList list : lists) {
            listOids.add(new ObjectId(list.getId()));
            listNameMap.put(list.getId(),list.getName());
        }
        List<MListSongRl> rlList = listSongRlDao.getListByListids(listOids);
        Map<String,List<String>> listidValueMap = new LinkedHashMap<>();
        for (String key : listNameMap.keySet()) {
            listidValueMap.put(key, new ArrayList<>());
        }
        for (MListSongRl rl : rlList) {
            String listid = rl.getListid().toString();
            listidValueMap.get(listid).add(rl.getSongid().toString());
        }
        int i =2;
        JSONArray result = new JSONArray();
        for (Map.Entry<String, List<String>> entry : listidValueMap.entrySet()) {
            String listid = entry.getKey();
            String value = String.join(",", entry.getValue());
            JSONObject data = new JSONObject();
            data.put("id",i);
            data.put("listid",listid);
            data.put("name",listNameMap.get(listid));
            data.put("value",value);
            result.add(data);
            i++;
        }
        return result;
    }

    public void addSongToMlist(String songid, String addtolistid) {
        listSongRlDao.insert(songid,addtolistid);
    }

    public List<String> findSongidsByListid(String listid) {
        List<MListSongRl> rlList = listSongRlDao.getListByListid(listid);
        List<String> result = new ArrayList<>();
        for (MListSongRl rl : rlList) {
            result.add(rl.getSongid().toString());
        }
        return result;
    }

    public void removeByListid(String listid) {
        listSongRlDao.removeByListid(listid);
    }*/
}
