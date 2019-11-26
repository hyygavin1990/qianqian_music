package com.qianqian.core.log;

import com.qianqian.constant.LoginType;
import com.qianqian.entity.mongodb.log.LoginLog;
import com.qianqian.entity.mongodb.log.OperationLog;

import java.util.Date;

/**
 * @author fonlin
 * @date 2018/10/26
 */
public class LogFactory {

    public static LoginLog createLoginLog(LoginType loginType, Integer loginUserId, String loginUsername, String ip) {
        LoginLog loginLog = new LoginLog();
        loginLog.setLoginUserId(loginUserId);
        loginLog.setInittime(new Date());
        loginLog.setMsg(loginType.msg());
        loginLog.setFlag(loginType.code());
        loginLog.setIp(ip);
        loginLog.setLoginUsername(loginUsername);
        loginLog.setSource(1);
        return loginLog;
    }

    public static OperationLog createOperationLog(String className, String methodName, String name, Integer userId, String nickname, String msg) {
        OperationLog operationLog = new OperationLog();
        operationLog.setClassName(className);
        operationLog.setInittime(new Date());
        operationLog.setName(name);
        operationLog.setUserId(userId);
        operationLog.setUserNickname(nickname);
        operationLog.setMethod(methodName);
        operationLog.setMsg(msg);
        operationLog.setSource(1);
        return operationLog;
    }
}
