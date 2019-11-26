package com.qianqian.entity.mysql.player;

import com.qianqian.entity.BaseEntity;
import lombok.Data;


/**
 * 歌曲
 * Created by hyygavin on 2019/4/22.
 */
@Data
public class Song extends BaseEntity {

    /**
     * 名称
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
    private String lrc;
    private String url;
}
