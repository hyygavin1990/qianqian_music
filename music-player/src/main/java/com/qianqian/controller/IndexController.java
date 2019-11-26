package com.qianqian.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;

/**
 * Created by hyygavin on 2017/11/8.
 */
@Controller
public class IndexController {

    @RequestMapping("/")
    public String index(HttpServletRequest request) throws UnsupportedEncodingException {
        return "index/index";
    }

    @RequestMapping("/index/right")
    public String right(HttpServletRequest request) throws UnsupportedEncodingException {
        return "index/right";
    }
    @RequestMapping("/index/right_search")
    public String right_search(HttpServletRequest request) throws UnsupportedEncodingException {
        return "index/right_search";
    }

}
