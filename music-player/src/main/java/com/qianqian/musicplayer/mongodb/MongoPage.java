package com.qianqian.musicplayer.mongodb;

import org.bson.Document;

public class MongoPage {

    private int pageNumber;
    private int pageSize;
    private Document orderBy;
    private long totalCount;
    private long totalPage;

    public int getPageNumber() {
        return pageNumber;
    }

    public void setPageNumber(int pageNumber) {
        this.pageNumber = pageNumber;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public Document getOrderBy() {
        return orderBy;
    }

    public void setOrderBy(Document orderBy) {
        this.orderBy = orderBy;
    }

    public long getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(long totalCount) {
        this.totalCount = totalCount;
    }

    public long getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(long totalPage) {
        this.totalPage = totalPage;
    }

}
