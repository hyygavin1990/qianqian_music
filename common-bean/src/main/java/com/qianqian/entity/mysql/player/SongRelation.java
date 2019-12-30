package com.qianqian.entity.mysql.player;

import com.qianqian.entity.BaseEntity;
import lombok.Data;

/**
 * 歌曲：演唱者 1：n 歌手
 * Created by hyygavin on 2019/4/22.
 */
@Data
public class SongRelation extends BaseEntity {

    private Integer songid;

    private Integer singerid;

}
