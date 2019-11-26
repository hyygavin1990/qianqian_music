package com.qianqian.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qianqian.core.ErrorCode;
import com.qianqian.core.ErrorResult;
import com.qianqian.util.http.HttpUtil;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.access.AccessDeniedHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 拒绝访问处理器
 *
 * @author fonlin
 * @date 2018/10/31
 */
public class MyAccessDeniedHandler implements AccessDeniedHandler {

    private final RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

    String errorPage;

    public MyAccessDeniedHandler(String errorPage) {
        if ((errorPage != null) && !errorPage.startsWith("/")) {
            throw new IllegalArgumentException("errorPage must begin with '/'");
        }

        this.errorPage = errorPage;
    }

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        if (HttpUtil.isAjaxRequest(request)) {
            //如果是ajax请求
            //设置编码
            response.setCharacterEncoding("UTF-8");
            //写入json
            ErrorResult errorResult = new ErrorResult(ErrorCode.FORBIDDEN);
            response.getWriter().print(new ObjectMapper().writeValueAsString(errorResult));
            response.flushBuffer();
        } else {
            this.redirectStrategy.sendRedirect(request, response, errorPage);
        }
    }
}
