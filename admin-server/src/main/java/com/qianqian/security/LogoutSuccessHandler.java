package com.qianqian.security;

import com.qianqian.constant.LoginType;
import com.qianqian.core.log.LogManager;
import com.qianqian.core.log.LogTaskFactory;
import com.qianqian.util.http.HttpUtil;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by admin on 2017/6/19.
 */
public class LogoutSuccessHandler extends SimpleUrlLogoutSuccessHandler implements org.springframework.security.web.authentication.logout.LogoutSuccessHandler{

    @Override
    public void setDefaultTargetUrl(String defaultTargetUrl) {
        super.setDefaultTargetUrl(defaultTargetUrl);
    }

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        if (authentication.getPrincipal() != null && authentication.getPrincipal() instanceof UserDetail) {
            UserDetail userDetail = (UserDetail) authentication.getPrincipal();
            //登出日志
            LogManager.execute(LogTaskFactory.login(LoginType.LOGOUT, userDetail.getId(), userDetail.getUsername(), HttpUtil.getIp()));
        }
        super.onLogoutSuccess(request, response, authentication);
    }

}
