package com.qianqian.musicplayer.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by hyygavin on 2017/11/14.
 */
@Controller
@RequestMapping("/search")
public class SearchController {

    @RequestMapping("/main")
    public String right(HttpServletRequest request){
        return "search/main";
    }

    @RequestMapping("/list")
    public String list(HttpServletRequest request){
        return "search/list";
    }
}
