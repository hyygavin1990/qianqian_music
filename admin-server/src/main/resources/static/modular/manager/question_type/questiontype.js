var Questiontype = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null,
    domain: "questiontype_statics"
};

/**
 * jqGrid初始化参数
 */
Questiontype.initOptions = function () {
    var options = {
        url : "/questiontype/grid",
        postData: {
            companyId: $("#companyId").val(),
            time : $("#date").val()
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
                    var str ='<button class="control-auth btn btn-sm btn-primary"  data-auth="questiontype_detail" onclick="Questiontype.toRuleQuality(\''+qtypeId+'\');">详情</button>';
                    // var str ='<button class="control-auth btn btn-sm btn-primary"  data-auth="questiontype_detail" onclick="Questiontype.test();">详情</button>';
                    return str;
                }}
        ],
        gridComplete: function () {
            refreshPermission(Questiontype.domain);
        },
        loadComplete: function () {
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
Questiontype.search = function () {
    var searchParam = {};
    if($("#date").val()==""||$("#date").val()==null){
        info("必须选择时间");
        return ;
    }
    searchParam.companyId = $("#companyId").val();
    searchParam.projectId = $("#projectId").val();
    searchParam.time = $("#date").val();
    Questiontype.table.reload(searchParam);
};

/**
 * 重置搜索
 */
Questiontype.resetSearch = function () {
    $("#companyId").val("");
    $("#projectId").val("");
    initDateTimePicker()
    Questiontype.search();
};

/**
 * 改变企业  更新批次下拉框
 */
Questiontype.changeCompany = function () {
    //改变企业  更新项目下拉框
    var companyId =$("#companyId").val();
    if(companyId==""){
        $("#projectId").html('<option value="">不限</option>');
    }else{
        var html = '<option value="">不限</option>';
        $.ajax({
            url: "/questiontype/getprojects?companyId=" + companyId,
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

/**
 * 质检首页
 */
Questiontype.toQuality = function (phoneId) {
    window.location.href ="/quality/listsearch?companyId="+$("#companyId").val()+"&time="+$("#date").val()+"&projectId="+$("#projectId").val()+"&questionType="+phoneId;
}

/**
 * 跳转到规则质检首页
 * @param phoneId
 */
Questiontype.toRuleQuality = function (qtypeId) {
    window.location.href ="/rulequality/list_search?companyId="+$("#companyId").val()+"&time="+$("#date").val()+"&projectId="+$("#projectId").val()+"&questionType="+qtypeId;
}

Questiontype.test =function () {
    window.location.href="/quality/list_search?companyId=1&time='2019-02-01'&projectId=1&questionType=123";
}
//初始化日期插件
function initDateTimePicker() {
    var dateTimePickerOption = {
        minView:'month',
        format: 'yyyy-mm-dd',
        todayBtn: true,
        autoclose: true,
        minuteStep: 1
    };
    var startDate = $('#date');

    //开始日期默认今天零点
    var today = new Date();
    startDate.val(dateFtt("yyyy-MM-dd",today));
    startDate.datetimepicker(dateTimePickerOption);
    //结束日期默认明天零点
    dateTimePickerOption.initialDate = today;
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
    initDateTimePicker();
    Questiontype.changeCompany();
    var jqGrid = new JqGrid("#grid-table", "#grid-pager", Questiontype.initOptions());
    Questiontype.table = jqGrid.init();
});