package com.qianqian.musicplayer.entity;

import com.qianqian.musicplayer.util.SpringContextUtil;

import java.util.Date;

/**
 * Created by hyygavin on 2017/11/15.
 */
//@Component
public class Page {

    public static  final String PAGE_REPLAYCE = "__PAGE__";

    // 分页栏每页显示的页数
    private int rollPage = 5;
    // 页数跳转时要带的参数
    private String parameter  ;
    // 分页URL地址
    private String url;
    // 默认列表每页显示行数
    private int listRows = 20;
    // 起始行数
    private int firstRow    ;
    // 分页总页面数
    private int totalPages  ;
    // 总行数
    private int totalRows  ;
    // 当前页数
    private int nowPage    ;
    // 分页的栏的总页数
    private int coolPages   ;
    // 分页显示定制
    //array('header'=>'条记录','prev'=>'上一页','next'=>'下一页','first'=>'第一页','last'=>'最后一页','theme'=>' %totalRow% %header% %nowPage%/%totalPage% 页 %upPage% %downPage% %first%  %prePage%  %linkPage%  %nextPage% %end%');
    // 默认分页变量名
//    @Resource
    private PageConfig pageConfig;
    // 默认分页变量名
    private String varPage ;

    public Page(int listRows , String parameter, String url, String varPage, int nowPage) {
        this.parameter = parameter;
        this.listRows = listRows;
        this.nowPage = nowPage;
        this.url = url;
        this.varPage =(varPage!=null&&varPage.length()>0)?varPage:"p";
        this.pageConfig = SpringContextUtil.getBean(PageConfig.class);

    }

    public void calculate(){
        this.totalPages   = (int) Math.ceil(((double)totalRows)/((double)listRows));
        this.coolPages   = (int) Math.ceil(((double)totalPages)/((double)rollPage));
        if(this.nowPage < 1){
            this.nowPage = 1;
        }else if(totalPages!=0 && this.nowPage>totalPages) {
            this.nowPage  =   totalPages;
        }

        this.firstRow     =   this.listRows*(nowPage-1);
    }

    public void setTotalRows(int totalRows) {
        this.totalRows = totalRows;
    }


    public String show(){
        if(0 == totalRows) return "";
        int nowCoolPage    =   (int) Math.ceil(((double)nowPage)/((double)rollPage));
        int upRow          =   nowPage-1;
        int downRow        =   nowPage+1;
        url = url+"?"+varPage+"="+PAGE_REPLAYCE+parameter;
        String upPage ="";
        if (upRow>0){
            upPage     =   "<a href='"+url.replaceAll(PAGE_REPLAYCE,upRow+"")+"'>"+pageConfig.getPrev()+"</a>";
        }else{
            upPage     =   "";
        }
        String downPage ="";
        if (downRow <= totalPages){
            downPage   =   "<a href='"+url.replaceAll(PAGE_REPLAYCE,downRow+"")+"'>"+pageConfig.getNext()+"</a>";
        }else{
            downPage   =   "";
        }
        String theFirst = "";
        String prePage = "";
        if(nowCoolPage != 1){
            int preRow     =  nowPage-rollPage;
            prePage    =   "<a href='"+url.replaceAll(PAGE_REPLAYCE,preRow+"")+"' >上"+rollPage+"页</a>";
            theFirst   =   "<a href='"+url.replaceAll(PAGE_REPLAYCE,"1")+"' >"+pageConfig.getFirst()+"</a>";
        }

        String nextPage = "";
        String theEnd = "";
        if(nowCoolPage != coolPages){
            int nextRow    =   nowPage+rollPage;
            int theEndRow  =   totalPages;
            nextPage   =   "<a href='"+url.replaceAll(PAGE_REPLAYCE,nextRow+"")+"' >下"+rollPage+"页</a>";
            theEnd     =   "<a href='"+url.replaceAll(PAGE_REPLAYCE,theEndRow+"")+"' >"+pageConfig.getLast()+"</a>";
        }
        String linkPage = "";
        for(int i=1;i<=rollPage;i++){
            int page       =   (nowCoolPage-1)*rollPage+i;
            if(page!=nowPage){
                if(page<=totalPages){
                    linkPage += "<a href='"+url.replaceAll(PAGE_REPLAYCE,page+"")+"'>"+page+"</a>";
                }else{
                    break;
                }
            }else{
                if(totalPages != 1){
                    linkPage += "<span class='current'>"+page+"</span>";
                }
            }
        }
        String result = pageConfig.getTheme();
        String[] arr1 = {"%header%","%nowPage%","%totalRow%","%totalPage%","%upPage%","%downPage%","%first%","%prePage%","%linkPage%","%nextPage%","%end%"};
        String[] arr2 = {pageConfig.getHeader(),nowPage+"",totalRows+"",totalPages+"",upPage,downPage,theFirst,prePage,linkPage,nextPage,theEnd};
        for (int i = 0; i < arr1.length; i++) {
            result = result.replaceAll(arr1[i],arr2[i]);
        }
        return result;
    }


    public int getRollPage() {
        return rollPage;
    }

    public String getParameter() {
        return parameter;
    }

    public String getUrl() {
        return url;
    }

    public int getListRows() {
        return listRows;
    }

    public int getFirstRow() {
        return firstRow;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public int getTotalRows() {
        return totalRows;
    }

    public int getNowPage() {
        return nowPage;
    }

    public int getCoolPages() {
        return coolPages;
    }

    public String getVarPage() {
        return varPage;
    }


    public static void main(String[] args) {
        System.out.println(new Date().getTime());
    }
}
