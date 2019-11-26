var SmsTemplete = {
    tableId: "#grid-table",
    table: null,
    domain: "sms_template"
};

/**
 * jqGrid初始化
 */
SmsTemplete.initJqGrid = function () {
    var tableInstance = $("#grid-table").jqGrid({
        url : "/sms_template/grid",
        postData: {
            projectGroupId: $("#projectGroup").val()
        },
        autowidth:true,
        mtype: "GET",
        height: "auto",
        viewRecords : true, //是否要显示总记录数
        datatype: "json",
        rowNum:30,
        pager:"#grid-pager",
        rowList : [ 10,20,30,50,100],
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
        colNames: [ '','模板名称', '短信模板', '使用状态', '操作'],
        colModel: [
            {name: 'id', index: 'id', width: 30, sortable: false,hidden:true},
            {name: 'name', index: 'name', width: 30, sortable: false},
            {name: 'content', index: 'content', width: 120, sortable: false},
            {name: 'status', index: 'status', width: 15, sortable: false,formatter:function (cellValue) {
                    if(cellValue==0){
                        return '<span class="label label-danger width-30">未使用</span>';
                    }else{
                        return '<span class="label label-primary width-30">正在使用</span>';
                    }
                }},
            {name: 'operation', index: 'operation', width: 30, sortable: false,formatter:function (cellValue,index,rowObject) {
                    var id = rowObject['id'];
                    var str = '<input type="button" class=" btn btn-sm btn-info control-auth" data-auth="smsTemplate_update"  value="编辑" onclick="SmsTemplete.edit('+id+')"/>&nbsp;&nbsp;';
                    str += '<input type="button" class=" btn btn-sm btn-danger control-auth" data-auth="smsTemplate_delete" value="删除" onclick="SmsTemplete.delete('+id+')"/>';;
                    return str;
                }},
        ],
        gridComplete: function () {
            refreshPermission(SmsTemplete.domain);
        },
    });
    return tableInstance;
};
SmsTemplete.create = function(){
    $("#smschannel").val("");
    $("#smschannel").trigger("chosen:updated");
    $("#smschannel").chosen({width:"100%"});
    $("#addModal").modal();
}
//增加
SmsTemplete.insert = function(){
    var params = {};
    params.projectGroupId = $("#projectGroupId").val();
    params.name = $("#name").val();
    params.content = $("#content").val();
    params.channel = $("#smschannel").val();
    if(params.name==""||params.content==""||params.channel==""){
        info("所有项均为必填项");
        return;
    }
    $.ajax({
        url:"/sms_template/insertNoteT",
        data:JSON.stringify(params),
        type:"POST",
        dataType:"JSON",
        contentType:"application/json;charset=utf8",
        success:function (r) {
            if(r.code===0){
                $("#addModal").modal('hide');
                $("#name").val("");
                $("#content").val("");
                success("保存成功");
                reloadGrid();
            }
        }
    });
}
//删除
SmsTemplete.delete = function(id){
    warning("确定删除？","",function () {
        $.ajax({
            url:"/sms_template/delete?id="+id,
            type:"GET",
            dataType:"JSON",
            success:function (r) {
                if(r.code==0){
                    success("删除成功");
                    reloadGrid();
                }else {
                    info(r.msg);
                }
            }
        });
    });
}
//下拉框触发事件
SmsTemplete.selected = function(){
    $("#projectGroup").change(function () {
        reloadGrid();
    });
}
//编辑
var smschannel2Clicked = false;
SmsTemplete.edit = function (id) {
    if (smschannel2Clicked) {
        $("#smschannel2").chosen('destroy');
    }
    $.ajax({
        url:"/sms_template/getOne?id="+id,
        type:"GET",
        dataType:"JSON",
        success:function (r) {
            if(r.code===0){
                var data = r.obj;
                $("#smsTmeplateId").val(data.id);
                $("#projectGroupId2").val(data.project_group_id);
                $("#name2").val(data.name);
                $("#content2").val(data.content);
                var channel = data.channelList;
                var str = "";
                if(channel!=undefined){
                    var channelList = channel.split(",");
                    for(var i=0;i<channelList.length;i++){
                        var selected = channelList[i];
                        str += "<option value='' selected>" + selected + "</option>";
                    }
                }else {
                    str += "<option value='' selected>-未选择渠道-</option>";
                }
                $("#editModal").find("select[name='smschannel2']").html(str);
                var status = data.status;
                if(status==1){
                    $("#ok").hide();
                }else {
                    $("#ok").show();
                }
                $("#smschannel2").chosen({width:"100%"});
                smschannel2Clicked = true;
                $("#editModal").modal();
            }
        }
    });
}
SmsTemplete.update = function () {
    var params = {};
    params.id = $("#smsTmeplateId").val();
    params.name = $("#name2").val();
    params.projectGroupId = $("#projectGroupId2").val();
    params.content = $("#content2").val();
    if(params.name==""||params.content==""){
        info("所有项均为必填项");
        return;
    }
    $.ajax({
        url:"/sms_template/update",
        type:"POST",
        data:JSON.stringify(params),
        dataType:"JSON",
        contentType:"application/json;charset=utf8",
        success:function (r) {
            $("#editModal").modal('hide');
            if(r.code===0){
                success("更新成功");
                reloadGrid()
            }
        }
    });
}
//jqGrid重新加载
function reloadGrid(){
    var param = {};
    param.projectGroupId = $("#projectGroup").val();
    SmsTemplete.table.setGridParam({
        postData:param,
    }).trigger("reloadGrid");
}
$(function() {
    SmsTemplete.selected();
    SmsTemplete.table = SmsTemplete.initJqGrid();
});