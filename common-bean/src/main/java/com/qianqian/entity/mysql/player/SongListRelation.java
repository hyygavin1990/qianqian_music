package com.qianqian.entity.mysql.player;

import com.qianqian.entity.BaseEntity;
import lombok.Data;

/**
 * 歌单:歌曲 1:n
 * Created by hyygavin on 2019/5/7.
 */
@Data
public class SongListRelation extends BaseEntity{

    private Integer listid;

    private Integer songid;

}
