package com.qianqian.util.model;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

@SuppressWarnings("unused")
public class GridResultBean<T> implements Serializable {
    private int page;
    private long total;
    private long records;
    private List<T> rows;
    private Map userdata;

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public long getRecords() {
        return records;
    }

    public void setRecords(long records) {
        this.records = records;
    }

    public List<T> getRows() {
        return rows;
    }

    public void setRows(List<T> rows) {
        this.rows = rows;
    }

    public Map getUserdata() {
        return userdata;
    }

    public void setUserdata(Map userdata) {
        this.userdata = userdata;
    }

}
