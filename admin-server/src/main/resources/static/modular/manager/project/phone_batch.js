var PhoneBatch = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null,
    domain:"company"
};
var ladda;
var ajaxFlag = false;

/**
 * jqGrid初始化参数
 */
PhoneBatch.initJqGrid = function () {
    var options = {
        url : "/project/phone_batch/grid",
        postData: {
            pid: $("#pid").val(),
            note:$("#note").val()
        },
        rowNum: 10,
        autowidth:true,
        mtype: "GET",
        height: "auto",
        width: "auto",
        page: 1,    //初始页码
        viewrecords : true, //是否要显示总记录数
        rowList: [10,20,30,50,100],
        pager: "#grid-pager",
        datatype: "json",
        jsonReader : {
            //返回json的格式匹配
            root: function (data) {
                return data.obj.rows
            },
            page: function (data) {
                return data.obj.page
            },
            total: function (data) {
                return data.obj.total
            },
            records: function (data) {
                return data.obj.records
            },
            repeatitems: false,
            id: "id"
        },
        colNames: ['mobilenum', 'unicomnum', 'telecomnum', 'mobiledialnum', 'unicomdialnum', 'telecomdialnum','phonecount', 'mobilefailnum', 'unicomfailnum', 'telecomfailnum', 'failnum', '批次名称', '创建时间', '号码总数', '系统呼出量', '被叫接通量(率)',
            '被叫未接量(率)', '分机未接量(率)', '线路问题数据(率)','盲区数据(率)','优先级', '操作'],
        colModel: [
            {name: 'mobilenum', index: 'mobilenum', width: 0, hidden: true, sortable: false},
            {name: 'unicomnum', index: 'unicomnum', width: 0, hidden: true, sortable: false},
            {name: 'telecomnum', index: 'telecomnum', width: 0, hidden: true, sortable: false},
            {name: 'mobiledialnum', index: 'mobiledialnum', width: 0, hidden: true, sortable: false},
            {name: 'unicomdialnum', index: 'unicomdialnum', width: 0, hidden: true, sortable: false},
            {name: 'telecomdialnum', index: 'telecomdialnum', width: 0, hidden: true, sortable: false},
            {name: 'phonecount', index: 'phonecount', width: 0, hidden: true, sortable: false},
            {name: 'mobilefailnum', index: 'mobilefailnum', width: 0, hidden: true, sortable: false},
            {name: 'unicomfailnum', index: 'unicomfailnum', width: 0, hidden: true, sortable: false},
            {name: 'telecomfailnum', index: 'telecomfailnum', width: 0, hidden: true, sortable: false},
            {name: 'failnum', index: 'failnum', width: 0, hidden: true, sortable: false},
            {name: 'note', index: 'projectname', width: 140, sortable: false},
            {name: 'inittime', index: 'inittime', width: 100, sortable: false, formatter: function (cellValue) {
                    return DateFormat.format(new Date(cellValue), "yyyy-MM-dd hh:mm:ss");
                }},
            {name: 'phonecount2', index: 'phonecount2', width: 50, sortable: false, formatter: function (cellValue, options, rowObject) {
                var phonecount = rowObject['phonecount'];
                    var id = rowObject["id"];
                    phonecount = "<a class='jqgrid-popover' data-toggle='popover' data-placement='top' data-html='true' onmousedown='PhoneBatch.togglePopover2(" + id + ", this)'>" + phonecount + "</a>";
                    return phonecount;
                }},
            {name: 'dialOutNum', index: 'dialOutNum', width: 50, sortable: false, formatter: function (cellValue, options, rowObject) {
                    var failNum = parseInt(rowObject['failnum']);
                    var noExtNum = parseInt(rowObject['noextnum']);
                    var successNum = parseInt(rowObject['successnum']);
                    return failNum + noExtNum + successNum;
                }},
            {name: 'answerNum', index: 'answerNum', width: 100, sortable: false, formatter: function (cellValue, options, rowObject) {
                    var failNum = parseInt(rowObject['failnum']);
                    var noExtNum = parseInt(rowObject['noextnum']);
                    var successNum = parseInt(rowObject['successnum']);
                    var answerNum = noExtNum + successNum;
                    var dialOutNum = failNum + noExtNum + successNum;
                    return calc(answerNum, dialOutNum);
                }},
            {name: 'notAnswerNum', index: 'notAnswerNum', width: 100, sortable: false, formatter: function (cellValue, options, rowObject) {
                    var id = rowObject["id"];
                    var failNum = parseInt(rowObject['failnum']);
                    var noExtNum = parseInt(rowObject['noextnum']);
                    var successNum = parseInt(rowObject['successnum']);
                    var dialOutNum = failNum + noExtNum + successNum;
                    var str = calc(failNum, dialOutNum);
                    str = "<a class='jqgrid-popover' data-toggle='popover' data-placement='top' data-html='true' onmousedown='PhoneBatch.togglePopover(" + id + ", this)'>" + str + "</a>";
                    return str;
                }},
            {name: 'extNotAnswerNum', index: 'extNotAnswerNum', width: 100, sortable: false, formatter: function (cellValue, options, rowObject) {
                    var failNum = parseInt(rowObject['failnum']);
                    var noExtNum = parseInt(rowObject['noextnum']);
                    var successNum = parseInt(rowObject['successnum']);
                    var dialOutNum = failNum + noExtNum + successNum;
                    return calc(noExtNum, dialOutNum);
                }},
            {name: 'callerTimeoutNum', index: 'callerTimeoutNum', width: 100, sortable: false, formatter: function (cellValue, options, rowObject) {
                    var failNum = parseInt(rowObject['failnum']);
                    var noExtNum = parseInt(rowObject['noextnum']);
                    var successNum = parseInt(rowObject['successnum']);
                    var callerNum = parseInt(rowObject['callertimeoutnum']);
                    var dialOutNum = failNum + noExtNum + successNum;
                    return calc(callerNum, dialOutNum);
                }},
            {name: 'phoneTimeoutNum', index: 'phoneTimeoutNum', width: 100, sortable: false, formatter: function (cellValue, options, rowObject) {
                    var failNum = parseInt(rowObject['failnum']);
                    var noExtNum = parseInt(rowObject['noextnum']);
                    var successNum = parseInt(rowObject['successnum']);
                    var phoneNum = parseInt(rowObject['phonetimeoutnum']);
                    var dialOutNum = failNum + noExtNum + successNum;
                    return calc(phoneNum, dialOutNum);
                }},
            {name: 'priority', index: 'priority', width: 70, sortable: false, formatter: function (cellValue) {
                    if (cellValue == 0) {
                        return '<span class="label label-inverse">' + cellValue + '(结束)</span>';
                    } else if (cellValue == 1) {
                        return '<span class="label label-warning">' + cellValue + '(暂停)</span>';
                    }else if(cellValue ==101){
                        return '-';
                    }else if(cellValue ==102){
                        return '--';
                    }else {
                        return '<span class="label label-primary">' + cellValue + '(启动)</span>';
                    }
                }},
            {name: 'operations', index: 'operations', width: 180, sortable: false, formatter: function (cellValue, options, rowObject) {
                    var id = rowObject["id"];
                    var filepath = rowObject["filepath"];
                    var priority = rowObject["priority"];
                    var batchname = rowObject["batchname"];
                    var str ="";
                    if(priority <100){
                        str += '<input type="button" class="control-auth btn btn-sm btn-info" data-auth="phone_batch_priority" value="优先级" onclick="PhoneBatch.setPriority(' + id + ')"/>';
                        str += '<input type="button" class="control-auth btn btn-sm btn-primary" data-auth="phone_batch_list"  value="查看" onclick="PhoneBatch.viewPhoneLogs(\'' + id + '\')"/>';
                    }else if(priority ==101){
                        str +='<button class="btn btn-default btn-sm"><i class="fa fa-spinner fa-spin"></i> 上传中...</button>';
                    }else {
                        if(batchname!=undefined){
                            str += '<input type="button" class="btn btn-sm btn-danger"   value="删除" onclick="PhoneBatch.deleteMysqlPhoneBatch(\'' + id + '\')"/>&nbsp;&nbsp;';
                            str +='<span class="label label-danger">导入失败:'+batchname+'</span>';
                        }
                    }
                    //str += '&nbsp;<input type="button" class="btn btn-sm btn-danger" value="结束" onclick="PhoneBatch.endBatch(' + id + ')"/>';
                    if (filepath != undefined) {
                        str += '<input type="button" class="control-auth btn btn-sm btn-success" data-auth="phone_batch_download" value="下载" onclick="PhoneBatch.downloadBatchFile(\'' + filepath + '\')"/>';
                    }
                    return str;
                }}
        ],

        gridComplete: function() {
            refreshPermission(PhoneBatch.domain);
        },
        subGrid : true,
        subGridRowExpanded: function(subgrid_id, row_id) {
            var subgrid_table_id;
            subgrid_table_id = subgrid_id + "_t";
            $("#" + subgrid_id).html(
                "<table id='" + subgrid_table_id
                + "' class='scroll'></table>");
            $("#" + subgrid_table_id).jqGrid({
                url : "/project/phone_batch/callerData?batchId=" + row_id,
                datatype : "json",
                colNames : [ '线路名称', '总呼出量', '被叫接通量(率)', '被叫未接量(率)','移动未接量(率)','联通未接量(率)','电信未接量(率)','分机未接量(率) ','线路问题数据(率)','盲区数据(率)' ],
                colModel : [
                    {name: 'name', index: 'name', width: 150, sortable: false},
                    {name: 'dialOutNum', index: 'dialOutNum', width: 70, sortable: false, formatter: function (cellValue, options, rowObject) {
                            var failNum = parseInt(rowObject['failnum']);
                            var noExtNum = parseInt(rowObject['noextnum']);
                            var successNum = parseInt(rowObject['successnum']);
                            return failNum + noExtNum + successNum;
                        }},
                    {name: 'answerNum', index: 'answerNum', width: 90, sortable: false, formatter: function (cellValue, options, rowObject) {
                            var failNum = parseInt(rowObject['failnum']);
                            var noExtNum = parseInt(rowObject['noextnum']);
                            var successNum = parseInt(rowObject['successnum']);
                            var answerNum = noExtNum + successNum;
                            var dialOutNum = failNum + noExtNum + successNum;
                            return calc(answerNum, dialOutNum);
                        }},
                    {name: 'notAnswerNum', index: 'notAnswerNum', width: 90, sortable: false, formatter: function (cellValue, options, rowObject) {
                            var failNum = parseInt(rowObject['failnum']);
                            var noExtNum = parseInt(rowObject['noextnum']);
                            var successNum = parseInt(rowObject['successnum']);
                            var dialOutNum = failNum + noExtNum + successNum;
                            return calc(failNum, dialOutNum);
                        }},
                    {name: 'mobilefailnum', index: 'mobilefailnum', width: 90, sortable: false, formatter: function (cellValue, options, rowObject) {
                            var mobilenum = parseInt(rowObject['mobilenum']);
                            var mobilefailnum = parseInt(rowObject['mobilefailnum']);
                            return calc(mobilefailnum, mobilenum);
                        }},
                    {name: 'unicomfailnum', index: 'unicomfailnum', width: 90, sortable: false, formatter: function (cellValue, options, rowObject) {
                            var unicomnum = parseInt(rowObject['unicomnum']);
                            var unicomfailnum = parseInt(rowObject['unicomfailnum']);
                            return calc(unicomfailnum, unicomnum);
                        }},
                    {name: 'telecomfailnum', index: 'telecomfailnum', width: 90, sortable: false, formatter: function (cellValue, options, rowObject) {
                            var telecomnum = parseInt(rowObject['telecomnum']);
                            var telecomfailnum = parseInt(rowObject['telecomfailnum']);
                            return calc(telecomfailnum, telecomnum);
                        }},
                    {name: 'extNotAnswerNum', index: 'extNotAnswerNum', width: 90, sortable: false, formatter: function (cellValue, options, rowObject) {
                            var failNum = parseInt(rowObject['failnum']);
                            var noExtNum = parseInt(rowObject['noextnum']);
                            var successNum = parseInt(rowObject['successnum']);
                            var dialOutNum = failNum + noExtNum + successNum;
                            return calc(noExtNum, dialOutNum);
                        }},
                    {name: 'callerTimeoutNum', index: 'callerTimeoutNum', width: 90, sortable: false, formatter: function (cellValue, options, rowObject) {
                            var failNum = parseInt(rowObject['failnum']);
                            var noExtNum = parseInt(rowObject['noextnum']);
                            var successNum = parseInt(rowObject['successnum']);
                            var callerNum = parseInt(rowObject['callertimeoutnum']);
                            var dialOutNum = failNum + noExtNum + successNum;
                            return calc(callerNum, dialOutNum);
                        }},
                    {name: 'phoneTimeoutNum', index: 'phoneTimeoutNum', width: 90, sortable: false, formatter: function (cellValue, options, rowObject) {
                            var failNum = parseInt(rowObject['failnum']);
                            var noExtNum = parseInt(rowObject['noextnum']);
                            var successNum = parseInt(rowObject['successnum']);
                            var phoneNum = parseInt(rowObject['phonetimeoutnum']);
                            var dialOutNum = failNum + noExtNum + successNum;
                            return calc(phoneNum, dialOutNum);
                        }}
                ],
                rowNum : 100,
                height : '100%',
                jsonReader : {
                    //返回json的格式匹配
                    root: function (data) {
                        return data.obj.rows
                    },
                    page: function (data) {
                        return data.obj.page
                    },
                    total: function (data) {
                        return data.obj.total
                    },
                    records: function (data) {
                        return data.obj.records
                    },
                    repeatitems: false,
                    id: "id"
                },
                gridComplete: function () {
                    // $(this).closest('.ui-jqgrid-view').find('div.ui-jqgrid-hdiv').hide();
                }
            });
        }
    };
    options.shrinkToFit = $(PhoneBatch.tableId).parent().width() > function(modelArr) {
        var sum = 0;
        for (var i = 0; i < modelArr.length; i++) {
            var model = modelArr[i];
            if (!model.hidden && model.width) {
                sum += model.width;
            }
        }
        console.log("colModel width sum=" + sum);
        return sum;
    }(options.colModel);
    var tableInstance = $("#grid-table").jqGrid(options);

    return tableInstance;
};

function calc(num1, num2) {
    var percent;
    if (num2 === 0) {
        percent = '0.00%';
    } else {
        percent = ((num1 / num2) * 100).toFixed(2) + '%';
    }
    return num1 + "<span class='red-font'>(" + percent + ")</span>";
}

/**
 * 根据关键词搜索
 */
PhoneBatch.search = function () {
    var searchParam = {};
    searchParam.note = $("#note").val().trim();
    searchParam.pid = $("#pid").val();
    PhoneBatch.table.setGridParam({
        postData: searchParam
    });
    PhoneBatch.table.trigger("reloadGrid");
};

/**
 * 重置搜索
 */
PhoneBatch.resetSearch = function () {
    $("#note").val("");
    PhoneBatch.search();
};

/***
 * 删除mysql导入失败数据
 * @param id
 */
PhoneBatch.deleteMysqlPhoneBatch = function(id){
    warning("确定要删除吗？","",function () {
        $.ajax({
            url:"/project/deleteMysqlPhoneBatch?id="+id,
            type:"GET",
            dataType:"JSON",
            success:function (r) {
                if(r.code===0){
                    success("删除成功");
                    PhoneBatch.resetSearch();
                }
            }
        });
    });
}

/**
 * 设置优先级弹框
 */
PhoneBatch.setPriority = function (id) {
    $("#edit-form").find('input[name="id"]').val(id);
    $("#editModal").modal();
};
//下载话术xls模板
PhoneBatch.downloadFile = function (obj) {
    //从静态服中下载话术的xls模板
    var modelLocalUrl = $("#modelLocalUrl").val();
    window.open(modelLocalUrl+"/home/datawin/upload/excelModel/InputPhoneModel.xls");
}
/**
 * 更新优先级
 */
PhoneBatch.updatePriority = function () {
    var form = $("#edit-form");
    var phoneBatch = getFormJson(form);
    $.ajax({
        url: "/project/phone_batch/priority",
        type: 'POST',
        data: JSON.stringify(phoneBatch),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#editModal").modal("hide");
                PhoneBatch.search();
                form[0].reset();
            }
        }
    })
};

/**
 * 结束批次
 */
PhoneBatch.endBatch = function (batchId) {
    if (confirm("确定结束？")) {
        var param = JSON.stringify({id: batchId, priority: 0})
        $.ajax({
            url: "/project/phone_batch/priority",
            type: 'POST',
            data: param,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (r) {
                if (r.code === 0) {
                    PhoneBatch.search();
                }
            }
        });
    }
};

/**
 * 下载批次原文件
 */
PhoneBatch.downloadBatchFile = function (filepath) {
    var modelLocalUrl = $("#modelLocalUrl").val();
    window.open(modelLocalUrl + filepath);
};

PhoneBatch.viewPhoneLogs = function (batchId) {
    window.location.href = "/project/phone_batch/phone_log/list?pid=" + $("#pid").val() + "&batchId=" + batchId + "&companyId=" + $("#companyId").val();
};

PhoneBatch.showfile = function () {
    $("#xls").siblings("span").eq(0).html($("#xls").val());
}
/**
 *
 * 上传完了，提交
 */
PhoneBatch.submit = function (btn) {
    var duplicateRemovalOld = true;
    var duplicateRemovalNew = false;
    /*if($("#old").is(":checked")){
        duplicateRemovalOld = true;
    }
    if($("#new").is(":checked")){
        duplicateRemovalNew = true;
    }*/
    if(""==$("#importName").val()||null==$("#importName").val()){
        showError("大批次名称不能为空");
        return ;
    }
    if(!duplicateRemovalNew&&!duplicateRemovalOld){
        showError("请选择去重方式");
        return ;
    }


    var l = $(btn).ladda();
    l.ladda('start');
    var formData = new FormData();
    formData.append("file", $("#file")[0].files[0]);
    formData.append("projectId",$("#pid").val());
    formData.append("note",$("#importName").val());
    formData.append("duplicateRemovalOld",duplicateRemovalOld);
    formData.append("duplicateRemovalNew",duplicateRemovalNew);
    //如果正在提交则直接返回，停止执行
    if(ajaxFlag) return;
    ajaxFlag = true;
    $.ajax({
        url: '/project/phone/uploadFile',
        type: 'POST',
        data: formData,
        dataType: "json",
        // cache: false,
        contentType: false,
        processData: false,
        async:true,
        success: function (r) {
            l.ladda('stop');
            if (r.code === 0) {
                PhoneBatch.resetSearch();
            }else{
                info(r.msg);
                PhoneBatch.resetSearch();
            }
            ajaxFlag =false; //在提交成功之后将标志标记为可提交状态
            $("#old").removeAttr("checked");
            $("#new").removeAttr("checked");
        },
        error: function () {
            ajaxFlag =false; //在提交成功之后将标志标记为可提交状态
            alert('服务错误请刷新后重新提交！');

        }
    });
    $("#importModal").modal("hide");
    $("#importName").val("");
    $("#labelForFile").val("");
    success("导入成功");

};

PhoneBatch.togglePopover = function(id, $a) {
    var flag;
    $("#grid-table").find(".jqgrid-popover").each(function () {
        var desc = $(this).attr("aria-describedby");
        if (desc) {
            flag = desc === $($a).attr("aria-describedby");
            $(this).popover("destroy");
            return false;
        }
    });
    if (flag) {
        return;
    }
    var row = PhoneBatch.table.jqGrid('getRowData',id);
    var mobilefailnum = row.mobilefailnum;
    var unicomfailnum = row.unicomfailnum;
    var telecomfailnum = row.telecomfailnum;
    var mobiledialnum = row.mobiledialnum;
    var unicomdialnum = row.unicomdialnum;
    var telecomdialnum = row.telecomdialnum;
    var content = "";
    content += "中国移动：" + calc(mobilefailnum, mobiledialnum) +  "<br>";
    content += "中国联通：" + calc(unicomfailnum, unicomdialnum) +  "<br>";
    content += "中国电信：" + calc(telecomfailnum, telecomdialnum) +  "<br>";
    var index = 0;
    $("#grid-table").find("tr").each(function (i) {
        if ($(this).attr("id") == id) {
            index = i;
            return false;
        }
    });
    if (index <= 2) {
        $($a).attr("data-placement", "bottom");
    }
    $($a).attr("data-content", content);
    $($a).popover('show');
};

PhoneBatch.togglePopover2 = function(id, $a) {
    var flag;
    $("#grid-table").find(".jqgrid-popover").each(function () {
        var desc = $(this).attr("aria-describedby");
        if (desc) {
            flag = desc === $($a).attr("aria-describedby");
            $(this).popover("destroy");
            return false;
        }
    });
    if (flag) {
        return;
    }
    var row = PhoneBatch.table.jqGrid('getRowData',id);
    var mobilenum = row.mobilenum;
    var unicomnum = row.unicomnum;
    var telecomnum = row.telecomnum;
    var phonecount = row.phonecount;
    var content = "";
    content += "中国移动：" + calc(mobilenum, phonecount) +  "<br>";
    content += "中国联通：" + calc(unicomnum, phonecount) +  "<br>";
    content += "中国电信：" + calc(telecomnum, phonecount) +  "<br>";
    var index = 0;
    $("#grid-table").find("tr").each(function (i) {
        if ($(this).attr("id") == id) {
            index = i;
            return false;
        }
    });
    if (index <= 2) {
        $($a).attr("data-placement", "bottom");
    }
    $($a).attr("data-content", content);
    $($a).popover('show');
};

$(function() {
    /*var date = new Date();
    var month = $('#month');
    month.val(DateFormat.format(date, "yyyy-MM"));
    month.datepicker({
        minViewMode: 1,
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        todayHighlight: true,
        format: "yyyy-mm",
        language: "zh-CN"
    });

    var currentDay = date.getDate();
    $("#startDay").val(currentDay);
    $("#endDay").val(currentDay);*/
    PhoneBatch.table = PhoneBatch.initJqGrid();
    // var jqGrid = new JqGrid("#grid-table", "#grid-pager", PhoneBatch.initOptions());
    // PhoneBatch.table = jqGrid.init();
    //导入，打开模态框
    $("#import").on("click", function () {
        $("#file").val("");
        $("#importName").html("");
        $("#importModal").modal();
    });

    $("#file").on("change",function () {
        var path = $("#file").val();
        $("#labelForFile").val(path);
    });


    $("#importHeader").on("click", function () {
        $("#file2").val("");
        $("#importModal2").modal();
    });

    $("#file2").on("change",function () {
        var path = $("#file2").val();
        $("#labelForFile2").val(path);
    });
    /**
     *
     * 上传完了，提交
     */
    PhoneBatch.submit2 = function (btn) {
        var l = $(btn).ladda();
        l.ladda('start');
        var formData = new FormData();
        formData.append("file", $("#file2")[0].files[0]);
        formData.append("projectId",$("#pid").val());
        //如果正在提交则直接返回，停止执行
        if(ajaxFlag) return;
        ajaxFlag = true;
        $.ajax({
            url: '/project/phone/uploadFileHeader',
            type: 'POST',
            data: formData,
            dataType: "json",
            async: true,
            // cache: false,
            contentType: false,
            processData: false,
            async:true,
            success: function (r) {
                l.ladda('stop');
                if (r.code === 0) {
                    PhoneBatch.resetSearch();
                }else{
                    info(r.msg);
                }
                ajaxFlag =false; //在提交成功之后将标志标记为可提交状态
            },
            error: function () {
                ajaxFlag =false; //在提交成功之后将标志标记为可提交状态
                alert('服务错误请刷新后重新提交！');

            }
        });
        $("#importModal2").modal("hide");
        $("#labelForFile2").val("");
        success("导入成功");

    };
});