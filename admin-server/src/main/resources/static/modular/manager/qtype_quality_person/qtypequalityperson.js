var QualityPerson = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null,
    domain: "qtypequalityperson_statistics"
};

/**
 * jqGrid初始化参数
 */
QualityPerson.initOptions = function () {
    var options = {
        url : "/qualityperson/grid",
        postData: {
            companyId: $("#companyId").val(),
            time : $("#date").val()
        },
        autowidth:true,
        colNames: ['编号','问题类型', '个数','操作'],
        colModel: [
            {name: 'id', index: 'id', width: 30, sorttype: "int"},
            {name: 'name', index: 'name', width: 90},
            {name: 'num', index: 'num', width: 50, sortable: false},
            {name: 'operate', index: 'operate', width: 20, editable: false, sortable: false, formatter: function (cellvar, options, rowObject) {
                    var qtypeId=rowObject["id"];
                    var str ='<button class="control-auth btn btn-sm btn-primary"  data-auth="questiontype_detail" onclick="Questiontype.toQuality(\''+qtypeId+'\');">详情</button>';
                    return str;
                }}
        ],
        pgbuttons: false,
        pginput:false,
        gridComplete: function () {
            refreshPermission(Questiontype.domain);
        }
    };
    return options;
};

/**
 * 根据关键词搜索
 */
QualityPerson.search = function () {

    if($("#date").val()==""||$("#date").val()==null){
        info("必须选择时间");
        return ;
    }

    $("#datatable").scrollLeft(0);
    var sdate = $("#date").val().split('-');
    var  day = new Date(sdate[0],sdate[1],0);
    var daycount = day.getDate();

    var companyId = $("#companyId").val()
    var projectId = $("#projectId").val();
    var quserid = $("#quser").val();
    var time = $("#date").val();

    var html = '<table class="table table-hover text-nowrap">';
    $.ajax({
        url: "/qtypequalityperson/search?companyId=" + companyId+"&projectId="+projectId+"&month="+time+"&quserid="+quserid,
        type: 'GET',
        dataType: "json",
        success: function (r) {

            var projects = r.obj;
            if (projects.length > 0) {
                html += '<thead >';
                html += '<tr>';
                html += '<th>时间</th>';
                var today= new Date();
                for (var i = 1; i <= daycount; i++) {
                    var getday= new Date(time+'-'+ i);
                    if(today.getTime()>=getday.getTime()){
                        html += '<th >' +time+'-'+ i + '</th>';
                    }
                }
                html += '<th >合计</th>';
                html += '</tr>';
                html += '</thead>';
                html += '<tbody>';
                for (var i = 0; i < projects.length; i++) {
                    html += '<tr>';
                    for (var key in projects[i]) {
                        html += '<td>' + key + '</td>';
                        for (var j = 0; j < projects[i][key].length; j++) {

                            html += '<td>' + projects[i][key][j] + '</td>';
                        }
                    }
                    html += '</tr>';
                }
                html += '</tbody>';
                html += '</table>';
            }
            $("#datatable").html(html);
        }
    })
};

//导出复用leads
QualityPerson.download = function () {
    if($("#date").val()==""||$("#date").val()==null){
        info("必须选择时间");
        return ;
    }

    var sdate = $("#date").val().split('-');
    var  day = new Date(sdate[0],sdate[1],0);
    var daycount = day.getDate();
    var quserid = $("#quser").val();
    var companyId = $("#companyId").val();
    var projectId = $("#projectId").val();
    var time = $("#date").val();
    $.ajax({
        url: "/qtypequalityperson/export?companyId=" + companyId+"&projectId="+projectId+"&month="+time+"&quserid="+quserid,
        type: 'GET',
        dataType: "json",
        success : function(data) {
            window.open("/qtypequalityperson/download?key="+data.obj);
        }
    });


}

/**
 * 重置搜索
 */
QualityPerson.resetSearch = function () {
    $("#companyId").val("");
    $("#projectId").val("");
    initDateTimePicker()
    QualityPerson.search();
};

/**
 * 改变企业  更新批次下拉框
 */
QualityPerson.changeCompany = function () {
    //改变企业  更新项目下拉框
    var companyId =$("#companyId").val();
    if(companyId==""){
        $("#projectId").html('<option value="">不限</option>');
    }else{
        var html = '<option value="">不限</option>';
        $.ajax({
            url: "/quality/getProjectData?companyId=" + companyId,
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


//初始化日期插件
function initDateTimePicker() {
    var dateTimePickerOption = {
        startView: 2,
        minView: 2,
        //minViewMode: 1,
        format: 'yyyy-mm',
        todayBtn: true,
        autoclose: true,
        // minuteStep: 1

        // minViewMode: 1,
        // keyboardNavigation: false,
        // forceParse: false,
        // autoclose: true,
        // todayHighlight: true,
        // format: "yyyy-mm",
        // language: "zh-CN"
    };
    var startDate = $('#date');

    //开始日期默认今天零点
    var today = new Date();
    startDate.val(dateFtt("yyyy-MM",today));
    // startDate.datetimepicker(dateTimePickerOption);
    startDate.datetimepicker(dateTimePickerOption);
    //结束日期默认明天零点
    dateTimePickerOption.initialDate = today;
}

$("#datatable").scroll(function(){//给table外面的div滚动事件绑定一个函数
    var left=$("#datatable").scrollLeft();//获取滚动的距离
    var top=$("#datatable").scrollTop();//获取滚动的距离
    var trs=$("#datatable table tr");//获取表格的所有tr
    trs.each(function(i){//对每一个tr（每一行）进行处理
//获得每一行下面的所有的td，然后选中下标为0的，即第一列，设置position为相对定位
//相对于父div左边的距离为滑动的距离，然后设置个背景颜色，覆盖住后面几列数据滑动到第一列下面的情况
//如果有必要也可以设置一个z-index属性
        if(i==0){
            $(this).children().css({"position":"relative","top":top,"background-color":"#F0F0F0"});
        }
        $(this).children().eq(0).css({"position":"relative","left":left,"background-color":"#F0F0F0"});
    });
});

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




$(function() {
    initDateTimePicker();
    QualityPerson.changeCompany();
    // var jqGrid = new JqGrid("#grid-table", "#grid-pager", Questiontype.initOptions());
    // Questiontype.table = jqGrid.init();
});