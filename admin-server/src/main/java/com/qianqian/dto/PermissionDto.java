package com.qianqian.dto;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * @author fonlin
 * @date 2018/5/22
 */
public class PermissionDto {

    @NotNull
    private Integer id;

    private List<String> codes;

    public List<String> getCodes() {
        return codes;
    }

    public void setCodes(List<String> codes) {
        this.codes = codes;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
