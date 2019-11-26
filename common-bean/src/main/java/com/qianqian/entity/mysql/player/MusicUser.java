package com.qianqian.entity.mysql.player;

import com.qianqian.entity.BaseEntity;
import lombok.Data;

/**
 * 播放器用户
 * Created by hyygavin on 2019/5/7.
 */
@Data
public class MusicUser extends BaseEntity {

    private String username;

    private String nickname;

    private String password;

    private String mobile;

    private String birthday;

    private String gender;

    private String email;

    private Integer status;

    private Integer permission;

    private String lastLogin;

    private String lastIp;
}
