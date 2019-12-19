package com.qianqian.musicplayer.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.qianqian.entity.mysql.player.MusicUser;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

import static com.qianqian.musicplayer.constant.Constants.LOGIN_SESSION_NAME;


/**
 * Created by hyygavin on 2017/11/8.
 */
@RestController
@RequestMapping("/list")
public class ListController {

    @ResponseBody
    @RequestMapping("/loadlists")
    public JSONArray loadlists(HttpServletRequest request){

        MusicUser musicUser = (MusicUser) request.getSession().getAttribute(LOGIN_SESSION_NAME);

        Cookie[] cookies = request.getCookies();
        String templistStr = "";
        if(cookies!=null){
            for (Cookie cookie : cookies) {
                if(cookie.getName().equalsIgnoreCase("templist")){
                    templistStr = cookie.getValue();
                    break;
                }
            }
        }

        JSONArray result =new JSONArray();
        //临时列表
        JSONObject templist = new JSONObject();
        templist.put("id",0);
        templist.put("name","临时列表");
        templist.put("value", StringUtils.hasLength(templistStr)?templistStr.replaceAll("#",","):"");
        result.add(templist);
        /*if(musicUser!=null){
            //我喜爱听
            List<MyLoveSong> myloveList = myLoveSongService.findByUserid(userDetail.getId());
            List<String> mylovesongids = new ArrayList<>();
            for (MyLoveSong myLoveSong : myloveList) {
                mylovesongids.add(myLoveSong.getSongid().toString());
            }
            JSONObject mylovelist = new JSONObject();
            mylovelist.put("id",1);
            mylovelist.put("name","我喜爱听");
            mylovelist.put("value",String.join(",",mylovesongids));
            result.add(mylovelist);

            //我的列表
            JSONArray mylistdata = listSongRlService.findListData(user.getId());
            if(mylistdata.size()>0){
                result.addAll(mylistdata);
            }
        }*/
        return  result;
    }

    /*@Resource
    private MyLoveSongService myLoveSongService;
    @Resource
    private ListSongRlService listSongRlService;
    @Resource
    private ListService listService;


    @RequestMapping("/addToNewList")
    public String addToNewList(HttpServletRequest request, HttpServletResponse response, String songid, String addtolistid){

        User user = (User) request.getSession().getAttribute("musicuser");

        String userid  = user.getId();
        if(addtolistid.equals("0")){
            //加入到临时列表,即加入到cookie中
            Cookie[] cookies = request.getCookies();
            String templistStr = "";
            if(cookies!=null){
                for (Cookie cookie : cookies) {
                    if(cookie.getName().equalsIgnoreCase("templist")){
                        templistStr = cookie.getValue();
                        break;
                    }
                }
            }
            if(StringUtils.hasLength(templistStr)){
                templistStr +=","+songid;
            }else{
                templistStr = songid;
            }
            Cookie cookie = new Cookie("templist",templistStr);
            cookie.setMaxAge(24*7*3600);
            cookie.setPath("/");
            response.addCookie(cookie);
            return templistStr;
        }else if (addtolistid.equals("1")) {
            //加入到我喜爱听中
            myLoveSongService.add(userid,songid);
            List<MyLoveSong> list = myLoveSongService.findByUserid(userid);
            List<String> lovesongids = new ArrayList<>();
            for (MyLoveSong myLoveSong : list) {
                lovesongids.add(myLoveSong.getSongid().toString());
            }

            return String.join(",",lovesongids);
        }else{
            listSongRlService.addSongToMlist(songid,addtolistid);
            List<String> songids = listSongRlService.findSongidsByListid(addtolistid);
            return String.join(",",songids);
        }

    }

    @RequestMapping("/createNewList")
    public String createNewList(HttpServletRequest request, String newlistname){
        User user = (User) request.getSession().getAttribute("musicuser");
        return listService.insert(user.getId(),newlistname);
    }


    @RequestMapping("/renameList")
    public String renameList(Model model, String renamelistid, String renamelistcontext){
        listService.renameList(renamelistid,renamelistcontext);
        return "1";
    }

    @RequestMapping("/removeList")
    public String removeList(String listid){
        listService.removeList(listid);
        return "1";
    }*/


}
