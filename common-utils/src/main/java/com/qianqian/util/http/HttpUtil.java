package com.qianqian.util.http;

import org.springframework.util.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

/**
 * @author fonlin
 * @date 2018/5/10
 */
public class HttpUtil {

    public static boolean isAjaxRequest(HttpServletRequest request) {
        return "XMLHttpRequest".equals(request.getHeader("x-requested-with"));
    }

    /**
     * 返回当前请求的response
     * @return  HttpServletResponse
     */
    public static HttpServletResponse getResponse() {
        return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getResponse();
    }

    /**
     * 返回当前请求的request
     * @return  HttpServletRequest
     */
    public static HttpServletRequest getRequest() {
        return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
    }

    /**
     * 获取项目根路径
     * @return  项目根路径
     */
    public static String getWebRootPath() {
        return getRequest().getServletContext().getRealPath("/");
    }

    /**
     * 获取所有请求的值
     */
    public static Map<String, String> getRequestParameters() {
        HashMap<String, String> values = new HashMap<>(16);
        HttpServletRequest request = HttpUtil.getRequest();
        Enumeration enums = request.getParameterNames();
        while ( enums.hasMoreElements()){
            String paramName = (String) enums.nextElement();
            String paramValue = request.getParameter(paramName);
            values.put(paramName, paramValue);
        }
        return values;
    }

    /**
     * 获取请求中body数据
     */
    public static String getRequestBody() {
        HttpServletRequest request = HttpUtil.getRequest();
        try {
            InputStream in = request.getInputStream();
            StringBuilder sb = new StringBuilder();
            int len = request.getContentLength();
            byte[] buffer = new byte[len];
            in.read(buffer, 0, len);
            sb.append(new String(buffer, 0, len));
            return sb.toString();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "";
    }

    /**
     * 判断是否是get请求
     */
    public static boolean isGet() {
        HttpServletRequest request = HttpUtil.getRequest();
        return isGet(request);
    }

    /**
     * 判断是否是get请求
     */
    public static boolean isGet(HttpServletRequest request) {
        return "GET".equals(request.getMethod());
    }

    /**
     * 判断是否是get请求
     */
    public static boolean isPost() {
        HttpServletRequest request = HttpUtil.getRequest();
        return isPost(request);
    }

    /**
     * 判断是否是get请求
     */
    public static boolean isPost(HttpServletRequest request) {
        return "POST".equals(request.getMethod());
    }

    /**
     * 返回请求ip
     */
    public static String getIp() {
        return getRequest().getRemoteHost();
    }

    /**
     * 判断此请求是否是文件上传
     *
     * @param request   request
     * @return  bool
     */
    public static boolean isMultipart(HttpServletRequest request) {
        if (!"post".equalsIgnoreCase(request.getMethod())) {
            return false;
        }
        String contentType = request.getContentType();
        return StringUtils.startsWithIgnoreCase(contentType, "multipart/");
    }
}
