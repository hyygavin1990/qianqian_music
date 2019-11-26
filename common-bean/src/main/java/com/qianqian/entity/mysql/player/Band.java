package com.qianqian.entity.mysql.player;

import com.qianqian.entity.BaseEntity;
import lombok.Data;


/**
 * 乐队
 * Created by hyygavin on 2019/4/22.
 */
@Data
public class Band extends BaseEntity{

    /**
     * 姓名
     */
    private String name;

    /**
     * 照片
     */
    private String pic;

    /**
     * 简介
     */
    private String memo;

    /**
     * 地区
     */
    private String area;
}
