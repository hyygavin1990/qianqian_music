package com.qianqian.musicplayer.mongodb;

import com.qianqian.util.dateutil.DateFormat;
import org.springframework.util.Assert;

import java.util.Date;

/**
 * @author fonlin
 * @date 2018/6/28
 */
public class MonthSelector {

    private static final ThreadLocal<String> LOCAL_MONTH = new ThreadLocal<>();

    public static String getAndRemove() {
        String month = LOCAL_MONTH.get();
        LOCAL_MONTH.remove();
        return month;
    }

    public static void set(String month) {
        Assert.notNull(month, "month must not be null");
        LOCAL_MONTH.set(month);
    }

    public static void set(Date date) {
        Assert.notNull(date, "month must not be null");
        String month = DateFormat.dateFormat(date, "yyyyMM");
        LOCAL_MONTH.set(month);
    }

    public static String get() {
        return LOCAL_MONTH.get();
    }

    public static void main(String[] args) {
        MonthSelector.set("1111");
        System.out.println(MonthSelector.getAndRemove());
        System.out.println(MonthSelector.get());
    }

}
