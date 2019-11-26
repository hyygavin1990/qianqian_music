var QuestionCategory = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null,
    domain: "question_categroy_statics"
};

var ismonth=0;
/**
 * jqGrid初始化参数
 */
QuestionCategory.initOptions = function () {
    var options = {
        url : "/questioncategory/grid",
        postData: {
            categoryId: $("#categoryId").val(),
            projectId:$("#projectId").val(),
            time : $("#day").val(),
            stateMonth : 0,
        },
        autowidth:true,
        colNames: ['编号','问题类型', '个数','占比','操作'],
        colModel: [
            {name: 'id', index: 'id', width: 30, sorttype: "int"},
            {name: 'name', index: 'name', width: 90},
            {name: 'num', index: 'num', width: 50, sortable: false},
            {name: 'proportion', index: 'proportion', width: 50, sortable: false},
            {name: 'operate', index: 'operate', width: 20, editable: false, sortable: false, formatter: function (cellvar, options, rowObject) {
                    var qtypeId=rowObject["id"];
                    var str ='<button class="detail btn btn-sm btn-primary "    onclick="QuestionCategory.toRuleQuality(\''+qtypeId+'\');">详情</button>';
                    return str;
                }}
        ],
        gridComplete: function () {
            refreshPermission(QuestionCategory.domain);
        },
        loadComplete: function () {
            if (ismonth!==0) {
                $("button.detail").hide();
            }else{
                $("button.detail").show();
            }
            //在表格加载完成后执行
            var ids = $("#grid-table").jqGrid("getDataIDs");//获取所有行的id
            var rowDatas = $("#grid-table").jqGrid("getRowData");//获取所有行的数据
            // for(var i=0;i < rowDatas.length;i++){
            //     var rowData = rowDatas[i];
            //     var totalAmount = rowData.totalAmount.replace("￥","");
            //     var balance = rowData.balance.replace("￥","");
            //     if(totalAmount-balance < 1000){//如果某一行中的“tax”为0，那就把这一整行的背景颜色设为红色
            //         $("#"+ids[i]).css("background-color","#FF7575");
            //     }
            // }
        }
    };
    return options;
};

/**
 * 根据关键词搜索
 */
QuestionCategory.search = function () {
    var searchParam = {};
    // alert($("#monthSearch").css('display'));
    if ($("#monthSearch").css('display') === 'none') {
        searchParam.stateMonth=0;
        if($("#day").val()==""||$("#day").val()==null){
            info("必须选择时间");
            return ;
        }
        searchParam.time = $("#day").val();
    }else{
        searchParam.stateMonth=1;
        if($("#month").val()==""||$("#month").val()==null){
            info("必须选择时间");
            return ;
        }
        searchParam.time = $("#month").val();
    }
    // alert(searchParam.stateMonth)

    // searchParam.categoryId = $("#categoryId").val();
    searchParam.projectId = $("#projectId").val();
    searchParam.rid=$("#rid").val();
    searchParam.batchname=$("#batchname").val();

    QuestionCategory.table.reload(searchParam);


};

/**
 * 重置搜索
 */
QuestionCategory.resetSearch = function () {
    $("#companyId").val("");
    $("#projectId").val("");
    $("#batchname").val("");
    $("#rid").val("");
    initDateTimePicker()
    QuestionCategory.search();
};

QuestionCategory.changeCategory=function(){
    //改变规则组  更新项目下拉框
    var categoryId =$("#categoryId").val();
    if(categoryId==""){
        $("#projectId").html('<option value="">不限</option>');
    }else{
        var html = '<option value="">不限</option>';
        $.ajax({
            url: "/questioncategory/getProjectData?categoryId=" + categoryId,
            type: 'GET',
            dataType: "json",
            success: function (r) {
                var projects = r.obj;
                if(projects.length>0){
                    for(var i=0;i<projects.length;i++){
                        html+='<option value="'+projects[i].id+'">'+projects[i].name+'</option>';
                    }
                }
                $("#projectId").html(html);
            }
        })
    }
}

QuestionCategory.changeCompany=function(){
    //改变规则组  更新项目下拉框
    var companyId =$("#companyId").val();
    if(companyId==""){
        $("#projectId").html('<option value="">不限</option>');
    }else{
        var html = '';
        $.ajax({
            url: "/questioncategory/getprojects?companyId=" + companyId,
            type: 'GET',
            dataType: "json",
            success: function (r) {
                var projects = r.obj;
                if(projects.length>0){
                    for(var i=0;i<projects.length;i++){
                        if (i==0) {
                            html+='<option value="'+projects[i].id+'" selected>'+projects[i].name+'</option>';
                        }else {
                            html+='<option value="'+projects[i].id+'">'+projects[i].name+'</option>';
                        }
                    }
                }
                $("#projectId").html(html);
            }
        })
    }
}

QuestionCategory.changeProject=function(){
    //改变规则组  更新项目下拉框
    var projectId =$("#projectId").val();
    if(projectId==""){
        $("#rid").html('<option value="">不限</option>');
        // $("#batchid").html('<option value="">不限</option>');
    }else{
        // var htmlb = '<option value="">不限</option>';
        var htmlr = '<option value="">不限</option>';
        $.ajax({
            url: "/questioncategory/getrule?projectId=" + projectId,
            type: 'GET',
            dataType: "json",
            success: function (r) {
                // var batchs = r.obj.batchlist;
                // if(batchs.length>0){
                //     for(var i=0;i<batchs.length;i++){
                //         htmlb+='<option value="'+batchs[i].id+'">'+batchs[i].note+'</option>';
                //     }
                // }
                var rules = r.obj.rulelist;
                if(rules.length>0){
                    for(var i=0;i<rules.length;i++){
                        htmlr+='<option value="'+rules[i].id+'">'+rules[i].tag+'</option>';
                    }
                }
                $("#rid").html(htmlr);
                // $("#batchid").html(htmlb);
            }
        })
    }
}

/**
 * 质检首页
 */
QuestionCategory.toQuality = function (questionid) {
    window.location.href ="/quality/list_search?companyId="+$("#companyId").val()+"&time="+$("#day").val()+"&projectId="+$("#projectId").val()+"&questionType="+questionid;
}

/**
 * 带条件跳转规则质检首页
 */
QuestionCategory.toRuleQuality = function (questionid) {
    window.location.href ="/rulequality/list_search?companyId="+$("#companyId").val()+"&time="+$("#day").val()+"&projectId="+$("#projectId").val()+"&rid="+$("#rid").val()+"&batchname="+$("#batchname").val()+"&failQuestion="+questionid;
}

QuestionCategory.dayTotal = function(){
    dayBarShow();
    QuestionCategory.search();
    ismonth=0;
}


QuestionCategory.monthTotal= function(){
    monthBarShow();
    QuestionCategory.search();
    ismonth=1;
}
function  dayBarShow(){
    var day =document.getElementById("daySearch");
    var  month =document.getElementById("monthSearch");
    month.style.display="none";
    day.style.display="inline";
}
function  monthBarShow(){
    var day =document.getElementById("daySearch");
    var  month =document.getElementById("monthSearch");
    day.style.display="none";
    month.style.display="inline";
}

//初始化日期插件
function initDayTimePicker() {
    var dateTimePickerOption = {
        format: 'yyyy-mm-dd',
        weekStart: 1,
        autoclose: true,
        startView: 2,
        minView: 2,
        forceParse: false,
        language: 'zh-CN'
    };
    var startDate = $('#day');
    var today = new Date();
    startDate.val(dateFtt("yyyy-MM-dd",today));
    startDate.datetimepicker(dateTimePickerOption);
}
function initMonthTimePicker(){
    var month = $('#month');
    var today = new Date();
    month.val(DateFormat.format(today,"yyyy-MM"));
    month.datepicker({
        minViewMode: 1,
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        todayHighlight: true,
        format: "yyyy-mm",
        language: "zh-CN"
    }).on("changeDate", function (e) {
        // CompanyBill.changeDate();
    });

}

function dateFtt(fmt,date)
{ //author: meizz
    var o = {
        "M+" : date.getMonth()+1,                 //月份
        "d+" : date.getDate(),                    //日
        "h+" : date.getHours(),                   //小时
        "m+" : date.getMinutes(),                 //分
        "s+" : date.getSeconds(),                 //秒
        "q+" : Math.floor((date.getMonth()+3)/3), //季度
        "S"  : date.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}
function post(URL, PARAMS) {
    var temp = document.createElement("form");
    temp.action = URL;
    temp.method = "post";
    temp.style.display = "none";
    for (var x in PARAMS) {
        var opt = document.createElement("textarea");
        opt.name = x;
        opt.value = PARAMS[x];
        // alert(opt.name)
        temp.appendChild(opt);
    }
    document.body.appendChild(temp);
    temp.submit();
    return temp;
}
var jstreeOptions = {
    core: {
        data: [],
        themes: {
            "variant" : "large"
        }
    },
    checkbox: {
        "keep_selected_style": false
    },
    plugins: ["wholerow", "checkbox" ]   //引用插件："wholerow"-行点击；"checkbox"-加上复选框
};

$(function() {
    initDayTimePicker();
    initMonthTimePicker();
    QuestionCategory.changeProject();
    dayBarShow();
    var jqGrid = new JqGrid("#grid-table", "#grid-pager", QuestionCategory.initOptions());
    QuestionCategory.table = jqGrid.init();
});