package com.qianqian.musicplayer.controller;

import com.alibaba.fastjson.JSONObject;
import com.qianqian.musicplayer.entity.LoginInfo;
import com.qianqian.musicplayer.service.MusicUserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by hyygavin on 2019/5/8.
 */
@Controller
public class LoginController {

    @Resource
    private MusicUserService musicUserService;

    @RequestMapping("/login")
    public String login(){
        return "index/login";
    }

    @RequestMapping("/login_handle")
    @ResponseBody
    public JSONObject login_handle(HttpServletRequest request, HttpServletResponse response, LoginInfo loginInfo){
        return musicUserService.login_handle(loginInfo,request,response);
    }

    @RequestMapping("/logout")
    @ResponseBody
    public JSONObject logout(HttpServletRequest request, HttpServletResponse response){
        return musicUserService.logout_handle(request,response);
    }

}
