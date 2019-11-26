var Staff = {
    tableId: "#grid-table",
    table: null
};

Staff.keyName = {
    name: '名称',
    staffnum: '上线坐席数',
    connectnum: '坐席接听量',
    leadsnum: '坐席成单量',
    leadspercent: '坐席成单率',
    duration: '坐席通话时长',
    freetime: '坐席等待时长',
    worktime: '坐席工作时长',
    avgconnectnum: '坐席人均接通量',
    avgleadsnum: '坐席人均成单量',
    staffavgduration: '坐席人均通话时长',
    avgfreetime: '坐席人均等待时长',
    staffavgworktime: '坐席人均工作时长',
    avgduration: '坐席单通通话时长',
    stateleadspercent:"状态转接转化率",
    emotionleadspercent:"打断库转接转化率"
};
/**
 *  导出字段
 * @type {{keys: Array, names: Array}}
 */
Staff.exportkeyName = {
    keys:[],names:[]
};
/**
 *  index -name 表对应
 * @type {null}
 */
Staff.indexToNames=null;
/**
 *  name -index 表对应
 * @type {null}
 */
Staff.nameToIndex=null;
Staff.setKeyName = function (cols,names) {
    Staff.indexToNames=new Map();
    Staff.nameToIndex=new Map();
    if(!cols||!names){
      return false;
    }
    for(var i=0;i<cols.length;i++){
        Staff.indexToNames.set(cols[i].index,names[i]);
        Staff.nameToIndex.set(names[i],cols[i].index)
    }
    return true;
};
//基准线打开与否
Staff.maxlineOpen={
    day_group:{
        low:false,
        top:false,
        avg:false,
        target:false
    },
    day_staff:{
        low:false,
        top:false,
        avg:false,
        target:false
    },
    month_group:{
        low:false,
        top:false,
        avg:false,
        target:false
    },
    month_staff:{
        low:false,
        top:false,
        avg:false,
        target:false
    },
    month_transfer:{
        low:false,
        top:false,
        avg:false
    }

};
Staff.day = {
    table: null,
    chart: null,
    tableId: "#grid-table1",
    initialized: false,
    currentJqgrid: '',
    exportkeyName:{
        keys:[],names:[]
    },
    chartOptions: {
        title: {
            text: '坐席数据'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            type: 'plain',
            left:"300",
            //单选
            orient:'horizontal',
            selectedMode: 'single',
            data:[]
        },
        grid: {
            left: '1%',
            right: '1%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [
         ],
    },
    jqgridOptions: {
        caption:"日分组",
        autowidth:true,
        multiselect: false,
        rownumbers:true,
        rowNum:5000,
        sortname: "leadspercent",
        sortorder: "desc",
        jsonReader : {
            //返回json的格式匹配
            root: function (data) {
                return data.obj.list
            },
            repeatitems: false,
            id: "id"
        },
        gridComplete: function () {
            var arr = Staff.day.table.getDataIDs();
            if (arr && arr.length > 0) {
                var id = arr[0];
                Staff.day.table.setSelection(id, true);
            } else {
                if (Staff.day.chart) {
                    Staff.day.chart.clear();
                }
            }
        },
        loadComplete: function (r) {
           Dev.print("loadComplete");
            //排序字段r
            var sortField="sort";
            Dev.print(sortField+"------sortfield--------");

            $("#grid-table1").jqGrid('setLabel','rn', '排名', {'text-align':'center','vertical-align':'middle'},'');
            //隐藏字段
            var heads;
            if(r.obj.heads){
                heads = r.obj.heads.heads.split(",");
            }
            var headsMap={};
            for(var i=0;heads&&i<heads.length;i++){
                if(heads[i])
                headsMap[heads[i]]=1;
            }
           Dev.print(heads+"hide");
            var headAll=Staff.day.jqgridOptions.colModel;
            var nameAll=Staff.day.jqgridOptions.colNames;
            //显示所有列
            var keys=[];
            var names=[];
            for(var i=0;i<headAll.length;i++){
                var headIndex=headAll[i].index;
                if(headsMap[headIndex]){
                    $("#grid-table1").setGridParam().hideCol(headIndex);
                }else {
                    keys.push(headIndex);
                    names.push(nameAll[i]);
                    $("#grid-table1").setGridParam().showCol(headIndex);
                }
            }
            $("#grid-table1").setGridParam().hideCol("profit");
            $("#grid-table1").setGridParam().hideCol("sort");
            $("#grid-table1").setGridWidth(Dev.style.freeWidth);
            Staff.day.exportkeyName.keys=keys;
            Staff.day.exportkeyName.names=names;
           Dev.print("导出字段");
           Dev.print(Staff.day.exportkeyName.keys);
           Dev.print(Staff.day.exportkeyName.names);
            $("#grid-table1").trigger("reloadGrid");
            //在表格加载完成后执行
            var ids = $("#grid-table1").jqGrid("getDataIDs");//获取所有行的id
            var rowDatas = $("#grid-table1").jqGrid("getRowData");//获取所有行的数据


            //获取用户绑定坐席组
            // var groups = $("#staffGroupId1 option").map(function(){
            //     return $(this).html();
            // }).get().join(",");
            let groups1=r.obj.group;
            let groups={};
            for(let i=0;groups1&&i<groups1.length;i++){
                groups[groups1[i]+""]=1;
            }
            Dev.print(JSON.stringify(groups)+"--------------------myGroup-------------------------");
            for (var i = 0; i < rowDatas.length; i++) {
                var rowData = rowDatas[i];
                //行-分组样式
                let  g;
                if(Staff.day.currentJqgrid==="staff"){
                   g="group";
                }else {
                    g="name";
                }
                let group=rowData[g];
                Dev.print(group+"--------------------myGroup-------------------------");
                if(groups[group]){
                    $("#" + ids[i]).css("font-size", "15px");
                }
            }


            if(rowDatas.length>2){
                var max=rowDatas.length;
                var first=max*0.3;
                var second=max*0.7;
                Dev.print(ids+"-------------cellids------------------");
                Dev.print(max+"-------------max------------------");
                Dev.print(first+"-------------fisrst------------------");
                Dev.print(second+"-------------second------------------");
                let table="#grid-table1";
                let ele=$(table).children("tbody").children("tr");
                for (var i = 0; i < rowDatas.length; i++) {
                    var rowData = rowDatas[i];
                    var cellOne = rowData[sortField];
                    cellOne=cellOne?parseInt(cellOne):0;
                    Dev.print(cellOne+"----------sort-------------");
                    if (cellOne<=first||cellOne==1) {//如果某一行中的“sortField”为0%~30%，那就把这一整行的背景颜色设为蓝色
                        ele.eq(i+1).css("background-color", "#99ccff");
                        // $("#" + ids[i]).css("background-color", " #99ccff");
                    }else  if (cellOne>first&&cellOne<=second) {//如果某一行中的“sortField”为30%~40%，那就把这一整行的背景颜色设为黄色
                        ele.eq(i+1).css("background-color", "#ffcc66");
                        // $("#" + ids[i]).css("background-color", "#ffcc66");
                    }else  if (cellOne>second) {//如果某一行中的“sortField”为40%~100%，那就把这一整行的背景颜色设为红色
                        ele.eq(i+1).css("background-color", "#ff99ff");
                        // $("#" + ids[i]).css("background-color", "#ff99ff");
                    }
                }

            }

        }
    },
    groupOptions : {
        caption:"当月数据汇总展示",
        url: "/staff_statistics/day/grid",
        colNames: ['坐席组', '上线坐席数','所属企业','组接听量','组成单量', '坐席成单率', '组人均通话时长', '组人均等待时长', '组人均工作时长', '组人均接听量', '组人均成单量', '组单通通话时长','组单通等待时长','状态转接转化率','打断库转接转化率','预估利润率','序号'],
        colModel: [
            {name: 'name', index: 'name', width: 60, sortable: false},
            {name: 'staffnum', index: 'staffnum', width: 30, sortable: true},
            {name: 'company', index: 'company', width: 30, sortable: true},
            {name: 'connectnum', index: 'connectnum', width: 60, sortable: true},
            {name: 'leadsnum', index: 'leadsnum', width: 60, sortable: true},
            {name: 'leadspercent', index: 'leadspercent', width: 60, sortable: true},
            {name: 'staffavgduration', index: 'staffavgduration', width: 90, sortable: true, formatter: function (cellValue, options, rowObject) {
                    return second2hms(rowObject['staffavgduration']);
                }},
            {name: 'avgfreetime', index: 'avgfreetime', width: 60, sortable: true, formatter: function (cellValue, options, rowObject) {
                    return second2hms(rowObject['avgfreetime']);
                }},
            {name: 'staffavgworktime', index: 'staffavgworktime', width: 60, sortable: true, formatter: function (cellValue, options, rowObject) {
                    return second2hms(rowObject['staffavgworktime']);
                }},
            {name: 'avgconnectnum', index: 'avgconnectnum', width: 50, sortable: true},
            {name: 'avgleadsnum', index: 'avgleadsnum', width: 60, sortable: true},
            {name: 'avgduration', index: 'avgduration', width: 60, sortable: true, formatter: function (cellValue, options, rowObject) {
                    return second2hms(rowObject['avgduration']);
                }},
            {name: 'avgCfreetime', index: 'avgCfreetime', width: 60, sortable: true, formatter: function (cellValue, options, rowObject) {
                    return second2hms(rowObject['avgCfreetime']);
                }},
            {name: 'stateleadspercent', index: 'stateleadspercent', width: 60, sortable: true},
            {name: 'emotionleadspercent', index: 'emotionleadspercent', width: 60, sortable: true},
            {name: 'profit', index: 'profit', width: 1, sortable: true, formatter: function (cellValue, options, rowObject) {
                    return "0%";
                }
            },
            {name: 'sort', index: 'sort', width: 20, sortable: false}
        ],
        legend: ['上线坐席数','组接听量','组成单量', '坐席成单率', '组人均通话时长', '组人均等待时长', '组人均工作时长', '组人均接听量', '组人均成单量', '组单通通话时长','组单通等待时长','状态转接转化率','打断库转接转化率'],
    },
    staffOptions : {
        caption:"坐席每日数据统计",
        url: "/staff_statistics/day/grid2",
        colNames: ['坐席','所属分组','工作天数', '坐席接听量', '坐席成单量','坐席成单率', '坐席通话时长', '坐席单通通话时长', '坐席等待时长', '坐席单通等待时长', '坐席工作时长','状态转接转化率','打断库转接转化率','预估利润率','排序'],
        colModel: [
            {name: 'name', index: 'name', width: 60, sortable: false},
            {name: 'group', index: 'group', width: 60, sortable: false},
            {name: 'workDays', index: 'workDays', width: 60, sortable: false},
            {name: 'connectnum', index: 'connectnum', width: 60, sortable: true},
            {name: 'leadsnum', index: 'leadsnum', width: 60, sortable: true},
            {name: 'leadspercent', index: 'leadspercent', width: 60, sortable: true},
            {name: 'duration', index: 'duration', width: 60, sortable: true, formatter: function (cellValue, options, rowObject) {
                    return second2hms(rowObject['duration']);
                }},
            {name: 'avgduration', index: 'avgduration', width: 60, sortable: true, formatter: function (cellValue, options, rowObject) {
                    return second2hms(rowObject['avgduration']);
                }},
            {name: 'freetime', index: 'freetime', width: 60, sortable: true, formatter: function (cellValue, options, rowObject) {
                    return second2hms(rowObject['freetime']);
                }},
            {name: 'avgfreetime', index: 'avgfreetime', width: 60, sortable: true, formatter: function (cellValue, options, rowObject) {
                    return second2hms(rowObject['avgfreetime']);
                }},
            {name: 'worktime', index: 'worktime', width: 60, sortable: true, formatter: function (cellValue, options, rowObject) {
                    return second2hms(rowObject['worktime']);
                }},
            {name: 'stateleadspercent', index: 'stateleadspercent', width: 60, sortable: true},
            {name: 'emotionleadspercent', index: 'emotionleadspercent', width: 60, sortable: true},
            {name: 'profit', index: 'profit', width: 60, sortable: false,hidden:true, formatter: function (cellValue, options, rowObject) {
                    return "0%";
                }},
            {name: 'sort', index: 'sort', width: 20, sortable: false}

        ],
        legend: ['坐席接听量', '坐席成单量','坐席成单率', '坐席通话时长', '坐席单通通话时长', '坐席等待时长', '坐席单通等待时长', '坐席工作时长','状态转接转化率','打断库转接转化率']
    },
    preId:undefined,
    preStatus:0,
    init: function() {
        initDatePicker($("#day1"), "yyyy-mm-dd", DateFormat.format(new Date(), "yyyy-MM-dd"), 0);
        Staff.day.companyChanged();
    },
    clearChart: function() {
        if (Staff.day.chart) {
            Staff.day.chart.clear()
        }
    },
    companyChanged: function () {
        var companyId =$("#companyId1").val();
        $.ajax({
            url: "/common/company/changed/user/type?companyId=" + companyId + "&projectType=",
            type: 'GET',
            dataType: "json",
            success: function (r) {
                var projects = r.obj;
                $("#projectId1").html(buildOptions(projects, false));
                Staff.day.projectChanged();
            }
        })
    },
    projectChanged: function () {
        $.ajax({
            url: "/common/project/changed?pid=" + $("#projectId1").val(),
            type: 'GET',
            dataType: "json",
            success: function (r) {
                var staffGroupArr = r.obj;
                $("#staffGroupId1").html(buildOptions(staffGroupArr, true));
                $("#staffGroupId1").val("");
                if (!Staff.day.initialized) {
                    Staff.day.initGroupGrid();
                    Staff.day.initialized = true;
                }
            }
        });

    },
    groupChanged: function () {
        //切换坐席组时，如果是不限则展示坐席组数据，如果指定某个坐席组则展示坐席数据
       /* var groupId = $("#staffGroupId1").val();
        //如果当前表格是坐席组
        if (this.currentJqgrid === "group") {
            if (!isEmpty(groupId)) {
                this.initStaffGrid();
                //清空图表实例
                Staff.day.chart.clear();
            }
        } else {
            if (isEmpty(groupId)) {
                this.initGroupGrid();
                //清空图表实例
                Staff.day.chart.clear();
            }
        }*/
    },
    initGroupGrid: function() {
        if (this.table !== null) {
            $(this.tableId).GridUnload();
        }
        var postData = {
            pid: $("#projectId1").val(),
            day: $("#day1").val(),
            location:"staff_day_group_",
            type:$("#my_day_group").val()
        };
        Staff.day.jqgridOptions.url = Staff.day.groupOptions.url;
        Staff.day.jqgridOptions.postData = postData;
        Staff.day.jqgridOptions.caption = Staff.day.groupOptions.caption;
        Staff.day.jqgridOptions.colNames = Staff.day.groupOptions.colNames;
        Staff.day.jqgridOptions.colModel = Staff.day.groupOptions.colModel;
        Staff.day.jqgridOptions.onSelectRow = Staff.day.refreshChart;
        Staff.setKeyName(Staff.day.groupOptions.colModel,Staff.day.groupOptions.colNames);
        var jqGrid = new JqGrid(Staff.day.tableId, null, Staff.day.jqgridOptions);
        Staff.day.table = jqGrid.init();
        Staff.day.currentJqgrid = "group";
        Staff.markAt("group");
    },
    initStaffGrid: function() {
        if (this.table !== null) {
            $(this.tableId).GridUnload();
        }
        var postData = {
            pid: $("#projectId1").val(),
            day: $("#day1").val(),
            staffGroupId: $("#staffGroupId1").val(),
            location:"staff_day_staff_",
            type:$("#my_day_staff").val(),
            workedDays:$("#workedDays_day").val()
        };
        Staff.day.jqgridOptions.url = Staff.day.staffOptions.url;
        Staff.day.jqgridOptions.caption = Staff.day.staffOptions.caption;
        Staff.day.jqgridOptions.postData = postData;
        Staff.day.jqgridOptions.colNames = Staff.day.staffOptions.colNames;
        Staff.day.jqgridOptions.colModel = Staff.day.staffOptions.colModel;
        Staff.day.jqgridOptions.onSelectRow = Staff.day.refreshChart;
        Staff.setKeyName(Staff.day.jqgridOptions.colModel,Staff.day.jqgridOptions.colNames);
        var jqGrid = new JqGrid(Staff.day.tableId, null, Staff.day.jqgridOptions);
        Staff.day.table = jqGrid.init();
        Staff.day.currentJqgrid = "staff";
        Staff.markAt("staff");
    },
    refreshChart: function(rowid) {
        let tmpId=rowid;
        Dev.print(tmpId+"----------------[preid]-----"+Staff.day.preId+"-----[prestatus]-------------"+Staff.day.preStatus);
        if(!Staff.day.preStatus&&Staff.day.preId){//初始状态
            rowid=Staff.day.preId;
        }else {
            Staff.day.preId=tmpId;
        }
        Dev.print(tmpId+"----------------[preid]-----"+Staff.day.preId+"-----[prestatus]-------------"+Staff.day.preStatus);
        Staff.day.preStatus++;
        //图位置
        if (Staff.day.chart == null) {
            Staff.day.chart = echarts.init(document.getElementById('dayChart'));
        }
        //获取
        var name = Staff.day.table.getCell(rowid, 1);//图名
        var type =  Staff.day.currentJqgrid === "group" ? 0 : 1;
        let mark=Staff.maxlineOpen[Staff.currentJqgrid+"_"+Staff.day.currentJqgrid];
        let open=mark.low||mark.top||mark.avg;
        $.ajax({
            url: "/staff_statistics/day/chart",
            data: {
                id: rowid,
                day: $("#day1").val(),
                pid: $("#projectId1").val(),
                staffGroupId:$("#staffGroupId1").val(),
                type: type,
                open:open
            },
            type: 'GET',
            dataType: "json",
            success: function (r) {
                var docs = r.obj.list;

                //显示隐藏头
                var heads=[];
                if(r.obj.heads){
                    heads = r.obj.heads.heads.split(",");
                }
                var colmap={};
                for(var i=0;i<heads.length;i++){
                    if(Staff.indexToNames&&Staff.indexToNames.get(heads[i])){
                       Dev.print(Staff.indexToNames.get(heads[i]));
                        colmap[Staff.indexToNames.get(heads[i])]=1;
                    }
                }

                var dayArr = [];
                for (var i = 0; i < docs.length; i++) {
                    var doc = docs[i];
                    dayArr.push(doc.date);
                }
                Staff.day.chartOptions.title.text = name;
                Staff.day.chartOptions.xAxis.data = dayArr;
                var legend;
                if (type === 0) {
                    legend = Staff.day.groupOptions.legend;
                } else {
                    legend = Staff.day.staffOptions.legend;
                }
                var series = [];
               Dev.print("show"+legend);
               Dev.print("hide"+colmap);
                for (var j = 0; j < legend.length; j++) {
                    if(colmap[legend[j]]){
                       Dev.print(legend[j]+"--图不显示--");
                        continue;
                    }
                    var each = {
                        name: legend[j],
                        type:'line',
                        stack: '总量',
                        data:[],
                        markLine: {
                            symbol:"none",
                            lineStyle:{
                                color:"red"
                            },
                            data: [
                            ]
                        }
                    };
                    //当前显示index
                    var key =Staff.nameToIndex.get(legend[j]);//Staff.getKey(legend[j]);
                    Dev.print(key+"key----------");
                    //设置辅助线 对象
                    let mark=Staff.maxlineOpen[Staff.currentJqgrid+"_"+Staff.day.currentJqgrid];
                    let markObj=r.obj.mark;
                    if(markObj&&mark.low){
                        let low=markObj.low;
                        Dev.print(JSON.stringify(low)+"low-------------low");
                        if(low[key]){
                            let dataarr=low[key];
                            //连线 数组
                            let arrs= Staff.points(dayArr,dataarr);
                            Dev.print(arrs+"----------------------------");
                            for(let i=0; arrs&&i<arrs.length ;i++){
                                each.markLine.data.push(arrs[i]);
                            }
                        }
                    }
                    if(markObj&&mark.top){
                        let top=markObj.top;
                        Dev.print(JSON.stringify(top)+"top-------------top");
                        if(top[key]){
                            let dataarr=top[key];
                            //连线 数组
                            let arrs= Staff.points(dayArr,dataarr);
                            Dev.print(arrs+"----------------------------");
                            for(let i=0; arrs&&i<arrs.length ;i++){
                                each.markLine.data.push(arrs[i]);
                            }
                        }
                    }
                    if(markObj&&mark.avg){
                        let avg=markObj.avg;
                        Dev.print(JSON.stringify(avg)+"avg-------------avg");
                        if(avg[key]){
                            let dataarr=avg[key];
                            //连线 数组
                            let arrs= Staff.points(dayArr,dataarr);
                            Dev.print(arrs+"----------------------------");
                            for(let i=0; arrs&&i<arrs.length ;i++){
                                each.markLine.data.push(arrs[i]);
                            }
                        }
                    }
                    if(mark.target){
                        var target=r.obj.target;
                        Dev.print(JSON.stringify(target)+"target-------------target");
                        if(target&&target[key]&&target[key]!==0&&target[key]!==0.0){
                            //坐标数组
                            var start=[target["startDate"], target[key]];
                            var end=[target["endDate"], target[key]];
                            let point= [
                                {
                                    coord: start
                                },
                                {
                                    coord:  end
                                }
                            ];
                            each.markLine.data.push(point);
                        }
                    }
                    var dataArr = [];
                    for (var k = 0; k < docs.length; k++) {
                        if (key === 'leadspercent'|| key==='stateleadspercent'||key==='emotionleadspercent') {
                            dataArr.push(docs[k][key].replace('%', ''));
                        }  else {
                            dataArr.push(docs[k][key]);
                        }

                    }
                    each.data = dataArr;
                    series.push(each);
                }
                Staff.day.chartOptions.legend.data = legend;
                Staff.day.chartOptions.series = series;
                Staff.day.chart.setOption(Staff.day.chartOptions);
            }
        });

    },
    search: function () {
        //如果当前表格是坐席组
        Staff.day.clearChart();
        if (this.currentJqgrid === "group") {
            this.initGroupGrid();
                // this.searchInternal();
        } else {
            this.initStaffGrid();
                // this.searchInternal();
        }

    },
    searchInternal:function() {
        var searchParam = {};
        searchParam.pid = $("#projectId1").val();
        searchParam.day = $("#day1").val();
        searchParam.staffGroupId = $("#staffGroupId1").val();
        if(Staff.day.currentJqgrid==="staff"){
            searchParam.type=$("#my_day_staff").val();
            searchParam.workedDays=$("#workedDays_day").val();
        }else {
            searchParam.type=$("#my_day_group").val();
        }
        Staff.day.table.reload(searchParam);
        Staff.day.preStatus=0;
    },
    export: function () {
        var  nameList=[];
        var  names=Staff.day.exportkeyName.names;
       for(var i=0;i<(names.length-2);i++){//不能直接用pop 或unshift 会重复修改同一个内存栈
           nameList.push(names[i]);
       }
        var keyList=[];
        var keys=Staff.day.exportkeyName.keys;
      for(var i=0;i<(keys.length-2);i++){//不能直接用pop 或unshift 会重复修改同一个内存栈
          keyList.push(keys[i]);
      }
        var data = {};
        data.nameList = nameList;
        data.keyList = keyList;
        data.pid = $("#projectId1").val();
        data.staffGroupId = $("#staffGroupId1").val();
        data.day = $("#day1").val();
        if(Staff.day.currentJqgrid==="staff"){
            data.type= $("#my_day_staff").val();
            data.workedDays=$("#workedDays_day").val();
            data.stafforgroup=1;
        }else {
            data.type= $("#my_day_group").val();
        }
        Staff.export("/staff_statistics/day/export", data, "日表数据.xls");
    },
    showTableHead : function() {
    // $("#create-form").html("");
    $.ajax({
        url: "/staff_statistics/get/head?location=staff_"+Staff.currentJqgrid+"_"+Staff.day.currentJqgrid+"_",
        type: 'POST',
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var list;
                //隐藏的表头
                if(r.obj){
                    list = r.obj.heads.split(",");
                }
                var form = $("#create-form");
                var html = '';
                var colNames=Staff.day.jqgridOptions.colNames;
                var colModels=Staff.day.jqgridOptions.colModel;

                var map=new Map();
                if(list){
                    for(var j=0;j<list.length;j++){
                        map.set(list[j],true);
                    }
                }
                for(var i=0;i<colNames.length;i++){
                    if(map&&map.get(colModels[i].name)){
                        html += '<label class="col-md-6"><input style="width:30px;height:15px"  type="checkbox"   value='+colModels[i].name+'>'+colNames[i]+'</input></label>';
                    }else{
                        html += '<label class="col-md-6"><input style="width:30px;height:15px"  type="checkbox" checked  value='+colModels[i].name+'>'+colNames[i]+'</input></label>';
                    }
                    if((i+1)%3 ===0){
                        html += '<br>';
                    }
                }
                form.html(html);
                $("#createModal").modal();
            }
        }
    });
        $("#headInsert").off("click");
        $("#headInsert").on("click",function () {
            Staff.insertHead("");
        });

}
};

/**
 * 生成坐标连线数组
 */
Staff.points=function(dateArr,dataArr){
    //坐标连线
    if(!dataArr||!dateArr||dateArr.length!==dataArr.length||JSON.stringify(dateArr)=='[]'){
        console.log("数据异常-------------无法生成坐标---------");
        return;
    }
    let arr=[];
    for(let i=0;i<(dateArr.length-1);i++){
        let point= [
            {
                coord: [dateArr[i],dataArr[i]]
            },
            {
                coord:  [dateArr[i+1],dataArr[i+1]]
            }
        ];
        arr.push(point);
    }
    return arr;

};
/**
 *  关闭开启-辅助线 普通图
 */
Staff.markThena=function(where){
    var  preWhere=Staff.currentJqgrid;//外围切换
    var  sufWhere=Staff[preWhere].currentJqgrid;//内围切换
    Staff.maxlineOpen[preWhere+"_"+sufWhere][where]=!Staff.maxlineOpen[preWhere+"_"+sufWhere][where];
    Dev.print(preWhere+"_"+sufWhere+"_"+where+"--辅助线状态");
    Dev.print(JSON.stringify(Staff.maxlineOpen[preWhere+"_"+sufWhere]));
    Staff[preWhere].searchInternal();
};
/**
 *  关闭开启-辅助线 transfer图
 */
Staff.markThenb=function(where){
    var  preWhere=Staff.currentJqgrid;
    var  sufWhere="transfer";
    Staff.maxlineOpen[preWhere+"_"+sufWhere][where]=!Staff.maxlineOpen[preWhere+"_"+sufWhere][where];
    Dev.print(preWhere+"_"+sufWhere+"_"+where+"--辅助线状态");
    Dev.print(JSON.stringify(Staff.maxlineOpen[preWhere+"_"+sufWhere]));
    Staff[preWhere].searchInternal();
};
/**
 *  辅助线选中状态显示
 */
Staff.markAt=function(where){
    //各辅助线 状态值
   var open=Staff.maxlineOpen[Staff.currentJqgrid+"_"+where];
   //拼写后缀
    var suffix="";
    if(Staff.currentJqgrid==="month"){
        if(where==="transfer"){
            suffix="_t";
        }else{
            suffix="_";
        }
    }
    Dev.print(JSON.stringify(open)+"-----辅助线状态");
    Dev.print(Staff.currentJqgrid+"_"+where+"++++辅助线状态"+suffix);
    for (var index in open){
        $("#mark_"+index+suffix).prop("checked",open[index]);
    }
};
Staff.insertHead=function (type) {
    var arr = [];
    var n=0;
    $("#create-form :checkbox").each(function () {
        if (!$(this).is(':checked')) {
            arr.push( $(this).val());
        }else {
             n++;
        }
    });
    if(n === 0){
        info("请最少选择一个表头");
        return;
    }
    var str = arr.join(',');
    $.ajax({
        type: 'POST',
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        url: '/staff_statistics/insertHead?heads=' + str+'&location=staff_'+Staff.currentJqgrid+"_"+Staff[Staff.currentJqgrid].currentJqgrid+"_"+type,
        success : function(data) {
            if (data.code === 0) {
                success("保存成功");
                $("#createModal").modal("hide");
                if(Staff.currentJqgrid==="day"){
                    Staff.day.search();
                }else {
                    Staff.month.search();
                }

            }
        }
    })
};
Staff.currentJqgrid="day";
Staff.currentJqgridClass="group";
Staff.month = {
    table: null,
    tablea: null,
    tableb: null,
    tablec: null,
    chart: null,
    chart1: null,
    exportkeyName:{
        keys:[],names:[]
    },
    tableId: "#grid-table2",
    tableIda: "#grid-table-target",
    tableIdb: "#grid-table-together",
    tableIdc: "#grid-table-transfer",
    initialized: false,
    currentJqgrid: '',
    chartOptions: {
        title: {
            text: '坐席数据'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            type: 'scroll',
            left:300,
            //单选
            selectedMode: 'single',
            data:[]
        },
        grid: {
            left: '1%',
            right: '1%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: []
    },
    chartOptions1: {
        title: {
            text: '转化数据'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            type: 'scroll',
            left:300,
            //单选
            selectedMode: 'single',
            data:[]
        },
        grid: {
            left: '1%',
            right: '1%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: []
    },
    jqgridOptions: {
        autowidth:true,
        multiselect: false,
        rowNum:5000,
        jsonReader : {
            //返回json的格式匹配
            root: function (data) {
                return data.obj.list
            },
            repeatitems: false,
            id: "sort"
        },
        gridComplete: function () {
            var arr = Staff.month.table.getDataIDs();
            if (arr && arr.length > 0) {
                var id = arr[0];
                Staff.month.table.setSelection(id, true);
            } else {
                if (Staff.month.chart) {
                    Staff.month.chart.clear();
                }
            }
        },
        loadComplete: function (r) {

           Dev.print("loadComplete");
            var table=Staff.month.tableId;
            $(table).jqGrid('setLabel','rn', '排名', {'text-align':'center','vertical-align':'middle'},'');
            //排序字段r
            var sortField="sort";
            //隐藏字段
            var heads;
            if(r.obj.heads){
                heads = r.obj.heads.heads.split(",");
            }
            var headsMap={};
            for(var i=0;heads&&i<heads.length;i++){
                if(heads[i])
                    headsMap[heads[i]]=1;
            }
           Dev.print(heads+"hide");
            var headAll=Staff.month.jqgridOptions.colModel;
            var nameAll=Staff.month.jqgridOptions.colNames;
            //显示所有列
            var keys=[];
            var names=[];
            for(var i=0;i<headAll.length;i++){
                var headIndex=headAll[i].index;
                if(headsMap[headIndex]){
                    $(table).setGridParam().hideCol(headIndex);
                }else {
                    keys.push(headIndex);
                    names.push(nameAll[i]);
                    $(table).setGridParam().showCol(headIndex);
                }
            }
            $(table).setGridParam().hideCol("profit");
            $(table).setGridParam().hideCol("sort");
            $(table).setGridWidth(Dev.style.freeWidth);
            Staff.month.exportkeyName.keys=keys;
            Staff.month.exportkeyName.names=names;
           Dev.print("导出字段");
           Dev.print(Staff.month.exportkeyName.keys);
           Dev.print(Staff.month.exportkeyName.names);
            $(table).trigger("reloadGrid");
            //在表格加载完成后执行
            var ids = $(table).jqGrid("getDataIDs");//获取所有行的id
            var rowDatas = $(table).jqGrid("getRowData");//获取所有行的数据


            //获取用户绑定坐席组
            // var groups = $("#staffGroupId1 option").map(function(){
            //     return $(this).html();
            // }).get().join(",");
            // let groups1=r.obj.group;
            // let groups={};
            // for(let i=0;groups1&&i<groups1.length;i++){
            //     groups[groups1[i]+""]=1;
            // }
            // Dev.print(JSON.stringify(groups)+"--------------------myGroup-------------------------");
            // for (var i = 0; i < rowDatas.length; i++) {
            //     var rowData = rowDatas[i];
            //     //行-分组样式
            //     let  g;
            //     if(Staff.month.currentJqgrid==="staffAll"){
            //         g="group";
            //     }else if(Staff.month.currentJqgrid==="groupAll"){
            //         g="name";
            //     }
            //     let group=rowData[g];
            //     Dev.print(group+"--------------------myGroup-------------------------");
            //     if(groups[group]){
            //         $("#" + ids[i]).css("font-size", "15px");
            //     }
            // }



            Dev.print(rowDatas.length+"-------------max------------------");
            if(rowDatas.length>2){
                let max=rowDatas.length;
                let first=max*0.3;
                let second=max*0.7;
                Dev.print(ids+"-------------cellids------------------");
                Dev.print(first+"-------------fisrst------------------");
                Dev.print(second+"-------------second------------------");
                let ele=$(table).children("tbody").children("tr");
                for (var i = 0; i < rowDatas.length; i++) {
                    let rowData = rowDatas[i];
                    let cellOne = rowData[sortField];
                    cellOne=cellOne?parseFloat(cellOne):0;
                    Dev.print(cellOne+"----------sort-------------");
                    if (cellOne<=first||cellOne==1) {//如果某一行中的“sortField”为0%~30%，那就把这一整行的背景颜色设为蓝色
                        Dev.print("blue"+"----------sort-------------");
                        ele.eq(i+1).css("background-color", "#99ccff");
                        // $("#" + ids[i]).css("background-color", " #99ccff");
                    }else  if (cellOne>first&&cellOne<=second) {//如果某一行中的“sortField”为30%~40%，那就把这一整行的背景颜色设为黄色
                        Dev.print("yellow"+"----------sort-------------");
                        ele.eq(i+1).css("background-color", "#ffcc66");
                        // $("#" + ids[i]).css("background-color", "#ffcc66");
                    }else { //if (cellOne>second) {//如果某一行中的“sortField”为40%~100%，那就把这一整行的背景颜色设为红色
                        Dev.print("red"+"----------sort-------------");
                        ele.eq(i+1).css("background-color", "#ff99ff");
                        // $("#" + ids[i]).css("background-color", "#ff99ff");
                    }
                }
                // $("#28").css("font-size","20px")
            }
        }
    },
    jqgridTargetOptions: {
        caption: "目标",
        autowidth:true,
        multiselect: false,
        jsonReader : {
            //返回json的格式匹配
            root: function (data) {
                return data.obj.list
            },
            repeatitems: false,
            id: "leadsnum"
        },
        gridComplete: function (r) {
           Dev.print("gridtarget!");
        },
        loadComplete: function (r) {
           Dev.print("loadtarget!"+JSON.stringify(r.obj));
            $(this.tableIda).jqGrid("setCaption","目标");
        }
    },
    jqgridTogetherOptions: {
        autowidth:true,
        multiselect: false,
        rowNum:5000,
        jsonReader : {
            //返回json的格式匹配
            root: function (data) {
                return data.obj.list
            },
            repeatitems: false,
            id: "leadsnum"
        },
        gridComplete: function () {
            // var arr = Staff.month.tableb.getDataIDs();
            // if (arr && arr.length > 0) {
            //     var id = arr[0];
            //     Staff.month.tableb.setSelection(id, true);
            // } else {
            //     if (Staff.month.chart) {
            //         Staff.month.chart.clear();
            //     }
            // }
        },
        loadComplete: function (r) {
           Dev.print("loadComplete");
            var table=Staff.month.tableIdb;
            //排序字段r
            var sortField="connectnum";

            var heads;
            //隐藏字段
            if(r.obj.heads){
                heads = r.obj.heads.heads.split(",");
            }
           Dev.print(heads+"hide");
            var headAll=Staff.month.jqgridTogetherOptions.colModel;
            //显示所有列
            for(var i=0;i<headAll.length;i++){
                $(table).setGridParam().showCol(headAll[i].index);
            }
            //隐藏表头配置列
            for(var i=0;heads&&i<heads.length;i++){
                $(table).setGridParam().hideCol(heads[i]);
            }
            $(table).setGridParam().hideCol("sort");
            $(table).setGridParam().hideCol("profit");
            $(table).trigger("reloadGrid");
            $(table).setGridWidth(Dev.style.freeWidth);
        }
    },
    jqgridTransferOptions: {
        autowidth:true,
        multiselect: false,
        rowNum:5000,
        jsonReader : {
            //返回json的格式匹配
            root: function (data) {
                return data.obj
            },
            repeatitems: false,
            id: "name"
        },
        gridComplete: function () {
            var arr = Staff.month.tablec.getDataIDs();
            if (arr && arr.length > 0) {
                var id = arr[0];
                Staff.month.tablec.setSelection(id, true);
            } else {
                if (Staff.month.chart1) {
                    Staff.month.chart1.clear();
                }
            }
        },
        loadComplete: function (r) {
        }
    },
    groupOptions : {
        url: "/staff_statistics/month/grid",
        colNames: ['日期', '上线坐席数', '组成单量', '坐席成单率','组人均接通量', '组人均成单量',  '组人均通话时长', '组人均工作时长', '状态转接转化率','打断库转接转化率','预估利润率','序号'],
        colModel: [
            {name: 'date', index: 'date', width: 60, sortable: false},
            {name: 'staffnum', index: 'staffnum', width: 30, sortable: false},
            {name: 'leadsnum', index: 'leadsnum', width: 40, sortable: false},
            {name: 'leadspercent', index: 'leadspercent', width: 60, sortable: false},
            {name: 'avgconnectnum', index: 'avgconnectnum', width: 50, sortable: false},
            {name: 'avgleadsnum', index: 'avgleadsnum', width: 60, sortable: false},
            {name: 'staffavgduration', index: 'staffavgduration', width: 90, sortable: false, formatter: function (cellValue, options, rowObject) {
                    return second2hms(rowObject['staffavgduration']);
                }},
            {name: 'staffavgworktime', index: 'staffavgworktime', width: 60, sortable: false, formatter: function (cellValue, options, rowObject) {
                    return second2hms(rowObject['staffavgworktime']) ;
                }},
            {name: 'stateleadspercent', index: 'stateleadspercent', width: 120, sortable: false},
            {name: 'emotionleadspercent', index: 'emotionleadspercent', width: 120, sortable: false},
            {name: 'profit', index: 'profit', width: 90, sortable: false,hidden:true, formatter: function (cellValue, options, rowObject) {
                    return "0%";
                }},
            {name: 'sort', index: 'sort', width: 10, sortable: false},
        ],
        legend: ['上线坐席数', '组成单量', '坐席成单率','组人均接通量', '组人均成单量',  '组人均通话时长', '组人均工作时长', '状态转接转化率','打断库转接转化率']
    },
    groupTargetOptions : {
        url: "/staff_statistics/month/gridTarget",
        colNames: ['月人均每天接听量', '月成单量目标', '月人均每天成单量', '坐席成单率', '月人均每天通话时长'],
        colModel: [
            {name: 'DayAvgconnectnum', index: 'DayAvgconnectnum', width: 150, sortable: false},
            {name: 'leadsnum', index: 'leadsnum', width: 150, sortable: false},
            {name: 'DayAvgleadsnum', index: 'DayAvgleadsnum', width: 150, sortable: false},
            {name: 'leadspercent', index: 'leadspercent', width: 150, sortable: false},
            {name: 'DayAvgduration', index: 'DayAvgduration', width: 150, sortable: false, formatter: function (cellValue, options, rowObject) {
                    return second2hms(rowObject['DayAvgduration']);
                }}
        ]
    },
    groupTogetherOptions : {
        url: "/staff_statistics/month/grid1",
        colNames: ['坐席组', '平均每天上线坐席', '月人均每天接听量', '坐席接听量', '组总成单量',  '坐席成单率','月人均每天成单量','月人均每天通话时长', '坐席通话时长(人均)','月人均每天工作时长', '坐席工作时长(人均)', '坐席人均接通量', '坐席人均成单量','状态转接转化率','打断库转接转化率','预估利润率'],
        colModel: [
            {name: 'name', index: 'name', width: 80, sortable: false},
            {name: 'daystaffnum', index: 'daystaffnum', width: 100, sortable: false},
            {name: 'dayavgconnectnum', index: 'dayavgconnectnum', width: 100, sortable: false},
            {name: 'connectnum', index: 'connectnum', width: 70, sortable: false},
            {name: 'leadsnum', index: 'leadsnum', width: 90, sortable: false},
            {name: 'leadspercent', index: 'leadspercent', width: 90, sortable: false},
            {name: 'dayavgleadsnum', index: 'dayavgleadsnum', width: 120, sortable: false},
            {name: 'dayavgduration', index: 'dayavgduration', width: 120, sortable: false},
            {name: 'duration', index: 'duration', width: 120, sortable: false, formatter: function (cellValue, options, rowObject) {
                    return second2hms(rowObject['duration']) + "(" + second2hms(rowObject['staffavgduration']) + ")";
                }},
            {name: 'dayavgworktime', index: 'dayavgworktime', width: 140, sortable: false},
            {name: 'worktime', index: 'worktime', width: 120, sortable: false, formatter: function (cellValue, options, rowObject) {
                    return second2hms(rowObject['worktime']) + "(" + second2hms(rowObject['staffavgworktime']) + ")";
                }},
            {name: 'avgconnectnum', index: 'avgconnectnum', width: 100, sortable: false},
            {name: 'avgleadsnum', index: 'avgleadsnum', width: 100, sortable: false},
            {name: 'stateleadspercent', index: 'stateleadspercent', width: 90, sortable: false},
            {name: 'emotionleadspercent', index: 'emotionleadspercent', width: 70, sortable: false},
            {name: 'profit', index: 'profit', width: 1, sortable: false,hidden:true, formatter: function (cellValue, options, rowObject) {
                    return "0%";
                }}
        ],
        legend: ['上线坐席数', '坐席接听量', '坐席成单量', '坐席成单率', '坐席通话时长', '坐席等待时长', '坐席工作时长', '坐席人均接通量', '坐席人均成单量', '坐席人均通话时长', '坐席人均等待时长', '坐席人均工作时长', '坐席单通通话时长']
    },
    groupAllOptions : {
        url: "/staff_statistics/month/grid1",
        colNames: ['坐席组','所属企业', '平均每天上线坐席', '月平均每天接听量','月人均每天接听量','月平均每天成单量', '月人均每天成单量', '组总成单量', '坐席成单率','月人均每天通话时长', '月人均单通通话时长','月人均每天工作时长','月状态转接转化率','打断库转接转化率','预估利润率','排名'],
        colModel: [
            {name: 'name', index: 'name', width: 60, sortable: false},
            {name: 'company', index: 'company', width: 60, sortable: false},
            {name: 'daystaffnum', index: 'daystaffnum', width: 30, sortable: true},
            {name: 'dayconnectnum', index: 'dayconnectnum', width: 50, sortable: true},
            {name: 'dayavgconnectnum', index: 'dayavgconnectnum', width: 40, sortable: true},
            {name: 'dayleadsnum', index: 'dayleadsnum', width: 60, sortable: true},
            {name: 'dayavgleadsnum', index: 'dayavgleadsnum', width: 40, sortable: true},
            // {name: 'connectnum', index: 'connectnum', width: 40, sortable: false},
            {name: 'leadsnum', index: 'leadsnum', width: 60, sortable: true},
            {name: 'leadspercent', index: 'leadspercent', width: 60, sortable: true},
            {name: 'dayavgduration', index: 'dayavgduration', width: 40, sortable: true, formatter: function (cellValue, options, rowObject) {
                    return second2hms(rowObject['dayavgduration']);
                }},
            {name: 'staff_avgduration', index: 'staff_avgduration', width: 90, sortable: true},
            {name: 'dayavgworktime', index: 'dayavgworktime', width: 40, sortable: true, formatter: function (cellValue, options, rowObject) {
                    return second2hms(rowObject['dayavgworktime']);
                }},
            {name: 'stateleadspercent', index: 'stateleadspercent', width: 60, sortable: true},
            {name: 'emotionleadspercent', index: 'emotionleadspercent', width: 60, sortable: true},
            {name: 'profit', index: 'profit', width: 1, sortable: false,hidden:true, formatter: function (cellValue, options, rowObject) {
                    return "0%";
                }},
            {name: 'sort', index: 'sort', width: 1, sortable: false}
        ],
        legend: ['上线坐席数', '坐席接听量', '坐席成单量', '坐席成单率', '坐席通话时长', '坐席等待时长', '坐席工作时长', '坐席人均接通量', '坐席人均成单量', '坐席人均通话时长', '坐席人均等待时长', '坐席人均工作时长', '坐席单通通话时长']
    },
    staffOptions : {
        url: "/staff_statistics/month/grid",
        colNames: ['日期', '坐席接听量', '坐席成单量','坐席成单率', '坐席通话时长','坐席单通通话时长', '坐席等待时长','坐席单通等待时长', '坐席工作时长','状态转接转化率','打断库转接转化率','预估利润率','序号'],
        colModel: [
            {name: 'date', index: 'date', width: 60, sortable: false},
            {name: 'connectnum', index: 'connectnum', width: 60, sortable: false},
            {name: 'leadsnum', index: 'leadsnum', width: 60, sortable: false},
            {name: 'leadspercent', index: 'leadspercent', width: 60, sortable: false},
            {name: 'duration', index: 'duration', width: 60, sortable: false, formatter: function (cellValue, options, rowObject) {
                    return second2hms(rowObject['duration']);
                }},
            {name: 'avgduration', index: 'avgduration', width: 60, sortable: false, formatter: function (cellValue, options, rowObject) {
                    return second2hms(rowObject['avgduration']);
                }},
            {name: 'freetime', index: 'freetime', width: 60, sortable: false, formatter: function (cellValue, options, rowObject) {
                    return second2hms(rowObject['freetime']);
                }},
            {name: 'avgCfreetime', index: 'avgCfreetime', width: 60, sortable: false, formatter: function (cellValue, options, rowObject) {
                    return second2hms(rowObject['avgCfreetime']);
                }},
            {name: 'worktime', index: 'worktime', width: 60, sortable: false, formatter: function (cellValue, options, rowObject) {
                    return second2hms(rowObject['worktime']);
                }},
            {name: 'stateleadspercent', index: 'stateleadspercent', width: 60, sortable: false},
            {name: 'emotionleadspercent', index: 'emotionleadspercent', width: 60, sortable: false},
            {name: 'profit', index: 'profit', width: 1, sortable: false,hidden:true, formatter: function (cellValue, options, rowObject) {
                    return "0%";
                }},
            {name: 'sort', index: 'sort', width: 1, sortable: false},

        ],
        legend: ['坐席接听量', '坐席成单量','坐席成单率', '坐席通话时长','坐席单通通话时长', '坐席等待时长','坐席单通等待时长', '坐席工作时长','状态转接转化率','打断库转接转化率']
    },
    staffTargetOptions : {
        url: "/staff_statistics/month/gridTarget",
        colNames: ['月每天接听量', '月成单量', '月平均每天成单量', '坐席成单率', '平均每日通话时长'],
        colModel: [
            {name: 'Dayconnectnum', index: 'Dayconnectnum', width: 100, sortable: false},
            {name: 'leadsnum', index: 'leadsnum', width: 100, sortable: false},
            {name: 'Dayleadsnum', index: 'Dayleadsnum', width: 100, sortable: false},
            {name: 'leadspercent', index: 'leadspercent', width: 100, sortable: false},
            {name: 'Dayduration', index: 'Dayduration', width: 100, sortable: false, formatter: function (cellValue, options, rowObject) {
                    return second2hms(rowObject['Dayduration']);
                }}
        ]
    },
    staffTogetherOptions : {
        url: "/staff_statistics/month/grid2",
        colNames: [ '已工作天数','所属分组','月平均每天接听量','月总成单量','月平均每天成单量','坐席成单率','月平均每天通话时长','月平均单通通话时长','月平均单通等待时长','月平均每天工作时长', '状态转接转化率','打断库转接转化率','预估利润率'],
        colModel: [
            {name: 'workedDays', index: 'workedDays', width: 70, sortable: false},
            {name: 'name', index: 'name', width: 90, sortable: false},
            {name: 'Dayconnectnum', index: 'Dayconnectnum', width: 110, sortable: false},
            {name: 'leadsnum', index: 'leadsnum', width: 110, sortable: false},
            {name: 'Dayleadsnum', index: 'Dayleadsnum', width: 110, sortable: false},
            {name: 'leadspercent', index: 'leadspercent', width: 110, sortable: false},
            {name: 'Dayduration', index: 'Dayduration', width: 120, sortable: false, formatter: function (cellValue, options, rowObject) {
                    return second2hms(rowObject['Dayduration']);
                }},
            {name: 'Davgduration', index: 'Davgduration', width: 120, sortable: false, formatter: function (cellValue, options, rowObject) {
                    return second2hms(rowObject['Davgduration']);
                }},
            {name: 'Dayavgfreetime', index: 'Dayavgfreetime', width: 120, sortable: false, formatter: function (cellValue, options, rowObject) {
                    return second2hms(rowObject['Dayavgfreetime']);
                }},
            {name: 'Dayworktime', index: 'Dayworktime', width: 130, sortable: false, formatter: function (cellValue, options, rowObject) {
                    return second2hms(rowObject['Dayworktime']);
                }},
            {name: 'stateleadspercent', index: 'stateleadspercent', width: 90, sortable: false},
            {name: 'emotionleadspercent', index: 'emotionleadspercent', width: 70, sortable: false},
            {name: 'profit', index: 'profit', width: 5, sortable: false,hidden:true, formatter: function (cellValue, options, rowObject) {
                    return "0%";
                }
            }

        ],
        legend: ['月平均每天接听量','月总成单量','月平均每天成单量','坐席成单率','月平均每天通话时长','月平均单通通话时长','月平均单通等待时长','月平均每天工作时长', '状态转接转化率','打断库转接转化率']
    },
    staffAllOptions : {
        url: "/staff_statistics/month/grid2",
        colNames: ['坐席', '已工作天数','所属分组','月总接听量','月平均每天接听量','月总成单量','月平均每天成单量','坐席成单率','月平均每天通话时长','月平均单通通话时长','月平均单通等待时长','月平均每天工作时长', '状态转接转化率','打断库转接转化率','预估利润率','排名'],
        colModel: [
            {name: 'staff', index: 'staff', width: 60, sortable: false},
            {name: 'workedDays', index: 'workedDays', width: 60, sortable: true},
            {name: 'name', index: 'name', width: 60, sortable: false},
            {name: 'connectnum', index: 'connectnum', width: 60, sortable: true},
            {name: 'Dayconnectnum', index: 'Dayconnectnum', width: 60, sortable: true},
            {name: 'leadsnum', index: 'leadsnum', width: 60, sortable: true},
            {name: 'Dayleadsnum', index: 'Dayleadsnum', width: 60, sortable: true},
            {name: 'leadspercent', index: 'leadspercent', width: 60, sortable: true},
            {name: 'Dayduration', index: 'Dayduration', width: 60, sortable: true, formatter: function (cellValue, options, rowObject) {
                    return second2hms(rowObject['Dayduration']);
                }},
            {name: 'Davgduration', index: 'Davgduration', width: 60, sortable: true, formatter: function (cellValue, options, rowObject) {
                    return second2hms(rowObject['Davgduration']);
                }},
            {name: 'Dayavgfreetime', index: 'Dayavgfreetime', width: 60, sortable: true, formatter: function (cellValue, options, rowObject) {
                    return second2hms(rowObject['Dayavgfreetime']);
                }},
            {name: 'Dayworktime', index: 'Dayworktime', width: 60, sortable: true, formatter: function (cellValue, options, rowObject) {
                    return second2hms(rowObject['Dayworktime']);
                }},
            {name: 'stateleadspercent', index: 'stateleadspercent', width: 100, sortable: true},
            {name: 'emotionleadspercent', index: 'emotionleadspercent', width: 100, sortable: true},
            {name: 'profit', index: 'profit', width: 1, sortable: false,hidden:true, formatter: function (cellValue, options, rowObject) {
                    return "0%";
                }
            },
            {name: 'sort', index: 'sort', width: 1, sortable: false}

        ],
        legend: ['坐席接听量', '坐席成单量', '坐席成单率', '坐席通话时长', '坐席单通通话时长', '坐席等待时长', '坐席人均等待时长', '坐席工作时长']
    },
    staffTransferOptions : {
        url: "/staff_statistics/month/gridTransfer",
        colNames: ['全状态','起始状态', '情感类型','情感描述', '转接成功数量', '成单数', '成单率'],
        colModel: [
            {name: 'name', index: 'name',hidden:true, width: 60, sortable: false},
            {name: 'from', index: 'from', width: 60, sortable: false},
            {name: 'emotion', index: 'emotion', width: 60, sortable: false},
            {name: 'description', index: 'description', width: 60, sortable: false},
            {name: 'transfernum', index: 'transfernum', width: 60, sortable: false},
            {name: 'leadsnum', index: 'leadsnum', width: 60, sortable: false},
            {name: 'leadspercent', index: 'leadspercent', width: 60, sortable: false}
        ]
    },
    preId:undefined,
    preStatus:0,
    init: function() {
        //初始化日期插件
        initDatePicker($("#month2"), "yyyy-mm", DateFormat.format(new Date(), "yyyy-MM"), 1);
        Staff.month.companyChanged();
    },
    companyChanged: function () {
        var companyId =$("#companyId2").val();
        $.ajax({
            url: "/common/company/changed/user/type?companyId=" + companyId + "&projectType=",
            type: 'GET',
            dataType: "json",
            success: function (r) {
                var projects = r.obj;
                $("#projectId2").html(buildOptions(projects, false));
                Staff.month.projectChanged();
            }
        })
    },
    projectChanged: function () {
        $.ajax({
            url: "/common/project/changed?pid=" + $("#projectId2").val(),
            type: 'GET',
            dataType: "json",
            success: function (r) {
                var staffGroupArr = r.obj;
                $("#staffGroupId2").html(buildOptions(staffGroupArr, true));
                Staff.month.groupChanged();
                if (!Staff.month.initialized) {
                    Staff.month.initGroupAllGrid();
                    Staff.month.initialized = true;
                }
            }
        });

    },
    groupChanged: function () {
        var staffGroupId = $("#staffGroupId2").val();
        if (isEmpty(staffGroupId)) {
            $("#staffId2").html("<option value=''>不限</option>");
        } else {
            $.ajax({
                url: "/common/staffGroup/staff?staffGroupId=" + staffGroupId,
                type: 'GET',
                dataType: "json",
                success: function (r) {
                    var staffArr = r.obj;
                    $("#staffId2").html(buildOptions(staffArr, true));
                }
            });
        }
    },
    initGroupGrid: function() {
        if (Staff.month.table !== null) {
            $(Staff.month.tableId).GridUnload();
        }
        var postData = {
            pid: $("#projectId2").val(),
            month: $("#month2").val(),
            staffGroupId:$("#staffGroupId2").val(),
            location:"staff_month_group_"
        };
        Staff.month.jqgridOptions.url = Staff.month.groupOptions.url;
        Staff.month.jqgridOptions.postData = postData;
        Staff.month.jqgridOptions.colNames = Staff.month.groupOptions.colNames;
        Staff.month.jqgridOptions.colModel = Staff.month.groupOptions.colModel;
        Staff.month.jqgridOptions.onSelectRow = Staff.month.refreshChart;
        Staff.month.jqgridOptions.jsonReader.id="date";
        Staff.month.jqgridOptions.rownumbers=false;
        Staff.setKeyName(Staff.month.groupOptions.colModel,Staff.month.groupOptions.colNames);//完整index 对应表头name 映射
        var jqGrid = new JqGrid(Staff.month.tableId, null, Staff.month.jqgridOptions);
        Staff.month.table = jqGrid.init();
        Staff.month.currentJqgrid = "group";
        Staff.markAt("group");
    },
    initGroupAllGrid: function() {
        if (Staff.month.table !== null) {
            $(Staff.month.tableId).GridUnload();
        }
        if(Staff.month.tablea !==null){
            $(Staff.month.tableIda).GridUnload();
        }
        if(Staff.month.tableb !==null){
            $(Staff.month.tableIdb).GridUnload();
        }
        if(Staff.month.tablec !==null){
            $(Staff.month.tableIdc).GridUnload();
        }
        if(Staff.month.chart){
            Staff.month.chart.clear();
            // Staff.month.chart.dispose();
        }
        if(Staff.month.chart1){
            Staff.month.chart1.clear();
        }
        document.getElementById("staffGroupId2").value="";
        var postData = {
            pid: $("#projectId2").val(),
            month: $("#month2").val(),
            staffGroupId: $("#staffGroupId2").val(),
            location:"staff_month_groupAll_",
            type:$("#my_month_group").val()
        };
        Staff.month.jqgridOptions.url = Staff.month.groupAllOptions.url;
        Staff.month.jqgridOptions.postData = postData;
        Staff.month.jqgridOptions.colNames = Staff.month.groupAllOptions.colNames;
        Staff.month.jqgridOptions.colModel = Staff.month.groupAllOptions.colModel;
        Staff.month.jqgridOptions.rownumbers=true;
        Staff.month.jqgridOptions.sortname="leadspercent";
        Staff.month.jqgridOptions.sortorder="desc";
        Staff.month.jqgridOptions.jsonReader.id="sort";
        Staff.month.jqgridOptions.onSelectRow = null;
        var jqGrid = new JqGrid(Staff.month.tableId, null, Staff.month.jqgridOptions);
        Staff.month.table = jqGrid.init();
        Staff.month.currentJqgrid = "groupAll";
    },
    initGroupTogetherGrid: function() {
        if (Staff.month.tableb !== null) {
            $(Staff.month.tableIdb).GridUnload();
        }
        var postData = {
            pid: $("#projectId2").val(),
            month: $("#month2").val(),
            staffGroupId: $("#staffGroupId2").val(),
            location:"staff_month_group_Together"
        };
        Staff.month.jqgridTogetherOptions.url = Staff.month.groupTogetherOptions.url;
        Staff.month.jqgridTogetherOptions.postData = postData;
        Staff.month.jqgridTogetherOptions.colNames = Staff.month.groupTogetherOptions.colNames;
        Staff.month.jqgridTogetherOptions.colModel = Staff.month.groupTogetherOptions.colModel;
        var jqGridb = new JqGrid(Staff.month.tableIdb, null, Staff.month.jqgridTogetherOptions);
        Staff.month.tableb = jqGridb.init();
    },
    initGroupTargetGrid: function() {
        if (Staff.month.tablea !== null) {
            $(Staff.month.tableIda).GridUnload();
        }
        var postData = {
            pid: $("#projectId2").val(),
            month: $("#month2").val(),
            staffGroupId: $("#staffGroupId2").val()
        };
        Staff.month.jqgridTargetOptions.url = Staff.month.groupTargetOptions.url;
        Staff.month.jqgridTargetOptions.postData = postData;
        Staff.month.jqgridTargetOptions.colNames = Staff.month.groupTargetOptions.colNames;
        Staff.month.jqgridTargetOptions.colModel = Staff.month.groupTargetOptions.colModel;
        var jqGrida = new JqGrid(Staff.month.tableIda, null, Staff.month.jqgridTargetOptions);
        Staff.month.tablea = jqGrida.init();
    },
    initStaffGrid: function() {
        if (Staff.month.table !== null) {
            $(Staff.month.tableId).GridUnload();
        }
        var postData = {
            pid: $("#projectId2").val(),
            month: $("#month2").val(),
            staffGroupId: $("#staffGroupId2").val(),
            staffId: $("#staffId2").val(),
            location:"staff_month_staff_"
        };
        Staff.month.jqgridOptions.url = Staff.month.staffOptions.url;
        Staff.month.jqgridOptions.postData = postData;
        Staff.month.jqgridOptions.colNames = Staff.month.staffOptions.colNames;
        Staff.month.jqgridOptions.colModel = Staff.month.staffOptions.colModel;
        Staff.month.jqgridOptions.rownumbers=false;
        Staff.month.jqgridOptions.jsonReader.id="date";
        Staff.setKeyName(Staff.month.staffOptions.colModel,Staff.month.staffOptions.colNames);//完整index 对应表头name 映射
        Staff.month.jqgridOptions.onSelectRow = Staff.month.refreshChart;
        var jqGrid = new JqGrid(Staff.month.tableId, null, Staff.month.jqgridOptions);
        Staff.month.table = jqGrid.init();
        Staff.month.currentJqgrid = "staff";
        Staff.markAt("staff");
    },
    initStaffTargetGrid: function() {
        if (Staff.month.tablea !== null) {
            $(Staff.month.tableIda).GridUnload();
        }
        var postData = {
            pid: $("#projectId2").val(),
            month: $("#month2").val(),
            staffGroupId: $("#staffGroupId2").val(),
            staffId:$("#staffId2").val()
        };
        Staff.month.jqgridTargetOptions.url = Staff.month.staffTargetOptions.url;
        Staff.month.jqgridTargetOptions.postData = postData;
        Staff.month.jqgridTargetOptions.colNames = Staff.month.staffTargetOptions.colNames;
        Staff.month.jqgridTargetOptions.colModel = Staff.month.staffTargetOptions.colModel;
        var jqGrida = new JqGrid(Staff.month.tableIda, null, Staff.month.jqgridTargetOptions);
        Staff.month.tablea = jqGrida.init();
    },
    initStaffTogetherGrid: function() {
        if (Staff.month.tableb !== null) {
            $(Staff.month.tableIdb).GridUnload();
        }
        var postData = {
            pid: $("#projectId2").val(),
            month: $("#month2").val(),
            staffGroupId: $("#staffGroupId2").val(),
            staffId:$("#staffId2").val(),
            location:"staff_month_staff_Together"
        };
        Staff.month.jqgridTogetherOptions.url = Staff.month.staffTogetherOptions.url;
        Staff.month.jqgridTogetherOptions.postData = postData;
        Staff.month.jqgridTogetherOptions.colNames = Staff.month.staffTogetherOptions.colNames;
        Staff.month.jqgridTogetherOptions.colModel = Staff.month.staffTogetherOptions.colModel;
        var jqGridb = new JqGrid(Staff.month.tableIdb, null, Staff.month.jqgridTogetherOptions);
        Staff.month.tableb = jqGridb.init();
    },
    initStaffTransferGrid: function() {
        if (Staff.month.tablec !== null) {
            $(Staff.month.tableIdc).GridUnload();
        }
        var postData = {
            pid: $("#projectId2").val(),
            month: $("#month2").val().replace(/-/g,""),
            staffGroupId: $("#staffGroupId2").val(),
            staffId: $("#staffId2").val()
        };
        Staff.month.jqgridTransferOptions.url = Staff.month.staffTransferOptions.url;
        Staff.month.jqgridTransferOptions.postData = postData;
        Staff.month.jqgridTransferOptions.colNames = Staff.month.staffTransferOptions.colNames;
        Staff.month.jqgridTransferOptions.colModel = Staff.month.staffTransferOptions.colModel;
        Staff.month.jqgridTransferOptions.onSelectRow = Staff.month.refreshChart1;
        var jqGridc = new JqGrid(Staff.month.tableIdc, null, Staff.month.jqgridTransferOptions);
        Staff.month.tablec = jqGridc.init();
        Staff.markAt("transfer");
    },
    initAllStaffGrid: function() {//坐席综合数据
        if (Staff.month.table !== null) {
            $(Staff.month.tableId).GridUnload();
        }
        if(Staff.month.tablea !==null){
            $(Staff.month.tableIda).GridUnload();
        }
        if(Staff.month.tableb !==null){
            $(Staff.month.tableIdb).GridUnload();
        }
        if(Staff.month.tablec !==null){
            $(Staff.month.tableIdc).GridUnload();
        }
        if(Staff.month.chart){
            Staff.month.chart.clear();
        }
        if(Staff.month.chart1){
            Staff.month.chart1.clear();
        }
        document.getElementById("staffId2").value="";
        var postData = {
            pid: $("#projectId2").val(),
            month: $("#month2").val(),
            staffGroupId: $("#staffGroupId2").val(),
            staffId: $("#staffId2").val(),
            location:"staff_month_staffAll_",
            type:$("#my_month_staff").val(),
            workedDays:$("#workedDays_month").val()
        };
        Staff.month.jqgridOptions.url = Staff.month.staffAllOptions.url;
        Staff.month.jqgridOptions.postData = postData;
        Staff.month.jqgridOptions.colNames = Staff.month.staffAllOptions.colNames;
        Staff.month.jqgridOptions.colModel = Staff.month.staffAllOptions.colModel;
        Staff.month.jqgridOptions.sortname="leadspercent";
        Staff.month.jqgridOptions.sortorder="desc";
        Staff.month.jqgridOptions.rownumbers=true;
        Staff.month.jqgridOptions.jsonReader.id="sort";
        Staff.month.jqgridOptions.onSelectRow =null;
        var jqGrid = new JqGrid(Staff.month.tableId, null, Staff.month.jqgridOptions);
        Staff.month.table = jqGrid.init();
        Staff.month.currentJqgrid = "staffAll";
    },
    refreshChart: function(rowid) {
        if (Staff.month.chart == null) {
            Staff.month.chart = echarts.init(document.getElementById('monthChart'));
        }
        var name;
        var type;
        var  current=Staff.month.currentJqgrid;
        if (current==="group") {//分组详细数据
            type = 1;
            name = $("#staffGroupId2 option:selected").html();
        } else if(current==="staff"){//坐席详细数据
            type = 2;
            name = $("#staffId2 option:selected").html();
        }
        let mark=Staff.maxlineOpen[Staff.currentJqgrid+"_"+Staff.month.currentJqgrid];
        let open=mark.low||mark.top||mark.avg;
        $.ajax({
            url: "/staff_statistics/month/chart",
            data: {
                staffId: $("#staffId2").val(),
                month: $("#month2").val(),
                pid: $("#projectId2").val(),
                staffGroupId:$("#staffGroupId2").val(),
                type: type,
                open:open
            },
            type: 'GET',
            dataType: "json",
            success: function (r) {
                var docs = r.obj.list;
                //显示隐藏头
                var heads=[];
                if(r.obj.heads){
                    heads = r.obj.heads.heads.split(",");
                }
                var colmap={};
                for(var i=0;i<heads.length;i++){
                    if(Staff.indexToNames&&Staff.indexToNames.get(heads[i])){
                        Dev.print(Staff.indexToNames.get(heads[i]));
                        colmap[Staff.indexToNames.get(heads[i])]=1;
                    }
                }
                var dayArr = [];
                for (var i = 0; i < docs.length; i++) {
                    var doc = docs[i];
                    dayArr.push(doc.date);
                }
                Staff.month.chartOptions.title.text = name;
                Staff.month.chartOptions.xAxis.data = dayArr;
                var legend;
                if (type === 2) {
                    legend = Staff.month.staffOptions.legend;
                } else {
                    legend = Staff.month.groupOptions.legend;
                }
                var series = [];
                Dev.print("show"+legend);
                Dev.print("hide"+colmap);
                for (var j = 0; j < legend.length; j++) {
                    if(colmap[legend[j]]){
                        Dev.print(legend[j]+"--图不显示--");
                        continue;
                    }
                    var each = {
                        name: legend[j],
                        type:'line',
                        stack: '总量',
                        data:[],
                        markLine: {
                            symbol:"none",
                            data: [
                                // [
                                //     {
                                //         coord: ["10:00", 0.5]
                                //     },
                                //     {
                                //         coord: ["11:00", 1]
                                //     }
                                //
                                //     ]
                            ]
                        }
                    };
                    //当前显示index
                    var key =Staff.nameToIndex.get(legend[j]);//Staff.getKey(legend[j]);
                    Dev.print(key+"key----------");
                    //设置辅助线 对象
                    let mark=Staff.maxlineOpen[Staff.currentJqgrid+"_"+Staff.month.currentJqgrid];
                    let markObj=r.obj.mark;
                    if(markObj&&mark.low){
                        let low=markObj.low;
                        Dev.print(JSON.stringify(low)+"low-------------low");
                        if(low[key]){
                            let dataarr=low[key];
                            //连线 数组
                            let arrs= Staff.points(dayArr,dataarr);
                            Dev.print(arrs+"----------------------------");
                            for(let i=0; arrs&&i<arrs.length ;i++){
                                each.markLine.data.push(arrs[i]);
                            }
                        }
                    }
                    if(markObj&&mark.top){
                        let top=markObj.top;
                        Dev.print(JSON.stringify(top)+"top-------------top");
                        if(top[key]){
                            let dataarr=top[key];
                            //连线 数组
                            let arrs= Staff.points(dayArr,dataarr);
                            Dev.print(arrs+"----------------------------");
                            for(let i=0; arrs&&i<arrs.length ;i++){
                                each.markLine.data.push(arrs[i]);
                            }
                        }
                    }
                    if(markObj&&mark.avg){
                        let avg=markObj.avg;
                        Dev.print(JSON.stringify(avg)+"avg-------------avg");
                        if(avg[key]){
                            let dataarr=avg[key];
                            //连线 数组
                            let arrs= Staff.points(dayArr,dataarr);
                            Dev.print(arrs+"----------------------------");
                            for(let i=0; arrs&&i<arrs.length ;i++){
                                each.markLine.data.push(arrs[i]);
                            }
                        }
                    }
                    if(mark.target){
                        var target=r.obj.target;
                        Dev.print(JSON.stringify(target)+"target-------------target");
                        if(target&&target[key]&&target[key]!==0&&target[key]!==0.0){
                            //坐标数组
                            var start=[target["startDate"], target[key]];
                            var end=[target["endDate"], target[key]];
                            let point= [
                                {
                                    coord: start
                                },
                                {
                                    coord:  end
                                }
                            ];
                            each.markLine.data.push(point);
                        }
                    }
                    var dataArr = [];
                    for (var k = 0; k < docs.length; k++) {
                        if (key === 'leadspercent'|| key==='stateleadspercent'||key==='emotionleadspercent') {
                            dataArr.push(docs[k][key].replace('%', ''));
                        }  else {
                            dataArr.push(docs[k][key]);
                        }

                    }
                    each.data = dataArr;
                    series.push(each);
                }
                Staff.month.chartOptions.legend.data = legend;
                Staff.month.chartOptions.series = series;
                Staff.month.chart.setOption(Staff.month.chartOptions);
            }
        });

    },
    refreshChart1: function(rowid) {
        let tmpId=rowid;
        Dev.print(tmpId+"----------------[preid]-----"+Staff.month.preId+"-----[prestatus]-------------"+Staff.month.preStatus);
        if(!Staff.month.preStatus&&Staff.month.preId){//初始状态
            rowid=Staff.month.preId;
        }else {
            Staff.month.preId=tmpId;
        }
        Dev.print(tmpId+"----------------[preid]-----"+Staff.month.preId+"-----[prestatus]-------------"+Staff.month.preStatus);
        Staff.month.preStatus++;

        if (Staff.month.chart1 == null) {
            Staff.month.chart1 = echarts.init(document.getElementById('transferChart'));
        }
        let mark=Staff.maxlineOpen[Staff.currentJqgrid+"_transfer"];
        let open=mark.low||mark.top||mark.avg;
        $.ajax({
            url: "/staff_statistics/month/chartTransfer",
            data: {
                pid: $("#projectId2").val(),
                month: $("#month2").val().replace(/-/g,""),
                staffGroupId: $("#staffGroupId2").val(),
                staffId: $("#staffId2").val(),
                name:Staff.month.tablec.getCell(rowid, 0),
                open:open
            },
            type: 'GET',
            dataType: "json",
            success: function (r) {
                var docs = r.obj.list;
                var dayArr = [];
                for (var i = 0; i < docs.length; i++) {
                    var doc = docs[i];
                    dayArr.push(doc.date);
                }
                Staff.month.chartOptions1.title.text = Staff.month.tablec.getCell(rowid, 0);//图名;
                Dev.print(Staff.month.tablec.getCell(rowid, 0)+"-------name");
                Dev.print(dayArr);
                Staff.month.chartOptions1.xAxis.data = dayArr;
                var legend=["成单率"];
                var nameMap={
                    "成单率":"leadspercent"
                };
                var series = [];
                for (var j = 0; j < legend.length; j++) {
                    var each = {
                        name: legend[j],
                        type:'line',
                        stack: '总量',
                        data:[],
                        markLine: {
                            symbol:"none",
                            data: [
                                // [
                                //     {
                                //         coord: ["10:00", 0.5]
                                //     },
                                //     {
                                //         coord: ["11:00", 1]
                                //     }
                                //
                                //     ]
                            ]
                        }
                    };
                    var key = nameMap[legend[j]];
                    //设置辅助线 对象
                    var mark=Staff.maxlineOpen[Staff.currentJqgrid+"_transfer"];
                    let markObj=r.obj.mark;
                    if(markObj&&mark.low){
                        let low=markObj.low;
                        Dev.print(JSON.stringify(low)+"low-------------low");
                        if(low[key]){
                            let dataarr=low[key];
                            //连线 数组
                            let arrs= Staff.points(dayArr,dataarr);
                            Dev.print(arrs+"----------------------------");
                            for(let i=0; arrs&&i<arrs.length ;i++){
                                each.markLine.data.push(arrs[i]);
                            }
                        }
                    }
                    if(markObj&&mark.top){
                        let top=markObj.top;
                        Dev.print(JSON.stringify(top)+"top-------------top");
                        if(top[key]){
                            let dataarr=top[key];
                            //连线 数组
                            let arrs= Staff.points(dayArr,dataarr);
                            Dev.print(arrs+"----------------------------");
                            for(let i=0; arrs&&i<arrs.length ;i++){
                                each.markLine.data.push(arrs[i]);
                            }
                        }
                    }
                    if(markObj&&mark.avg){
                        let avg=markObj.avg;
                        Dev.print(JSON.stringify(avg)+"avg-------------avg");
                        if(avg[key]){
                            let dataarr=avg[key];
                            //连线 数组
                            let arrs= Staff.points(dayArr,dataarr);
                            Dev.print(arrs+"----------------------------");
                            for(let i=0; arrs&&i<arrs.length ;i++){
                                each.markLine.data.push(arrs[i]);
                            }
                        }
                    }
                    var dataArr = [];
                    for (var k = 0; k < docs.length; k++) {
                            dataArr.push(docs[k][key].replace('%', ''));
                    }
                    each.data = dataArr;
                    series.push(each);
                }
                Staff.month.chartOptions1.legend.data = legend;
                Staff.month.chartOptions1.series = series;
                Staff.month.chart1.setOption(Staff.month.chartOptions1);
            }
        });

    },
    search: function () {
        var staffId = $("#staffId2").val();
        var staffGroupId = $("#staffGroupId2").val();
        //如果当前表格是坐席组
       Dev.print(this.currentJqgrid+"维度----===--");
        //清空图表实例
        if(Staff.month.chart)
            Staff.month.chart.clear();
        if (this.currentJqgrid === "group") {//分组分组
            if (!isEmpty(staffGroupId)) {
                this.searchInternal();
            } else {
                Staff.month.showOtherTable("hide");
                this.initGroupAllGrid();
            }
        }else if(this.currentJqgrid==="groupAll"){//分组综合
            if (!isEmpty(staffGroupId)) {
                Staff.month.showOtherTable();
                this.initGroupTargetGrid();
                this.initGroupGrid();
                this.initGroupTogetherGrid();
            } else {
                this.searchInternal();
            }
        }else if(this.currentJqgrid==="staffAll"){//坐席综合
            if (!isEmpty(staffId)) {
                Staff.month.showOtherTable("show");
                this.initStaffTargetGrid();
                this.initStaffGrid();
                this.initStaffTogetherGrid();
                this.initStaffTransferGrid();
            } else {
                this.searchInternal();
            }
        } else if(this.currentJqgrid==="staff"){//坐席坐席
            if (!isEmpty(staffId)) {
                this.searchInternal();
            } else {
                Staff.month.showOtherTable("staffAll");
                this.initAllStaffGrid();
            }
        }

    },
    searchInternal:function() {
        var searchParam = {};
        searchParam.pid = $("#projectId2").val();
        searchParam.month = $("#month2").val();
        searchParam.staffGroupId = $("#staffGroupId2").val();
        searchParam.staffId = $("#staffId2").val();
        if(Staff.month.currentJqgrid==="staffAll"){
            searchParam.type=$("#my_month_staff").val();
            searchParam.workedDays=$("#workedDays_month").val();
        }else if(Staff.month.currentJqgrid==="groupAll"){
            searchParam.type=$("#my_month_group").val();
        }
        var searchParam1 = {};
        searchParam1.pid = $("#projectId2").val();
        searchParam1.month = $("#month2").val().replace(/-/g,"");
        searchParam1.staffGroupId = $("#staffGroupId2").val();
        searchParam1.staffId = $("#staffId2").val();
        Staff.month.table.reload(searchParam);
        if(Staff.month.tablea){
            Staff.month.tablea.reload(searchParam);
         }
         if(Staff.month.tableb){
            Staff.month.tableb.reload(searchParam);
         }
         if(Staff.month.tablec){
            Staff.month.tablec.reload(searchParam1);
        }
        Staff.month.preStatus=0;
    },
    export: function () {
        var  nameList=[];
        var  names=Staff.month.exportkeyName.names;
        for(var i=0;i<(names.length-2);i++){//不能直接用pop 或unshift 会重复修改同一个内存栈
            nameList.push(names[i]);
        }
        var keyList=[];
        var keys=Staff.month.exportkeyName.keys;
        for(var i=0;i<(keys.length-2);i++){//不能直接用pop 或unshift 会重复修改同一个内存栈
            keyList.push(keys[i]);
        }
        var data = {};
        data.grid=Staff.month.currentJqgrid;
        data.nameList = nameList;
        data.keyList = keyList;
        data.pid = $("#projectId2").val();
        data.staffGroupId = $("#staffGroupId2").val();
        data.month = $("#month2").val();
        data.staffId = $("#staffId2").val();
        var fileName="月表数据.xls";
        if(data.grid==="group"){
            fileName="月表分组详细数据.xls";
        }else  if(data.grid==="staff"){
            fileName="月表坐席详细数据.xls";
        }else  if(data.grid==="staffAll"){
            data.type= $("#my_month_staff").val();
            data.workedDays=$("#workedDays_month").val()
            fileName="月表坐席综合数据.xls";
        }else{
            data.type= $("#my_month_group").val();
            fileName="月表分组综合数据.xls";
        }
        Staff.export("/staff_statistics/month/export", data, fileName);
    },
    showTableHead : function(type) {
        $.ajax({
            url: "/staff_statistics/get/head?location=staff_month_"+Staff.month.currentJqgrid+"_"+type,
            type: 'POST',
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (r) {
                if (r.code === 0) {
                    var list;
                    //隐藏的表头
                    if(r.obj){
                        list = r.obj.heads.split(",");
                    }
                    var form = $("#create-form");
                    //html字符串
                    var html = '';
                    var colNames=null;
                    var colModels=null;
                    if(type==="Together"){
                        colNames=Staff.month.jqgridTogetherOptions.colNames;
                        colModels=Staff.month.jqgridTogetherOptions.colModel;
                    }else {
                         colNames=Staff.month.jqgridOptions.colNames;
                         colModels=Staff.month.jqgridOptions.colModel;
                    }

                    var map=new Map();
                    if(list){
                        for(var j=0;j<list.length;j++){
                            map.set(list[j],true);
                        }
                    }
                    for(var i=0;i<colNames.length;i++){
                        if(map&&map.get(colModels[i].name)){
                            html += '<label class="col-md-6"><input style="width:30px;height:15px"  type="checkbox"   value='+colModels[i].name+'>'+colNames[i]+'</input></label>';
                        }else{
                            html += '<label class="col-md-6"><input style="width:30px;height:15px"  type="checkbox" checked  value='+colModels[i].name+'>'+colNames[i]+'</input></label>';
                        }
                        if((i+1)%3 ===0){
                            html += '<br>';
                        }
                    }
                    form.html(html);
                    $("#createModal").modal();
                }
            }
        })
        $("#headInsert").off("click");
        $("#headInsert").on("click",function () {
            Staff.insertHead(type);
        });
    }
};
/**
 * 全选
 */
Staff.checkAll = function () {
    $("#create-form").children().find("input[type=checkbox]").prop("checked",true);
};

/**
 * 全不选
 */
Staff.checkNo = function () {
    $("#create-form").children().find("input[type=checkbox]").prop("checked",false);
};
Staff.compare = {
    table: null,
    chart: null,
    tableId: "#grid-table3",
    initialized: false,
    currentJqgrid: '',
    option: {
        id1: null,
        id2: null,
        type: null,
        start: null,
        end: null,
        name1: null,
        name2: null
    },
    chartOptions: {
        title: {
            text: '坐席数据'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            type: 'scroll',
            left:300,
            data:[]
        },
        grid: {
            left: '3%',
            right: '3%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: []
    },
    jqgridOptions: {
        autowidth:true,
        multiselect: false,
        jsonReader : {
            //返回json的格式匹配
            root: function (data) {
                return data.obj
            },
            repeatitems: false,
            id: "date"
        },
        loadComplete: function (r) {
            Staff.compare.refreshChart(r);
        }
    },
    groupOptions : {
        url: "/staff_statistics/compare/grid",
        colNames: ['名称', '上线坐席数', '坐席接听量', '坐席成单量(率)', '坐席通话时长(人均)', '坐席等待时长(人均)', '坐席工作时长(人均)', '坐席人均接通量', '坐席人均成单量', '坐席单通通话时长'],
        colModel: [
            {name: 'name', index: 'name', width: 60, sortable: false},
            {name: 'staffnum', index: 'staffnum', width: 60, sortable: false},
            {name: 'connectnum', index: 'connectnum', width: 60, sortable: false},
            {name: 'leadsnum', index: 'leadsnum', width: 60, sortable: false, formatter: function (cellValue, options, rowObject) {
                    var leadsnum = rowObject['leadsnum'];
                    var leadspercent = rowObject['leadspercent'];
                    if (leadsnum) {
                        return leadsnum + "(" + leadspercent + ")";
                    } else {
                        return '';
                    }

                }},
            {name: 'duration', index: 'duration', width: 90, sortable: false, formatter: function (cellValue, options, rowObject) {
                    var duration = rowObject['duration'];
                    var staffavgduration = rowObject['staffavgduration'];
                    if (duration) {
                        return second2hms(duration) + "(" + staffavgduration + ")";
                    } else {
                        return '';
                    }
                }},
            {name: 'freetime', index: 'freetime', width: 60, sortable: false, formatter: function (cellValue, options, rowObject) {
                    var freetime = rowObject['freetime'];
                    var avgfreetime = rowObject['avgfreetime'];
                    if (freetime) {
                        return second2hms(freetime) + "(" + avgfreetime + ")";
                    } else {
                        return '';
                    }
                }},
            {name: 'worktime', index: 'worktime', width: 60, sortable: false, formatter: function (cellValue, options, rowObject) {
                    var worktime = rowObject['worktime'];
                    var staffavgworktime = rowObject['staffavgworktime'];
                    if (worktime) {
                        return second2hms(worktime) + "(" + staffavgworktime + ")";
                    } else {
                        return '';
                    }
                }},
            {name: 'avgconnectnum', index: 'avgconnectnum', width: 50, sortable: false},
            {name: 'avgleadsnum', index: 'avgleadsnum', width: 60, sortable: false},
            {name: 'avgduration', index: 'avgduration', width: 60, sortable: false}
        ],
        legend: ['上线坐席数', '坐席接听量', '坐席成单量', '坐席成单率', '坐席通话时长', '坐席等待时长', '坐席工作时长', '坐席人均接通量', '坐席人均成单量', '坐席人均通话时长', '坐席人均等待时长', '坐席人均工作时长', '坐席单通通话时长']
    },
    staffOptions : {
        url: "/staff_statistics/compare/grid",
        colNames: ['名称', '坐席接听量', '坐席成单量(率)', '坐席通话时长(单通时长)', '坐席等待时长(平均)', '坐席工作时长'],
        colModel: [
            {name: 'name', index: 'name', width: 60, sortable: false},
            {name: 'connectnum', index: 'connectnum', width: 60, sortable: false},
            {name: 'leadsnum', index: 'leadsnum', width: 60, sortable: false, formatter: function (cellValue, options, rowObject) {
                    var leadsnum = rowObject['leadsnum'];
                    var leadspercent = rowObject['leadspercent'];
                    if (leadsnum) {
                        return leadsnum + "(" + leadspercent + ")";
                    } else {
                        return '';
                    }
                }},
            {name: 'duration', index: 'duration', width: 90, sortable: false, formatter: function (cellValue, options, rowObject) {
                    var duration = rowObject['duration'];
                    var staffavgduration = rowObject['staffavgduration'];
                    if (duration) {
                        return second2hms(duration) + "(" + staffavgduration + ")";
                    } else {
                        return '';
                    }
                }},
            {name: 'freetime', index: 'freetime', width: 60, sortable: false, formatter: function (cellValue, options, rowObject) {
                    var freetime = rowObject['freetime'];
                    var avgfreetime = rowObject['avgfreetime'];
                    if (freetime) {
                        return second2hms(freetime) + "(" + avgfreetime + ")";
                    } else {
                        return '';
                    }
                }},
            {name: 'worktime', index: 'worktime', width: 60, sortable: false, formatter: function (cellValue, options, rowObject) {
                    var worktime = rowObject['worktime'];
                    var staffavgworktime = rowObject['staffavgworktime'];
                    if (worktime) {
                        return second2hms(worktime) + "(" + staffavgworktime + ")";
                    } else {
                        return '';
                    }
                }},

        ],
        legend: ['坐席接听量', '坐席成单量', '坐席成单率', '坐席通话时长', '坐席单通通话时长', '坐席等待时长', '坐席人均等待时长', '坐席工作时长']
    },
    init: function() {
        //初始化日期插件
        $('#date-range .input-daterange').datepicker({
            keyboardNavigation: false,
            forceParse: false,
            autoclose: true,
            format: 'yyyy-mm-dd'
        });
        Staff.compare.companyChanged1();
        Staff.compare.companyChanged2();
    },
    companyChanged1: function () {
        var companyId = $("#companyId31").val();
        $.ajax({
            url: "/common/company/changed/user/type?companyId=" + companyId + "&projectType=3",
            type: 'GET',
            dataType: "json",
            success: function (r) {
                var projects = r.obj;
                $("#projectId31").html(buildOptions(projects, false));
                Staff.compare.projectChanged1();
            }
        })
    },
    companyChanged2: function () {
        var companyId = $("#companyId32").val();
        $.ajax({
            url: "/common/company/changed/user/type?companyId=" + companyId + "&projectType=3&date=" + new Date(),
            type: 'GET',
            dataType: "json",
            success: function (r) {
                var projects = r.obj;
                $("#projectId32").html(buildOptions(projects, false));
                Staff.compare.projectChanged2();
            }
        })
    },
    projectChanged1: function () {
        $.ajax({
            url: "/common/project/changed?pid=" + $("#projectId31").val(),
            type: 'GET',
            dataType: "json",
            success: function (r) {
                var staffGroupArr = r.obj;
                $("#staffGroupId31").html(buildOptions(staffGroupArr, true));
                Staff.compare.groupChanged1();
            }
        });
    },
    projectChanged2: function () {
        $.ajax({
            url: "/common/project/changed?pid=" + $("#projectId32").val() + "&date=" + new Date(),
            type: 'GET',
            dataType: "json",
            success: function (r) {
                var staffGroupArr = r.obj;
                $("#staffGroupId32").html(buildOptions(staffGroupArr, true));
                Staff.compare.groupChanged2();
            }
        });

    },
    groupChanged1: function () {
        var staffGroupId = $("#staffGroupId31").val();
        if (isEmpty(staffGroupId)) {
            $("#staffId31").html("<option value=''>不限</option>");
        } else {
            $.ajax({
                url: "/common/staffGroup/staff?staffGroupId=" + staffGroupId,
                type: 'GET',
                dataType: "json",
                success: function (r) {
                    var staffArr = r.obj;
                    $("#staffId31").html(buildOptions(staffArr, true));
                }
            });
        }
    },
    groupChanged2: function () {
        var staffGroupId = $("#staffGroupId32").val();
        if (isEmpty(staffGroupId)) {
            $("#staffId32").html("<option value=''>不限</option>");
        } else {
            $.ajax({
                url: "/common/staffGroup/staff?staffGroupId=" + staffGroupId + "&date=" + new Date(),
                type: 'GET',
                dataType: "json",
                success: function (r) {
                    var staffArr = r.obj;
                    $("#staffId32").html(buildOptions(staffArr, true));
                }
            });
        }
    },
    initGroupGrid: function(id1, id2, type, start, end) {
        if (Staff.compare.table !== null) {
            $(Staff.compare.tableId).GridUnload();
        }
        var postData = {
            id1: id1,
            id2: id2,
            type: type,
            start: start,
            end: end
        };
        Staff.compare.jqgridOptions.url = Staff.compare.groupOptions.url;
        Staff.compare.jqgridOptions.postData = postData;
        Staff.compare.jqgridOptions.colNames = Staff.compare.groupOptions.colNames;
        Staff.compare.jqgridOptions.colModel = Staff.compare.groupOptions.colModel;
        var jqGrid = new JqGrid(Staff.compare.tableId, null, Staff.compare.jqgridOptions);
        Staff.compare.table = jqGrid.init();
        Staff.compare.currentJqgrid = "group";
    },
    initStaffGrid: function(id1, id2, type, start, end) {
        if (Staff.compare.table !== null) {
            $(Staff.compare.tableId).GridUnload();
        }
        var postData = {
            id1: id1,
            id2: id2,
            type: type,
            start: start,
            end: end
        };
        Staff.compare.jqgridOptions.url = Staff.compare.staffOptions.url;
        Staff.compare.jqgridOptions.postData = postData;
        Staff.compare.jqgridOptions.colNames = Staff.compare.staffOptions.colNames;
        Staff.compare.jqgridOptions.colModel = Staff.compare.staffOptions.colModel;
        var jqGrid = new JqGrid(Staff.compare.tableId, null, Staff.compare.jqgridOptions);
        Staff.compare.table = jqGrid.init();
        Staff.compare.currentJqgrid = "staff";
    },
    refreshChart: function(r) {
        if (Staff.compare.chart == null) {
            Staff.compare.chart = echarts.init(document.getElementById('compareChart'));
        }
        var type = $("#type").val();
        var docs = r.obj;
        if (!docs[0].staffnum || !docs[1].staffnum) {
            return;
        }
        var nameArr = [];
        for (var i = 0; i < docs.length; i++) {
            var doc = docs[i];
            nameArr.push(doc.name);
        }
        var legend;
        if (type === 2) {
            legend = Staff.compare.staffOptions.legend;
        } else {
            legend = Staff.compare.groupOptions.legend;
        }
        Staff.compare.chartOptions.xAxis.data = legend;
        var series = [];
        for (var j = 0; j < nameArr.length; j++) {
            var each = {
                name: nameArr[j],
                type:'line',
                stack: '总量',
                data:[]
            };
            var dataArr = [];
            for (var k = 0; k < legend.length; k++) {
                var key = Staff.getKey(legend[k]);
                if (key === 'leadspercent') {
                    dataArr.push(docs[j][key].replace('%', ''));
                }  else {
                    dataArr.push(docs[j][key]);
                }
            }
            each.data = dataArr;
            series.push(each);
        }
        Staff.compare.chartOptions.legend.data = nameArr;
        Staff.compare.chartOptions.series = series;
        Staff.compare.chart.setOption(Staff.compare.chartOptions);
    },
    compare: function () {
        //判断日期合法
        var start = $("#day3").find("input[name='start']").val();
        var end = $("#day3").find("input[name='end']").val();
        if (!start || !end || start.substring(5, 7) !== end.substring(5, 7)) {
            toastr.error("日期必须在同一个月内", "error");
            return;
        }

        //检查对比项
        var staffGroupId1 = $("#staffGroupId31").val();
        var staffGroupId2 = $("#staffGroupId32").val();

        //对比项目
        if (isEmpty(staffGroupId1) && isEmpty(staffGroupId2)) {
            compareInternal($("#projectId31").val(), $("#projectId32").val(), 0, start, end);
        } else {
            if (!isEmpty(staffGroupId1) && !isEmpty(staffGroupId2)) {
                var staffId1 = $("#staffId31").val();
                var staffId2 = $("#staffId32").val();
                if (isEmpty(staffId1) && isEmpty(staffId2)) {
                    //对比坐席组
                    compareInternal(staffGroupId1, staffGroupId2, 1, start, end);
                } else if (!isEmpty(staffId1) && !isEmpty(staffId2)) {
                    //对比坐席
                    compareInternal(staffId1, staffId2, 2, start, end);
                } else {
                    //不能完成对比
                    cannotCompare();
                }
            } else {
                //不能完成对比
                cannotCompare();
            }
        }

        function compareInternal(id1, id2, type, start, end) {
            if (Staff.compare.chart) {
                Staff.compare.chart.clear();
            }
            $("#type").val(type);
            if (type === 2) {
                Staff.compare.initStaffGrid(id1, id2, type, start, end);
            } else {
                Staff.compare.initGroupGrid(id1, id2, type, start, end);
            }
        }


        function cannotCompare() {
            toastr.error("不能进行此对比", "error");
        }
    }
};

Staff.getKey = function(name) {
    for (var key in Staff.keyName) {
        if (Staff.keyName[key] === name) {
            return key;
        }
    }
    return "";
};

Staff.export = function(url, data, fileName) {
    // waitMask();
    $.ajax({
        type : 'POST',
        url: url,
        contentType : "application/json" ,
        data : JSON.stringify(data),
        success : function(r) {
            // clearMask();
            if (r.code === 0) {
                window.open("/common/download?key=" + r.obj + "&originalName=" + fileName);
            }
        }
    });
};
//日表搜索栏项显示隐藏
Staff.day.showSearchBar=function(showOrhide){
    if(showOrhide=="hide"){
        //工作天数
        document.getElementById("workedDays_day_").style.display="none";
        //分组
        document.getElementById("groups_day_").style.display="none";
        //我的分组
        document.getElementById("my_day_group_").style.display="inline";
        //我的坐席
        document.getElementById("my_day_staff_").style.display="none";
        document.getElementById("mark_top_1").style.display="none";
        document.getElementById("mark_avg_1").style.display="none";
        document.getElementById("mark_low_1").style.display="none";
    }else {
        //工作天数
        document.getElementById("workedDays_day_").style.display="inline";
        //分组
        document.getElementById("groups_day_").style.display="inline";
        //我的分组
        document.getElementById("my_day_group_").style.display="none";
        //我的坐席
        document.getElementById("my_day_staff_").style.display="inline";

        document.getElementById("mark_top_1").style.display="inline";
        document.getElementById("mark_avg_1").style.display="inline";
        document.getElementById("mark_low_1").style.display="inline";
    }
};
//月表搜索栏项显示隐藏
Staff.month.showSearchBar=function(showOrhide){
    if(showOrhide=="hide"){//分组页
        document.getElementById("workedDays_month_").style.display="none";
        document.getElementById("my_month_group_").style.display="inline";
        document.getElementById("my_month_staff_").style.display="none";
        document.getElementById("searchStaff").style.display="none";
    }else {//坐席页
        document.getElementById("workedDays_month_").style.display="inline";
        document.getElementById("my_month_group_").style.display="none";
        document.getElementById("my_month_staff_").style.display="inline";
        document.getElementById("searchStaff").style.display="inline";
    }
};

Staff.month.showOtherTable=function(showOrhide){
    if(showOrhide=="hide"){//分组默认页
        // document.getElementById("target_").style.display="none";
        document.getElementById("together_head").style.display="none";
        document.getElementById("together_").style.display="none";
        document.getElementById("markline_transfer").style.display="none";
        document.getElementById("markline_2").style.display="none";
        document.getElementById("target_bar").style.display="none";

    }else if(showOrhide=="show"){//坐席详情页
        // document.getElementById("target_").style.display="inline";
        document.getElementById("together_head").style.display="inline";
        document.getElementById("together_").style.display="inline";
        document.getElementById("markline_transfer").style.display="inline";
        document.getElementById("markline_2").style.display="inline";
        document.getElementById("mark_top_2").style.display="inline";
        document.getElementById("mark_avg_2").style.display="inline";
        document.getElementById("mark_low_2").style.display="inline";
        document.getElementById("target_bar").style.display="inline";
    }else if(showOrhide=="staffAll"){//坐席默认页
        // document.getElementById("target_").style.display="inline";
        document.getElementById("markline_transfer").style.display="none";
        document.getElementById("together_head").style.display="none";
        document.getElementById("together_").style.display="none";
        document.getElementById("markline_2").style.display="none";
        document.getElementById("target_bar").style.display="none";
    }else {//分组详情页
        // document.getElementById("target_").style.display="inline";
        document.getElementById("markline_transfer").style.display="none";
        document.getElementById("together_head").style.display="inline";
        document.getElementById("together_").style.display="inline";
        document.getElementById("markline_2").style.display="inline";
        document.getElementById("mark_top_2").style.display="none";
        document.getElementById("mark_avg_2").style.display="none";
        document.getElementById("mark_low_2").style.display="none";
        document.getElementById("target_bar").style.display="inline";
    }
};
//初始化日表panel
Staff.initDayPanel = function(type) {
        Staff.currentJqgrid="day";//表格状态切换

        if(type==="group"){   //如果当前表格是组
            Staff.currentJqgridClass="group";//表格状态切换

                     Staff.day.clearChart();//清空图表实例
                     Staff.day.initGroupGrid();
        Staff.day.showSearchBar("hide");
        }else if(type==="staff"){ //如果当前表格是坐席
            Staff.currentJqgridClass="staff";//表格状态切换

                     Staff.day.clearChart();//清空图表实例
                     Staff.day.initStaffGrid();
            Staff.day.showSearchBar();
        }
    //如果没有初始化过，进行初始化
    if (!Staff.day.initialized) {
        Staff.day.init();
    }
};

//初始化月表panel
Staff.initMonthPanel = function(type) {
    Staff.currentJqgrid="month";//表格状态切换
    //清空图表实例
    if(Staff.month.chart)
        Staff.month.chart.clear();
        if(type==="group"){//切换到分组
            Staff.currentJqgridClass="group";//表格状态切换
                    //清空图表实例
                    // Staff.month.chart.clear();
                    Staff.month.initGroupAllGrid();

            Staff.month.showSearchBar("hide");
            Staff.month.showOtherTable("hide");
        }else if(type==="staff"){//切换到坐席
            Staff.currentJqgridClass="staff";//表格状态切换
                // Staff.month.chart.clear();
                Staff.month.initAllStaffGrid();
            Staff.month.showOtherTable("hide");
            Staff.month.showSearchBar();
        }

    //如果没有初始化过，进行初始化
    if (!Staff.month.initialized) {
        Staff.month.init();
    }
};

//初始化对比panel
Staff.initComparePanel = function() {
    //如果没有初始化过，进行初始化
    if (!Staff.compare.initialized) {
        Staff.compare.init();
    }
};

$(function() {
    Staff.initDayPanel();
    //是否是开发环境
    Dev.main();
    //关闭屏幕输出
    // Dev.status=false;
});