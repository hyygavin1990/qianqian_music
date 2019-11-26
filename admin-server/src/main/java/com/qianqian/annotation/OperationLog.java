package com.qianqian.annotation;

import java.lang.annotation.*;

/**
 * 操作日志注解
 *
 * @author fonlin
 * @date 2018/9/4
 */
@Inherited
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD})
public @interface OperationLog {

    String value();

}
