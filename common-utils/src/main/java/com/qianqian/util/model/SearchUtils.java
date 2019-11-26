package com.qianqian.util.model;

import java.io.Serializable;
import java.util.List;

public class SearchUtils implements Serializable
{
	public static String generateSearchCond(SearchBean sb,StringBuffer where)
	{
		String opt = sb.getGroupOp();
		List<SearchFieldsBean> sfbs = sb.getRules();
		for(SearchFieldsBean tmp:sfbs)
		{
			where.append(" "+opt+" ");
			where.append(tmp.getField());
			String op = tmp.getOp();
			if("eq".equals(op))
			{
				where.append(" = '"+tmp.getData()+"'");
			}
			else if("ne".equals(op))
			{
				where.append(" <> '"+tmp.getData()+"'");
			}
			else if("lt".equals(op))
			{
				where.append(" < '"+tmp.getData()+"'");
			}
			else if("le".equals(op))
			{
				where.append(" <= '"+tmp.getData()+"'");
			}
			else if("gt".equals(op))
			{
				where.append(" > '"+tmp.getData()+"'");
			}
			else if("ge".equals(op))
			{
				where.append(" >= '"+tmp.getData()+"'");
			}
			else if("bw".equals(op))
			{
				where.append(" like '"+tmp.getData()+"%'");
			}
			else if("bn".equals(op))
			{
				where.append(" not like '"+tmp.getData()+"%'");
			}
			else if("in".equals(op))
			{
				where.append(" in ('"+tmp.getData()+"')");
			}
			else if("ni".equals(op))
			{
				where.append(" not in ('"+tmp.getData()+"')");
			}
			else if("ew".equals(op))
			{
				where.append(" like '%"+tmp.getData()+"'");
			}
			else if("en".equals(op))
			{
				where.append(" not like '%"+tmp.getData()+"'");
			}
			else if("cn".equals(op))
			{
				where.append(" like '%" +tmp.getData()+"%'");
			}
			else if("nc".equals(op))
			{
				where.append(" not like '%"+tmp.getData()+"%'");
			}
		}
		return where.toString();
	}
}
