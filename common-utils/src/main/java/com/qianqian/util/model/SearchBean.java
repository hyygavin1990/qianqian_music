package com.qianqian.util.model;

import java.io.Serializable;
import java.util.List;

public class SearchBean implements Serializable
{
	private String groupOp;
	private List<SearchFieldsBean> rules;
	public String getGroupOp()
	{
		return groupOp;
	}
	public void setGroupOp(String groupOp)
	{
		this.groupOp = groupOp;
	}
	public List<SearchFieldsBean> getRules()
	{
		return rules;
	}
	public void setRules(List<SearchFieldsBean> rules)
	{
		this.rules = rules;
	}
}
