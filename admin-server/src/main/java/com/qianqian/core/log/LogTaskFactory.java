package com.qianqian.core.log;


import com.qianqian.constant.LoginType;
import com.qianqian.dao.mongodb.log.LoginLogDao;
import com.qianqian.entity.mongodb.log.LoginLog;
import com.qianqian.entity.mongodb.log.OperationLog;
import com.qianqian.mongodb.MongoHelper;
import com.qianqian.util.SpringContextUtil;

/**
 * 日志任务工厂
 *
 * @author fonlin
 * @date 2018/10/25
 */
public class LogTaskFactory {

    private static LoginLogDao loginLogDao = SpringContextUtil.getBean(LoginLogDao.class);

    private static MongoHelper operationLogDao = (MongoHelper) SpringContextUtil.getBean("logMongoHelper");

    public static Runnable login(LoginType loginType, Integer loginUserId, String loginUsername, String ip) {
        return () -> {
            try {
                LoginLog loginLog = LogFactory.createLoginLog(loginType, loginUserId, loginUsername, ip);
                loginLogDao.insert(loginLog);
            } catch (Exception e) {
                e.printStackTrace();
            }
        };
    }

    public static Runnable operationLog(String className, String methodName, String name, Integer userId, String nickname, String msg) {
        return () -> {
            try {
                OperationLog operationLog = LogFactory.createOperationLog(className, methodName, name, userId, nickname, msg);
                operationLogDao.insert(operationLog);
            } catch (Exception e) {
                e.printStackTrace();
            }

        };
    }

}
