package com.qianqian.core.log;

import com.alibaba.fastjson.JSONObject;
import com.qianqian.annotation.OperationLog;
import com.qianqian.security.UserDetail;
import com.qianqian.util.http.HttpUtil;
import com.qianqian.util.SpringSecurityUtil;
import org.apache.commons.lang3.ArrayUtils;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Method;
import java.util.Map;

/**
 * 操作日志aop
 *
 * @author fonlin
 * @date 2018/9/4
 */
@Aspect
@Component
public class LogAop {

    private Logger log = LoggerFactory.getLogger(this.getClass());

    @Pointcut(value = "@annotation(com.qianqian.annotation.OperationLog)")
    public void cutService() {
    }

    @Around("cutService()")
    public Object recordSysLog(ProceedingJoinPoint point) throws Throwable {
        //先执行业务
        Object result = point.proceed();

        try {
            handle(point);
        } catch (Exception e) {
            log.error("日志记录出错!", e);
        }

        return result;
    }

    private void handle(ProceedingJoinPoint point) throws Exception {
        //获取拦截的方法名
        Signature sig = point.getSignature();
        if (!(sig instanceof MethodSignature)) {
            throw new IllegalArgumentException("该注解只能用于方法");
        }
        MethodSignature msig = (MethodSignature) sig;
        Object target = point.getTarget();
        //类名
        String className = target.getClass().getName();
        Method currentMethod = target.getClass().getMethod(msig.getName(), msig.getParameterTypes());
        //方法名
        String methodName = currentMethod.getName();
        UserDetail userDetail = SpringSecurityUtil.getUser();
        //操作名
        String name = currentMethod.getAnnotation(OperationLog.class).value();
        StringBuilder sb = new StringBuilder();
        //如果不是文件上传
        if (!HttpUtil.isMultipart(HttpUtil.getRequest())) {
            //get请求去request param
            if (HttpUtil.isGet()) {
                Map<String, String> map = HttpUtil.getRequestParameters();
                for (Map.Entry<String, String> entry : map.entrySet()) {
                    sb.append(entry.getKey()).append("=").append(entry.getValue()).append(";");
                }
            } else if (HttpUtil.isPost()) {
                //取post请求中body数据
                Object[] args = point.getArgs();
                if (ArrayUtils.isNotEmpty(args)) {
                    for (Object arg : args) {
                        //过滤参数的HttpServletRequest、HttpServletResponse
                        if (arg instanceof HttpServletRequest || arg instanceof HttpServletResponse) {
                            continue;
                        }
                        //过滤参数中的文件上传
                        if (arg instanceof MultipartRequest) {
                            continue;
                        }
                        try {
                            sb.append(JSONObject.toJSONString(arg)).append(";");
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
        }
        //利用线程池去保存
        LogManager.execute(LogTaskFactory.operationLog(className, methodName, name, userDetail.getId(), userDetail.getNickname(), sb.toString()));
    }
}
