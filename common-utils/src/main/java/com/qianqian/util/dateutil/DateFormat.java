package com.qianqian.util.dateutil;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by satrol on 17/6/21.
 */
public class DateFormat {

    public static String getCurrentTimeStr(Date date) {
        SimpleDateFormat dFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return dFormat.format(date);
    }

    public static String dateFormat(Date date, String format) {
        if (date == null) {
            return null;
        }
        SimpleDateFormat dFromat = new SimpleDateFormat(format);
        return dFromat.format(date);
    }

    public static Date dateFormat(String str, String format) {
        if (str != null && !str.equals("")) {
            SimpleDateFormat dFormat = new SimpleDateFormat(format);
            try {
                return dFormat.parse(str);
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        return null;
    }


}
