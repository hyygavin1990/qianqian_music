package com.qianqian.musicplayer.controller;

import com.qianqian.entity.mysql.player.Song;
import com.qianqian.musicplayer.entity.Page;
import com.qianqian.musicplayer.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * Created by hyygavin on 2017/11/8.
 */
@Controller
@RequestMapping("/song")
public class SongController {

    @Autowired
    private SongService songService;

    @ResponseBody
    @RequestMapping("/searchSongsForSuggestion")
    public List<Map> searchSongsForSuggestion(HttpServletRequest request, String searchText) {
        StringBuffer url = request.getRequestURL();
        Page page =new Page(7 ,"&searchcontext="+searchText, url.toString(),"",1);
        return  songService.searchSongsForList(searchText, page);
    }

    @RequestMapping("/searchSongsForList")
    public String searchSongsForList(Model model, HttpServletRequest request, String p , String searchcontext){
        StringBuffer url = request.getRequestURL();

        if(p==null||p.equals("")){
            p="1";
        }
        int pageno = Integer.parseInt(p);
        int pagesize = 10;
        searchcontext = searchcontext==null?"":searchcontext;
        if(searchcontext.equals("%")) searchcontext="";

        Page page =new Page(pagesize ,"&searchcontext="+searchcontext, url.toString(),"",pageno);
        List<Map> musiclist = songService.searchSongsForList(searchcontext, page);
        model.addAttribute("musiclist",musiclist);// 赋值分页输出
        model.addAttribute("page",page.show());// 赋值分页输出
        return "index/right_search";

    }

    /*@Resource
    private SongService songService;
    @PostMapping("/addSongsFromSearch")
    public void addSongsFromSearch(HttpServletRequest request, HttpServletResponse response, String songids) {
        Cookie[] cookies = request.getCookies();
        String templist ="";
        for (Cookie cookie : cookies) {
            if(cookie.getName().equals("templist")){
                templist = cookie.getValue();
                break;
            }
        }
        if(StringUtils.hasLength(templist)){
            templist+="#"+songids;
        }else{
            templist = songids;
        }
        Cookie cookie = new Cookie("templist",templist);
        cookie.setMaxAge(24*7*3600);
        cookie.setPath("/");
        response.addCookie(cookie);
    }

    @RequestMapping("/addSongsToMylove")
    public void addSongsToMylove(HttpServletRequest request, HttpServletResponse response, String songids){
        User user = (User) request.getSession().getAttribute("musicuser");
        String userid = user.getId();
        List<String> songidArr = Arrays.asList(songids.split(","));
        List<MyLoveSong> myLoveSongList = new ArrayList<>();
        for (String songid : songidArr) {
            MyLoveSong tmp = new MyLoveSong();
            tmp.setSongid(new ObjectId(songid));
            tmp.setUserid(new ObjectId(userid));
            myLoveSongList.add(tmp);
        }
        songService.addSongsToMylove(myLoveSongList);

    }

    @RequestMapping("/downloadsong")
    public void downloadsong() {

    }

    @ResponseBody
    @RequestMapping("/loadsongs")
    public List<Song> loadsongs(String ids) {
        return songService.findListByIds(ids);
    }

    @RequestMapping("/removesong")
    public void removesong() {


    }


*/
}
