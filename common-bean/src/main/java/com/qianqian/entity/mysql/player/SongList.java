package com.qianqian.entity.mysql.player;

import com.qianqian.entity.BaseEntity;
import lombok.Data;

import javax.persistence.Column;

/**
 * 歌单
 * Created by hyygavin on 2019/5/7.
 */
@Data
public class SongList extends BaseEntity{

    /**
     * 名称
     */
    @Column
    private String name;

    /**
     * 照片
     */
    @Column
    private String pic;

    /**
     * 所属id
     */
    private Integer userid;

    /**
     * 0 普通 1 我的喜爱
     */
    private Integer type;
    /**
     * 简介
     */
    private String memo;


}
