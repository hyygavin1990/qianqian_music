package com.qianqian.model;


import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.qianqian.errorcode.CommonErrorCode;
import com.qianqian.util.model.SearchBean;
import com.qianqian.util.model.SearchUtils;
import org.bson.json.JsonParseException;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by Satroler on 2017/7/5.
 */
public class BaseController {

    public CommonResponse buildSuccessResponse() {
        return new CommonResponse(CommonErrorCode.SUCCESS.getCode(), CommonErrorCode.SUCCESS.getMessage(), CommonErrorCode.SUCCESS.getStatus());
    }
    public <T> CommonResponse buildSuccessResponse(T data) {
        return new CommonResponse(CommonErrorCode.SUCCESS.getCode(),data, CommonErrorCode.SUCCESS.getStatus());
    }
    public CommonResponse buildErrorResponse() {
        return new CommonResponse(CommonErrorCode.ERROR.getCode(), CommonErrorCode.ERROR.getMessage(), CommonErrorCode.ERROR.getStatus());
    }
    public <T> CommonResponse buildErrorResponse( T data) {
        return new CommonResponse(CommonErrorCode.ERROR.getCode(),data, CommonErrorCode.ERROR.getStatus());
    }
    public <T> CommonResponse buildErrorResponse(CommonErrorCode error, T data) {
        return new CommonResponse(error.getCode(),data, error.getStatus());
    }

    public String generateSearchCond(String filters) {
        SearchBean sb = null;
        if (filters != null && !"".equals(filters)) {
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                sb = objectMapper.readValue(filters, SearchBean.class);
            } catch (JsonParseException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            } catch (JsonMappingException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        String cond = " 1=1 ";
        if (sb != null) {
            StringBuffer where = new StringBuffer();
            cond += SearchUtils.generateSearchCond(sb, where);
        }
        return cond;
    }

    public void printHTML(HttpServletResponse res, Object html) {
        render(res, html, "text/html;charset=UTF-8");
    }

    public void printJSON(HttpServletResponse res, Object obj) {
        if (obj instanceof String) {
            render(res, obj, "application/json;charset=UTF-8");
            return;
        }
        render(res, obj, "application/json;charset=UTF-8");
    }
    private void render(HttpServletResponse response, Object text,
                        String contentType) {
        response.setHeader("Pragma", "No-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", 0L);
        response.setContentType(contentType);
        try {
            response.getWriter().print(text);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
