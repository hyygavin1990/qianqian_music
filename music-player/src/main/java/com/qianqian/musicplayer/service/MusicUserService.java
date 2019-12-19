package com.qianqian.musicplayer.service;

import com.alibaba.fastjson.JSONObject;
import com.qianqian.entity.mysql.player.MusicUser;
import com.qianqian.musicplayer.dao.mysql.musicbox.MusicUserDao;
import com.qianqian.musicplayer.entity.LoginInfo;
import com.qianqian.util.security.MD5Util;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static com.qianqian.musicplayer.constant.Constants.LOGIN_SESSION_COOKIE_NAME;
import static com.qianqian.musicplayer.constant.Constants.LOGIN_SESSION_NAME;


/**
 * Created by hyygavin on 2017/11/15.
 */
@Service
public class MusicUserService  {

    @Resource
    private MusicUserDao musicUserDao;

//    @Override
//    protected BaseDao<MusicUser> getDao() {
//        return musicUserDao;
//    }

    public void register(MusicUser musicUser)  {
//        musicUser.setPassword(new BCryptPasswordEncoder().encode(musicUser.getPassword()));
//        musicUser.setStatus(0);
//        musicUser.setPermission(0);
//        insert(musicUser);
    }

    public static void main(String[] args) {
        String password = "123456";
        System.out.println(MD5Util.encode(password));
    }

    public JSONObject login_handle(LoginInfo loginInfo,HttpServletRequest request, HttpServletResponse response) {
//        String name = , String password, String verify, String autologin,
        JSONObject result = new JSONObject();
        String sverify = request.getSession().getAttribute("verify").toString();
        result.put("isSuccess",-1);
        if(sverify.equals(MD5Util.encode(loginInfo.getVerify().toLowerCase()))){
            MusicUser t = new MusicUser();
            t.setUsername(loginInfo.getUsername());
            t.setPassword(MD5Util.encode(loginInfo.getPassword()));
            MusicUser musicUser = musicUserDao.selectOne(t);
            if(musicUser!=null){
                musicUser.setPassword("");
                request.getSession().setAttribute(LOGIN_SESSION_NAME,musicUser);
                result.put("isSuccess",1);
                if(StringUtils.hasLength(loginInfo.getAutologin())){
                    Cookie cookie = new Cookie("userid",musicUser.getId()+"");
                    cookie.setMaxAge(3600);
                    cookie.setPath("/");
                    response.addCookie(cookie);
                }
            }
        }
        return result;
    }


    public JSONObject logout_handle(HttpServletRequest request, HttpServletResponse response) {
        JSONObject result = new JSONObject();
        result.put("isSuccess",-1);
        Cookie[] cookies = request.getCookies();
        if(cookies.length>0){
            for (Cookie cookie : cookies) {
                String cookieName = cookie.getName();
                if(cookieName.equals(LOGIN_SESSION_COOKIE_NAME)){
                    MusicUser musicUser = (MusicUser) request.getSession().getAttribute(LOGIN_SESSION_NAME);
                    Cookie t = new Cookie(LOGIN_SESSION_COOKIE_NAME,musicUser.getId()+"");
                    t.setMaxAge(0);
                    t.setPath("/");
                    response.addCookie(t);
                }
            }
        }
        request.getSession().removeAttribute(LOGIN_SESSION_NAME);
        result.put("isSuccess",1);
        return result;
    }
}
