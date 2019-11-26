package com.qianqian.annotation;

/**
 * Created by Xenox on 2016/2/20.
 */

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface DateField {
    String value() default "yyyy/MM/dd HH:mm:ss";
}
