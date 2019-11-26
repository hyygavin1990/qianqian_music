package com.qianqian.util.model;

import java.io.Serializable;

public class Page  implements Serializable {
	private Integer pageNo;
	private Integer pageSize;
	private Integer totalRecords;
	private Integer totalPages;
	private Integer viewTags;
	public Page(Integer pageNo,Integer pageSize,Integer totalRecords, Integer viewTags)
	{
		this.pageNo=pageNo;
		this.pageSize=pageSize;
		this.totalRecords=totalRecords;
		this.viewTags = viewTags;
		this.totalPages=(pageSize+totalRecords-1)/pageSize;
		if(pageNo>totalPages)
		{
			this.pageNo=totalPages;
		}
		if(this.pageNo==0)
		{
			this.pageNo=1;
		}
	}
	public Integer getPageNo() {
		return pageNo;
	}
	public void setPageNo(Integer pageNo) {
		this.pageNo = pageNo;
	}
	public Integer getPageSize() {
		return pageSize;
	}
	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}
	public Integer getTotalRecords() {
		return totalRecords;
	}
	public void setTotalRecords(Integer totalRecords) {
		this.totalRecords = totalRecords;
	}
	public Integer getTotalPages() {
		return totalPages;
	}
	public void setTotalPages(Integer totalPages) {
		this.totalPages = totalPages;
	}
	public Integer getViewTags() {
		return viewTags;
	}
	public void setViewTags(Integer viewTags) {
		this.viewTags = viewTags;
	}

}
