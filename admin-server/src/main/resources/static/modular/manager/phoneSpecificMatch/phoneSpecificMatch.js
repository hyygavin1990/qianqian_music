var PhoneSpecificMatch = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null,
    domain: "PhoneSpecificMatch"
};

/**
 * jqGrid初始化参数
 */
PhoneSpecificMatch.initOptions = function () {
    var options = {
        url : "/phoneSpecificMatch/grid",
        autowidth:true,
        colNames: ['id', '名称', '模式','字段','匹配类型','操作'],
        colModel: [
            {name: 'id', index: 'id', width: 90, sortable: false,align:"center"},
            {name: 'name', index: 'name', width: 90, sortable: false,align:"center"},
            {name: 'mode', index: 'mode', width: 90, sortable: false,align:"center", formatter: function (cellValue, options, rowObject) {
                var mode = rowObject["mode"];
                if(mode==0){
                    return "自定义";
                }else if(mode==1){
                    return "前缀";
                }else if(mode==2){
                    return "后缀";
                }else if(mode==3){
                    return "连续递增";
                }else if(mode==4){
                    return "连续递减";
                }
            }},
            {name: 'reg_exp', index: 'reg_exp', width: 90, sortable: false,align:"center"},
            {name: 'operation_type', index: 'operation_type', width: 90, sortable: false,align:"center",formatter: function (cellValue, options, rowObject) {
                    var operation_type = rowObject["operation_type"];
                    if(operation_type==1){
                        return "普通匹配"
                    }else {
                        return "普通匹配";
                    }
                }},
            {name: 'operations', index: 'operations', width: 100, sortable: false, formatter: function (cellValue, options, rowObject) {
                var id = rowObject["id"];
                var str = "";
                str += '<input type="button" class="btn btn-sm btn-danger"  value="删除" onclick="PhoneSpecificMatch.delete(' + id + ')"/>';
                return str;
            }}
        ],
        gridComplete: function () {
            refreshPermission(PhoneSpecificMatch.domain);
        }
    };
    return options;
};

/**
 * 根据关键词搜索
 */
PhoneSpecificMatch.search = function () {
    var searchParam = {};
    if($("#name").val()){
        searchParam.name = $("#name").val().trim();
    }else {
        searchParam.name = $("#name").val();
    }
    searchParam.mode = $("#mode").val();
    PhoneSpecificMatch.table.reload(searchParam);
};


/**
 * 新增弹框
 */
PhoneSpecificMatch.create = function () {
    $("#createModal").modal();

};
PhoneSpecificMatch.changeMode=function(){
   var mode=$("select[name='mode']").val();
    if($("#count")){
        console.log("预删除次数");
        $("#count").remove();
        $("#count_").remove();
    }
   if(mode==0){
       console.log("添加节点");
       $("#pre").html("重复段");
   $("#repeat").append("<span id='count_'>X</span><input id=\"count\" class=\"form-control\" style=\"display:inline;width: 100px\" name=\"count\" value=\"1\"/>");
   }else if(mode==3||mode==4){
       $("#pre").html("位数");
   }else if($("#count")){
       console.log("删除次数");
       $("#count").remove();
       $("#count_").remove();
       $("#pre").html("重复段");
   }

};
/**
 * 保存用户
 */

PhoneSpecificMatch.insert = function () {
    var specificMatch = getFormJson($("#create-form"));
    var mode=specificMatch.mode;
    var field=specificMatch.field;
    var name=specificMatch.name;
    if(!name||!field){
    info("有字段未输入！");
    return;
    }else if(field.length>7){
        info("请输入小于7位数字！");
        return;
    }else if(!check.checkNumberv2(field)){
        return;
    }
    var regExp="";
    if(mode==0){//自定义
        var  count=$("#count").val();
        if(count){
            if(!check.checkNumberv2(count)){
                return;
            }else if(parseInt(count)*field.length>11){
                info("请输入正确重复次数！");
                return;
            }else if(count==0){
                info("请勿输入0！");
                return;
            }
        }else {
            info("请输入重复次数！");
            return;
        }
        var arr=field.split("");
        var fieldMap=new Map();
        var rexStr="^\\d*";
        var n=1;//字符计数
        console.log(arr);
        var rex="";
        if(count==1){//类 aa...bb...型/aaa...b...型、
            console.log("count="+1);
            for(var i=0;i<arr.length;i++){
                if(!fieldMap.get(arr[i])){
                    if(arr[i-1]&&arr[i-1]!==arr[i]){
                    rexStr=rexStr+"(?!\\"+fieldMap.get(arr[i-1])+")";
                    }
                    fieldMap.set(arr[i],n++);
                    rexStr =rexStr+"(\\d)";
                }else {
                    rexStr =rexStr+"\\"+fieldMap.get(arr[i]);
                }
            }
        }else { //类abab/abc...abc...型/aaa...型
            console.log("count>"+1);
            for(var i=0;i<arr.length;i++){
                if(!fieldMap.get(arr[i])){
                    if(arr[i-1]&&arr[i-1]!==arr[i]){
                        rexStr=rexStr+"(?!\\"+fieldMap.get(arr[i-1])+")";
                    }
                    fieldMap.set(arr[i],n++);
                    rexStr =rexStr+"(\\d)";
                    rex=rex+"\\"+fieldMap.get(arr[i]);
                }else {
                    rexStr =rexStr+"\\"+fieldMap.get(arr[i]);
                    rex=rex+"\\"+fieldMap.get(arr[i]);
                }
            }
        }
        console.log(fieldMap);
        regExp=rexStr+rex+"\\d*$";
        console.log("正则自定义");
        console.log(regExp);
        specificMatch.operationType=true;
    }else if(mode==3||mode==4){
        specificMatch.num=parseInt(field);
        specificMatch.operationType=false;
    }else {//前缀
        if(mode==1){
            regExp=""+field+"";
        }else if(mode==2){//后缀
            regExp="\\d*"+field+"$";
        }
        specificMatch.operationType=true;
        console.log("前缀后缀");
        console.log(regExp);
    }
    specificMatch.regExp=regExp;
    $.ajax({
        url: "/phoneSpecificMatch/insert",
        type: 'POST',
        data: JSON.stringify(specificMatch),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#createModal").modal("hide");
                success("保存成功");
                PhoneSpecificMatch.search();
                $("#create-form")[0].reset();
            }
        }
    })
};


PhoneSpecificMatch.delete = function del(id) {
    warning("确定删除吗", "", function () {
        $.get("/phoneSpecificMatch/delete?id=" + id, function () {
            success("成功删除");
            PhoneSpecificMatch.search();
        });
    })
};

/**
 * 重置搜索
 */
PhoneSpecificMatch.resetSearch = function () {
    $("#name").val("");
    document.getElementById("mode").value="";
    PhoneSpecificMatch.search();
};


$(function() {
    var jqGrid = new JqGrid("#grid-table", "#grid-pager", PhoneSpecificMatch.initOptions());
    PhoneSpecificMatch.table = jqGrid.init();
});