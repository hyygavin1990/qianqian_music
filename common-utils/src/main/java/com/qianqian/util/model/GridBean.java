package com.qianqian.util.model;

import java.io.Serializable;
import java.util.List;

@SuppressWarnings("unused")
public class GridBean implements Serializable {
    private int id;
    private List cell;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List getCell() {
        return cell;
    }

    public void setCell(List cell) {
        this.cell = cell;
    }

}
