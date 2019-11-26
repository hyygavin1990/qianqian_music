package com.qianqian.constant;

import java.util.HashMap;
import java.util.Map;

/**
 * @author fonlin
 * @date 2018/4/22
 */
public class Constants {

    public static final String SUPER_ADMIN = "cjadmin";

    /**
     * 默认密码
     */
    public static final String DEFAULT_PASSWORD = "123456";


    public static final String MONTH_PATTERN = "yyyyMM";

    /**
     * staff ip映射在redis中的key
     */
    public static final String STAFF_IP_REDIS_KEY = "staffIp";

    /**
     * 坐席工程使用的rabbitmq交换机名称
     */
    public static final String STAFF_EXCHANGE = "staff_exchange";

    /**
     * 坐席项目set在redis中的key后缀
     * 项目10的key就是10_staffSet
     */
    public static final String STAFF_PROJECT_REDIS_KEY_SUFFIX = "_staffSet";

    /**
     * 质检成功失败map
     */
    public static Map<String, Integer> flgMap = new HashMap<>();

    static {
        flgMap.put("是", 14);
        flgMap.put("否", 15);
        flgMap.put("需回访", 16);
    }

}
