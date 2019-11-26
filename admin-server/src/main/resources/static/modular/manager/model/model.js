var Model = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null,
    table2: null,
    domain: "model",
    width:null
}
//jqGrid初始化
Model.initJqGrid1 = function () {
    var tableInstance = $("#grid-table1").jqGrid({
        url:"/model/grid1",
        postData:{
            from:$("#from").val().trim(),
            to:$("#to").val().trim(),
            type:$("#type").val().trim(),
            emotion:$("#emotion").val().trim(),
            resulttype:$("#resulttype").val().trim(),
            cid: $("#cid").val(),
            rid: $("#rid").val(),
            voiceid: $("#voiceid").val(),
            day: $("#day").val().replace(/-/g,""),
        },
        width:Model.width,
        height:null,
        mtype: "GET",
        rowNum:-1,
        viewrecords : true, //是否要显示总记录数
        datatype: "json",
        caption: "规则跳转统计表",
        jsonReader : {
            //返回json的格式匹配
            root: function (data) {
                return data.obj.list
            },
            repeatitems: false,
            id: "_id"
        },
        colNames: ['起始状态机名称','目标话术名称','类型','情感类型','情感类型描述','情感描述','是否转接','数量','比率'],
        colModel: [
            {name: 'from', index: 'from',align:"center",sortable: false,cellattr: function(rowId, tv, rawObject, cm, rdata) {
                    //合并单元格
                    return 'id=\'from' + rowId + "\'";
                }
            },
            {name: 'to', index: 'to',align:"center",  sortable: false,cellattr: function(rowId, tv, rawObject, cm, rdata) {
                    //合并单元格
                    return 'id=\'to' + rowId + "\'";
                }
            },
            {name: 'type', index: 'type', align:"center", sortable: false},
            {name: 'emotion', index: 'emotion', align:"center", sortable: false},
            {name: 'description', index: 'description', align:"center", sortable: false},
            {name: 'info', index: 'info', align:"center", sortable: false},
            {name: 'resulttype', index: 'resulttype', align:"center", sortable: false},
            {name: 'num', index: 'num', align:"center", sortable: false},
            {name: 'percent', index: 'percent', align:"center", sortable: false}
        ],
        gridComplete: function() {
            //②在gridComplete调用合并方法
            var gridName = "grid-table1";
            Merger(gridName,'from');
            Mergerto(gridName, 'to','from');
        },

    });
    return tableInstance;
};

Model.initJqGrid2 = function () {
    var tableInstance = $("#grid-table2").jqGrid({
        url:"/model/grid2",
        postData:{
            cid: $("#cid").val(),
            rid: $("#rid").val(),
            voiceid: $("#voiceid").val(),
            day: $("#day").val().replace(/-/g,""),
        },
        width:Model.width,
        mtype: "GET",
        height:null,
        rowNum:-1,
        viewrecords : true, //是否要显示总记录数
        datatype: "json",
        caption: "转接规则统计表",
        jsonReader : {
            //返回json的格式匹配
            root: function (data) {
                return data.obj.list
            },
            repeatitems: false,
            id: "_id"
        },
        colNames: ['项目名称','起始状态机名称','目标话术名称','类型','情感类型','情感类型描述','可转接数量','转接成功数量','没有坐席可转接数量','成单数'],
        colModel: [
            {name: 'projectname', index: 'projectname',align:"center",sortable: false},
            {name: 'from', index: 'from',align:"center",sortable: false},
            {name: 'to', index: 'to',align:"center",sortable: false},
            {name: 'type', index: 'type',align:"center",sortable: false},
            {name: 'emotion', index: 'emotion',align:"center",sortable: false},
            {name: 'description', index: 'description', align:"center", sortable: false},
            {name: 'cantransfernum', index: 'cantransfernum',align:"center",  sortable: false},
            {name: 'transfernum', index: 'transfernum',align:"center", sortable: false},
            {name: 'nostaffnum', index: 'nostaffnum', align:"center", sortable: false},
            {name: 'leadsnum', index: 'leadsnum', align:"center", sortable: false}
        ]

    });
    return tableInstance;
};


Model.initJqGrid3 = function () {
    var tableInstance = $("#grid-table3").jqGrid({
        url:"/model/grid3",
        postData:{
            from:$("#from").val().trim(),
            to:$("#to").val().trim(),
            type:$("#type").val().trim(),
            emotion:$("#emotion").val().trim(),
            resulttype:$("#resulttype").val().trim(),
            cid: $("#cid").val(),
            rid: $("#rid").val(),
            voiceid: $("#voiceid").val(),
            day: $("#month").val().replace(/-/g,""),
        },
        width:Model.width,
        height:null,
        mtype: "GET",
        rowNum:-1,
        viewrecords : true, //是否要显示总记录数
        datatype: "json",
        caption: "规则跳转统计表",
        jsonReader : {
            //返回json的格式匹配
            root: function (data) {
                return data.obj.list
            },
            repeatitems: false,
            id: "_id"
        },
        colNames: ['起始状态机名称','目标话术名称','类型','情感类型','情感类型描述','情感描述','是否转接','数量','比率'],
        colModel: [
            {name: 'frome', index: 'frome',align:"center",sortable: false,cellattr: function(rowId, tv, rawObject, cm, rdata) {
                    //合并单元格
                    return 'id=\'frome' + rowId + "\'";
                }
            },
            {name: 'toe', index: 'toe',align:"center",  sortable: false,cellattr: function(rowId, tv, rawObject, cm, rdata) {
                    //合并单元格
                    return 'id=\'toe' + rowId + "\'";
                }
            },
            {name: 'typee', index: 'typee', align:"center", sortable: false},
            {name: 'emotione', index: 'emotione', align:"center", sortable: false},
            {name: 'description', index: 'description', align:"center", sortable: false},
            {name: 'infoe', index: 'infoe', align:"center", sortable: false},
            {name: 'resulttypee', index: 'resulttypee', align:"center", sortable: false},
            {name: 'nume', index: 'nume', align:"center", sortable: false},
            {name: 'percente', index: 'percente', align:"center", sortable: false}
        ],
        gridComplete: function() {
            //②在gridComplete调用合并方法
            var gridName = "grid-table3";
            Merger(gridName, 'frome');
            Mergerto(gridName, 'toe','frome');
        }

    });
    return tableInstance;
};

Model.initJqGrid4 = function () {
    var tableInstance = $("#grid-table4").jqGrid({
        url:"/model/grid4",
        postData:{
            cid: $("#cid").val(),
            rid: $("#rid").val(),
            voiceid: $("#voiceid").val(),
            day: $("#month").val().replace(/-/g,""),
        },
        width:Model.width,
        height:null,
        mtype: "GET",
        rowNum:-1,
        viewrecords : true, //是否要显示总记录数
        datatype: "json",
        caption: "转接规则统计表",
        jsonReader : {
            //返回json的格式匹配
            root: function (data) {
                return data.obj.list
            },
            repeatitems: false,
            id: "_id"
        },
        colNames: ['起始状态机名称','目标话术名称','类型','情感类型','情感类型描述','可转接数量','转接成功数量','没有坐席可转接数量','成单数'],
        colModel: [
            {name: 'from', index: 'from',align:"center",sortable: false},
            {name: 'to', index: 'to',align:"center",sortable: false},
            {name: 'type', index: 'type',align:"center",sortable: false},
            {name: 'emotion', index: 'emotion',align:"center",sortable: false},
            {name: 'description', index: 'description', align:"center", sortable: false},
            {name: 'cantransfernum', index: 'cantransfernum',align:"center",  sortable: false},
            {name: 'transfernum', index: 'transfernum',align:"center", sortable: false},
            {name: 'nostaffnum', index: 'nostaffnum', align:"center", sortable: false},
            {name: 'leadsnum', index: 'leadsnum', align:"center", sortable: false}
        ]

    });
    return tableInstance;
};


//公共调用方法
function Merger(gridName, CellName) {
    //得到显示到界面的id集合
    var mya = $("#" + gridName + "").getDataIDs();
    // console.log(gridName+"1+"+mya);
    //当前显示多少条
    var length = mya.length;
    for (var i = 0; i < length; i++) {
        //从上到下获取一条信息
        // console.log("1+"+mya[i]);
        var before = $("#" + gridName + "").jqGrid('getRowData', mya[i]);
        //定义合并行数
        var rowSpanTaxCount = 1;
        for (j = i + 1; j <= length; j++) {
            //和上边的信息对比 如果值一样就合并行数+1 然后设置rowspan 让当前单元格隐藏
            var end = $("#" + gridName + "").jqGrid('getRowData', mya[j]);
            if (before[CellName] == end[CellName]) {
                rowSpanTaxCount++;
                $("#" + gridName + "").setCell(mya[j], CellName, '', { display: 'none' });
            } else {
                rowSpanTaxCount = 1;
                i = j-1;
                break;
            }
            $("#" + CellName + "" + mya[i] + "").attr("rowspan", rowSpanTaxCount);
        }
    }
}

function Mergerto(gridName, CellName,fromName) {
    //得到显示到界面的id集合
    var mya = $("#" + gridName + "").getDataIDs();
    // console.log(gridName+"1+"+mya);
    //当前显示多少条
    var length = mya.length;
    for (var i = 0; i < length; i++) {
        //从上到下获取一条信息
        // console.log("1+"+mya[i]);
        var before = $("#" + gridName + "").jqGrid('getRowData', mya[i]);
        //定义合并行数
        var rowSpanTaxCount = 1;
        for (j = i + 1; j <= length; j++) {
            //和上边的信息对比 如果值一样就合并行数+1 然后设置rowspan 让当前单元格隐藏
            var end = $("#" + gridName + "").jqGrid('getRowData', mya[j]);
            if (before[CellName] == end[CellName]) {
                if(before[fromName]==end[fromName]){
                    rowSpanTaxCount++;
                    $("#" + gridName + "").setCell(mya[j], CellName, '', { display: 'none' });
                }else {
                    i = j-1;
                    break;
                }

            } else {
                rowSpanTaxCount = 1;
                i = j-1;
                break;
            }
            $("#" + CellName + "" + mya[i] + "").attr("rowspan", rowSpanTaxCount);
        }
    }
}

//根据关键词搜索
Model.search = function () {
    var a = document.getElementById("tabMonth");
    var b = document.getElementById("tabDay");
    var searchParam = {};
    searchParam.from = $("#from").val().trim(),
    searchParam.to = $("#to").val().trim(),
    searchParam.type = $("#type").val().trim(),
    searchParam.emotion = $("#emotion").val().trim(),
    searchParam.resulttype = $("#resulttype").val().trim(),
    searchParam.cid =$("#cid").val();
    searchParam.rid =$("#rid").val();
    searchParam.voiceid =$("#voiceid").val();
    searchParam.month=$("#month").val().replace(/-/g,"");
    searchParam.day=$("#day").val().replace(/-/g,"");
    if(a.innerText ==="月" && a.getAttribute("aria-expanded")==="true"){
        $("#grid-table3").GridUnload();
        $("#grid-table4").GridUnload();
        $("#hidden3").show();
        $("#hidden4").show();
        Model.table3 = Model.initJqGrid3();
        Model.table4 = Model.initJqGrid4();
        Model.table3.setGridParam({
            postData: searchParam
        });
        Model.table3.trigger("reloadGrid");

        Model.table4.setGridParam({
            postData: searchParam
        });
        Model.table4.trigger("reloadGrid");

    }

    if(b.innerText ==="日" && b.getAttribute("aria-expanded")==="true"){
        $("#grid-table1").GridUnload();
        $("#grid-table2").GridUnload();
        $("#hidden1").show();
        $("#hidden2").show();
        Model.table1 = Model.initJqGrid1();
        Model.table2 = Model.initJqGrid2();
        Model.table1.setGridParam({
            postData: searchParam
        });
        Model.table1.trigger("reloadGrid");
        // Model.table1.initJqGrid1();
        Model.table2.setGridParam({
            postData: searchParam
        });
        Model.table2.trigger("reloadGrid");
        // Model.table2.initJqGrid2();
    }


}

Model.dayTotal = function(){
    dayBarShow();
    // $("#grid-table1").GridUnload();
    // $("#grid-table2").GridUnload();
    // Model.search();
}

Model.monthTotal = function(){
    monthBarShow();
    // $("#grid-table3").GridUnload();
    // $("#grid-table4").GridUnload();
    // Model.search();
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

/**
 * 导出excel1
 */
Model.exportExcel1 = function() {
    // alert($("#to").val().trim());
    $.ajax({
        type : 'GET',
        url: '/model/recharge/export1?day=' + $("#day").val().replace(/-/g,"")+'&rid='+$("#rid").val()+'&voiceid='+$("#voiceid").val()+'&from='+$("#from").val().trim()+'&to='+$("#to").val().trim()+'&type='+$("#type").val().trim()+'&emotion='+$("#emotion").val().trim()+'&resulttype='+$("#resulttype").val().trim(),
        success : function(data) {
            if (data.code === 0) {
                window.open("/model/recharge/download1?key="+data.obj);
            }
        }
    });
};

/**
 * 导出excel2
 */
Model.exportExcel2 = function() {
    $.ajax({
        type : 'GET',
        url: '/model/recharge/export2?day=' + $("#day").val().replace(/-/g,"")+'&rid='+$("#rid").val()+'&voiceid='+$("#voiceid").val(),
        success : function(data) {
            if (data.code === 0) {
                window.open("/model/recharge/download2?key="+data.obj);
            }
        }
    });
};

/**
 * 导出excel3
 */
Model.exportExcel3 = function() {
    $.ajax({
        type : 'GET',
        url: '/model/recharge/export3?month=' + $("#month").val().replace(/-/g,"")+'&rid='+$("#rid").val()+'&voiceid='+$("#voiceid").val()+'&from='+$("#from").val().trim()+'&to='+$("#to").val().trim()+'&type='+$("#type").val().trim()+'&emotion='+$("#emotion").val().trim()+'&resulttype='+$("#resulttype").val().trim(),
        success : function(data) {
            if (data.code === 0) {
                window.open("/model/recharge/download3?key="+data.obj);
            }
        }
    });
};

/**
 * 导出excel4
 */
Model.exportExcel4 = function() {
    $.ajax({
        type : 'GET',
        url: '/model/recharge/export4?month=' + $("#month").val().replace(/-/g,"")+'&rid='+$("#rid").val()+'&voiceid='+$("#voiceid").val(),
        success : function(data) {
            if (data.code === 0) {
                window.open("/model/recharge/download4?key="+data.obj);
            }
        }
    });
};

/**
 * 改变规则组  更新规则下拉框
 */
Model.changeCategory = function () {
    //改变工程  更新项目下拉框
    var cid =$("#cid").val();
    $.ajax({
        url: "/model/selectRegulation?cid=" + cid,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            var rids = r.obj;
            var html = '';
            console.log(rids);
            if(rids.length>0){
                for(var i=0;i<rids.length;i++){
                    html+='<option value="'+rids[i].id+'">'+rids[i].tag+'</option>';
                }
            }
            $("#rid").html(html);
            Model.changeRegulation();
        }
    })
};

/**
 * 改变规则  更新语音下拉框
 */
Model.changeRegulation = function () {
    //改变工程  更新项目下拉框
    var rid =$("#rid").val();
    $.ajax({
        url: "/model/selectVoice?rid=" + rid,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            var voiceList = r.obj;
            var html = '<option value="0">不限</option>';
            console.log(voiceList);
            if(voiceList.length>0){
                for(var i=0;i<voiceList.length;i++){
                    html+='<option value="'+voiceList[i].id+'">'+voiceList[i].name+'</option>';
                }
            }
            $("#voiceid").html(html);
        }
    })
};

//初始化日 -日期插件
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
    date = dateFtt("yyyy-MM-dd",today);
    startDate.val(date);
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

$(function() {
    initDayTimePicker();
    initMonthTimePicker();
    dayBarShow();
    var width = $("#tab-1").width();
    Model.width =width;
    Model.changeCategory();
    // Model.table1 = Model.initJqGrid1();
    // Model.table2 = Model.initJqGrid2();
    // Model.table3 = Model.initJqGrid3();
    // Model.table4 = Model.initJqGrid4();
});