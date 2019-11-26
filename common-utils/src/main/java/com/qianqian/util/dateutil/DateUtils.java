package com.qianqian.util.dateutil;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;

/**
 * Created by Satroler on 2018/3/28.
 */
public class DateUtils {
    /**
     * 返回一天的00:00:00
     * @param str
     * @param format
     * @return
     */
    public static Date getStartOfDay(String str, String format) {
        Date oriDate = DateFormat.dateFormat(str, format);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(oriDate);
        calendar.set(Calendar.HOUR,0);
        calendar.set(Calendar.MINUTE,0);
        calendar.set(Calendar.SECOND,0);
        return calendar.getTime();
    }

    /**
     * 返回一天的23:59:59
     * @param str
     * @param format
     * @return
     */
    public static Date getEndOfDay(String str, String format) {
        Date oriDate = DateFormat.dateFormat(str, format);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(oriDate);
        calendar.add(Calendar.DAY_OF_YEAR,1);
        calendar.set(Calendar.HOUR,0);
        calendar.set(Calendar.MINUTE,0);
        calendar.add(Calendar.SECOND,-1);
        return calendar.getTime();
    }

    /**
     * 加一天
     * @param str
     * @param format
     * @return
     */
    public static Date addOneDay(String str, String format){
        Date oriDate = DateFormat.dateFormat(str, format);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(oriDate);
        calendar.add(Calendar.DAY_OF_YEAR,1);
        return calendar.getTime();
    }

    public static Date addDay(Date oriDate,int add){
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(oriDate);
        if(add > 0){
            calendar.add(Calendar.DAY_OF_YEAR,add);
        }
        return calendar.getTime();
    }


    public static String dateToObjectid(Date date){
        return Long.toHexString(date.getTime()/1000)+"0000000000000000";
    }

    public static Date objectidToDate(String id){
        String timestamp=id.substring(0, 8);
        return new Date(Long.parseLong( timestamp, 16 )*1000);
    }

    /**
     * Date类型装换为LocalDate类型
     **/
    public static LocalDate dateToLocalDate(Date date) {
        LocalDateTime localDateTime = LocalDateTime.ofInstant(date.toInstant(), ZoneId.systemDefault());
        return localDateTime.toLocalDate();
    }
}
