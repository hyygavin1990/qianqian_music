var RuleDuration = {
};
//初始化日期插件
function initDateTimePicker() {
    var dateTimePickerOption = {
        minView: "month", //选择日期后，不会再跳转去选择时分秒
        language:  'zh-CN',
        format: 'yyyy-mm-dd',
        todayBtn: true,
        autoclose: true,
        // minuteStep: 1
    };
    var dateTime = $('#dateTime');
    //开始日期默认今天零点
    var today = new Date();
    var year = today.getFullYear(),
        month = today.getMonth() + 1,//月份是从0开始的
        day = today.getDate();
    var date = year + '-' +
        month + '-' +
        day;

    dateTime.val(dateFtt("yyyy-MM-dd",new Date(date)));
    dateTime.datetimepicker(dateTimePickerOption);
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
//搜索
RuleDuration.search = function(){
    var params = {};
    params.companyId = $("#companyId").val();
    params.projectId = $("#projectId").val();
    if(params.companyId==""){
        info("请选择公司");
        return;
    }
    if(params.projectId==""){
        info("请选择项目");
        return;
    }
    params.dateTime = $("#dateTime").val();
    params.startTime = $("#startTime").val();
    params.endTime = $("#endTime").val();
    if(params.startTime==""){
        info("请输入开始时间段");
        return;
    }
    if(params.endTime==""){
        info("请输入结束时间段");
        return;
    }
    $("#echarts").show(1000);
    var mychart = RuleDuration.echarts();
    mychart.showLoading();
    $.ajax({
        url:"/rule_duration/searchEcharts",
        data:JSON.stringify(params),
        contentType: "application/json;charset=utf-8",
        type:"POST",
        dataType:"json",
        success:function (r) {
            if(r.code===0){
                var dataObj = r.obj;
                var series = []
                var k=[];
                var x=[];
                $.each(dataObj,function (key,values) {
                    if(key=="x"){
                        x=values;
                    }else {
                        k.push(key)
                        var item = {
                            name:key,
                            data:values,
                            type:'line',
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            },
                           /* markLine : {
                                data : [
                                    {type : 'average', name: '平均值'}
                                ]
                            }*/};
                        series.push(item)
                    }
                });
                mychart.hideLoading();
                if(series.length==0){
                    info("没有相关信息");
                    mychart.clear();
                } else {
                    mychart.setOption({legend:{data:k},tooltip:{trigger: 'axis',formatter:function (params) {
                                var result = '';
                                params.forEach(function (item) {
                                    result += item.marker + " " + "外呼时长：" + item.axisValue+"s" +"</br>";
                                    result += item.marker + " " + "占比率：" + item.value+"%" +"</br>";
                                });
                                return result;
                            }},
                        xAxis : [{data : x}], series : series});
                }

            }
        }
    });
}
//echarts参数
RuleDuration.echarts = function(){
    var myChart = echarts.init(document.getElementById('echarts'));
    var option = {
        title : {
            text: '0-120s规则分布图',
            // subtext: '虚线为平均值'
        },
        grid:{
            left:30
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : []
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel : {
                    formatter: '{value}%'
                }
            }
        ],
        series : []
    };
    myChart.setOption(option);
    return myChart;
}
//下拉框改变事件
RuleDuration.selectchange = function(){
    var elem = $("#companyId");
    var pSelect = $("#projectId");
    elem.change(function () {
        $.ajax({
            url:"/rule_duration/getProject?cid="+elem.val(),
            type:"GET",
            dateType:"json",
            success:function (r) {
                if(r.code===0){
                    var list = r.obj;
                    pSelect.empty();
                    pSelect.append(" <option value=\"\" selected>请选择项目</option>");
                    for(var i=0;i<list.length;i++){
                        pSelect.append("<option value=\""+list[i].id+"\">"+list[i].name+"</option>")
                    }
                }
            }
        });
    });
}
$(function() {
    //初始化日期插件
    initDateTimePicker();
    //初始换图表
    RuleDuration.echarts();

    RuleDuration.selectchange();

    $("#echarts").hide();

});