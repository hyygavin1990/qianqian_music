package com.qianqian.musicplayer.controller;

import com.qianqian.entity.mysql.player.MusicUser;
import com.qianqian.musicplayer.service.MusicUserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by hyygavin on 2017/11/8.
 */
@Controller
@RequestMapping("/user")
public class UserController {

    @Resource
    private MusicUserService musicUserService;

    @RequestMapping("/register")
    public String register(HttpServletRequest request){
        return "index/register";
    }

    @PostMapping("/register_handle")
    public void register(HttpServletResponse response, MusicUser musicUser) throws IOException {
        musicUserService.register(musicUser);
        response.sendRedirect("/index/login");
    }
}
