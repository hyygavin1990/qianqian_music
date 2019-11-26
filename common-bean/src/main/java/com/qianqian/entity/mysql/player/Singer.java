package com.qianqian.entity.mysql.player;

import com.qianqian.entity.BaseEntity;
import lombok.Data;

import javax.persistence.Column;

/**
 * 歌手
 */
@Data
public class Singer extends BaseEntity {

    /**
     * 姓名
     */
    @Column
    private String name;

    /**
     * 照片
     */
    @Column
    private String pic;

    /**
     * 性别
     */
    private Integer sex;

    /**
     * 简介
     */
    private String memo;

    /**
     * 地区
     */
    private String area;
}
