package com.qianqian.security;

import com.qianqian.constant.LoginType;
import com.qianqian.core.log.LogManager;
import com.qianqian.core.log.LogTaskFactory;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * 自定义认证失败处理器
 *
 * 加入了日志
 *
 * @author fonlin
 * @date 2018/10/26
 */
public class MyAuthenticationFailureHandler implements AuthenticationFailureHandler {


    private final LinkedHashMap<Class<? extends AuthenticationException>, AuthenticationFailureHandler> handlers;

    private final AuthenticationFailureHandler defaultHandler;

    public MyAuthenticationFailureHandler() {
        this.handlers = new LinkedHashMap<>();
        this.handlers.put(DisabledException.class, new Disabled());
        this.handlers.put(BadCredentialsException.class, new BadCredentials());
        this.defaultHandler = new BadCredentials();
    }

    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                        HttpServletResponse response, AuthenticationException exception)
            throws IOException, ServletException {
        for (Map.Entry<Class<? extends AuthenticationException>, AuthenticationFailureHandler> entry : handlers
                .entrySet()) {
            Class<? extends AuthenticationException> handlerMappedExceptionClass = entry
                    .getKey();
            if (handlerMappedExceptionClass.isAssignableFrom(exception.getClass())) {
                AuthenticationFailureHandler handler = entry.getValue();
                handler.onAuthenticationFailure(request, response, exception);
                return;
            }
        }
        defaultHandler.onAuthenticationFailure(request, response, exception);
    }


    class Disabled implements AuthenticationFailureHandler {

        private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

        @Override
        public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
            String username = request.getParameter("username");
            LogManager.execute(LogTaskFactory.login(LoginType.DISABLED, null, username, request.getRemoteHost()));
            redirectStrategy.sendRedirect(request, response, "/login?disabled");
        }
    }

    class BadCredentials implements AuthenticationFailureHandler {

        private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

        @Override
        public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
            String username = request.getParameter("username");
            LogManager.execute(LogTaskFactory.login(LoginType.BAD_CREDENTIALS, null, username, request.getRemoteHost()));
            redirectStrategy.sendRedirect(request, response, "/login?error");
        }
    }


}
