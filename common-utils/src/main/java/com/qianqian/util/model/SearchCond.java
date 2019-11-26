package com.qianqian.util.model;
import java.io.Serializable;
import java.sql.Timestamp;

public class SearchCond  implements Serializable {
	private String starttime;
	private String endtime;
	private Timestamp tsstarttime;
	private Timestamp tsendtime;
	private Integer deptid;
	private Integer type;
	private String keyword;
	private Integer ltype;
	private Integer subtype;
	private Integer status;
	private Integer searchType;
	private Integer termtype;
	private String columnid;
	private String authorid;
	private String title;
	private String audituserid;
	public Integer getSearchType() {
		return searchType;
	}
	public void setSearchType(Integer searchType) {
		this.searchType = searchType;
	}
	public String getStarttime() {
		return starttime;
	}
	public void setStarttime(String starttime) {
		this.starttime = starttime;
	}
	public String getEndtime() {
		return endtime;
	}
	public void setEndtime(String endtime) {
		this.endtime = endtime;
	}
	public Timestamp getTsstarttime() {
		return tsstarttime;
	}
	public void setTsstarttime(Timestamp tsstarttime) {
		this.tsstarttime = tsstarttime;
	}
	public Timestamp getTsendtime() {
		return tsendtime;
	}
	public void setTsendtime(Timestamp tsendtime) {
		this.tsendtime = tsendtime;
	}
	public Integer getDeptid() {
		return deptid;
	}
	public void setDeptid(Integer deptid) {
		this.deptid = deptid;
	}
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}
	public String getKeyword() {
		return keyword;
	}
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public Integer getLtype() {
		return ltype;
	}
	public void setLtype(Integer ltype) {
		this.ltype = ltype;
	}
	public Integer getSubtype() {
		return subtype;
	}
	public void setSubtype(Integer subtype) {
		this.subtype = subtype;
	}
	public Integer getTermtype() {
		return termtype;
	}
	public void setTermtype(Integer termtype) {
		this.termtype = termtype;
	}
	public String getColumnid() {
		return columnid;
	}
	public void setColumnid(String columnid) {
		this.columnid = columnid;
	}
	public String getAuthorid() {
		return authorid;
	}
	public void setAuthorid(String authorid) {
		this.authorid = authorid;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getAudituserid() {
		return audituserid;
	}
	public void setAudituserid(String audituserid) {
		this.audituserid = audituserid;
	}
	
}
