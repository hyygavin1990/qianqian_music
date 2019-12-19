package com.qianqian.entity.mysql.player;

import com.qianqian.entity.BaseEntity;
import lombok.Data;

/**
 * 喜爱歌曲
 * Created by hyygavin on 2019/5/7.
 */
@Data
public class LoveSong extends BaseEntity{

    private Integer userid;

    private Integer songid;



}
