var Label = {
    tableId: "#grid-table",
    pagerId: null,
    selectId: null, //grid选择的条目id
    table: null,
    domain: "label_manager"
};


/**
 * jqGrid初始化参数
 */
Label.initOptions = function () {
    var options = {
        url : "/label_manager/grid",
        autowidth:true,
        multiselect: true,
        height: 700,
        // shrinkToFit: true,
        //不分页
        rowNum: -1,
        colNames : ['名称','英文名','填写形式','填写内容','备注说明'],
        colModel: [
            {name:'name',index:'name', width:200, editable: false,sortable:false},
            {name:'englishName',index:'englishName', width:150, editable: false,sortable:false},
            {name:'type',index:'type', width:150, editable: false,sortable:false,formatter:function (cellvar,options,rowObject) {
                var  type =  rowObject['type'];
                var types= []; //定义一数组
                types=type.split(","); //字符分割
                var   returnvalue = "";
                for (i=0;i<types.length ;i++ )
                {
                    if(i==0){
                        returnvalue = changToValue(types[i]);
                    }else{
                        returnvalue +="+"+changToValue(types[i]);
                    }
                }
                return returnvalue;
            } },
            {name:'content',index:'content', width:250, editable: true,sortable:false},
            {name:'memo',index:'memo', width:200, editable: false,sortable:false}
        ],
        jsonReader: {
            root: function (data) {
                return data.obj;
            },
            id: "id"
        },
        gridComplete: function () {
            refreshPermission(Label.domain);
        }
    };
    return options;
};


/**
 * 新增弹框
 */
Label.create = function () {
    $("input[name='type']").each(function () {
        $(this).attr("checked", false);
    });
    $("#createModal").modal();
};

/**
 * 根据关键词搜索
 */
Label.search = function () {
    var searchParam = {};
    searchParam.name = $("#labelName").val().trim();
    searchParam.englishName= $("#englishName").val().trim();

    Label.table.reload(searchParam);
};

/**
 * 重置搜索
 */
Label.resetSearch = function () {
    $("#labelName").val("");
    $("#englishName").val("");
    Label.search();
};


Label.check = function () {
    var ids = this.table.getSelectedRowIds();
    if (ids === undefined || ids.length === 0) {
        toastr.warning("必须先选择记录再操作");
        // info("必须先选择记录再操作");
        return false;
    } else {
        this.selectId = ids[0];
        return true;
    }
};

/**
 * 保存标签
 */
Label.insert = function () {
    var label = getFormJson($("#create-form"));
    if (Label.validate(label)) {
        if(label.type.length!=1){
            label.type = label.type.join(',');
        }
        $.ajax({
            url: "/label_manager/insert",
            type: 'POST',
            data: JSON.stringify(label),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (r) {
                if (r.code === 0) {
                    $("#createModal").modal("hide");
                    success("保存成功");
                    Label.search();
                    $("#create-form")[0].reset();
                }else if(r.code === 2) {
                }
            }
        })
    }
};


Label.edit = function () {
    if (this.check()) {
        $.ajax({
            url: "/label_manager/get?id=" + this.selectId,
            type: 'GET',
            dataType: "json",
            success: function (r) {
                if (r.code === 0) {
                    var label = r.obj;
                    var form = $("#edit-form");
                    $("#id").val(label.id);
                    form.find("input[name='name']").val(label.name);
                    form.find("input[name='englishName']").val(label.englishName);
                    form.find("input[name='content']").val(label.content);
                    form.find("input[name='memo']").val(label.memo);
                    $("input[name='type']").each(function () {
                        $(this).attr("checked", false);
                    });
                    var  types = label.type;
                    for(i=0;i<types.length;i++){
                        $("input[name='type']").each(function () {
                            if($(this).val() == types[i]){
                                $(this).attr("checked",'checked');
                            }
                        })
                    }

                    // form.find("input[name='content']").val(label.content);
                    $("#editModal").modal();
                }
            }
        })
    }
};


/**
 * 更新标签
 */
Label.update = function () {
    var label = getFormJson($("#edit-form"));
    if (Label.validate(label)) {
        if(label.type.length!=1) {
            label.type = label.type.join(',');
        }
        $.ajax({
            url: "/label_manager/update",
            type: 'POST',
            data: JSON.stringify(label),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (r) {
                if (r.code === 0) {
                    $("#editModal").modal("hide");
                    $("#edit-form")[0].reset();
                    Label.search();
                    success("保存成功");
                }
            }
        })
    }
};

Label.validate = function(label) {
    if (isEmpty(label.name)) {
        toastr.error("必须填写标签名", "error");
        return false;
    }
    if (isEmpty(label.englishName)) {
        toastr.error("必须填写英文名", "error");
        return false;
    }
    //组合框
    if (label.type instanceof Array) {
        if (label.type.length === 2) {
            var first = label.type[0];
            var second = label.type[1];
            //单选+文本 or 复选+文本
            if ((first == 0 && second == 2) || (first == 1 && second == 2)) {
                var content = label.content;
                if (isEmpty(content)) {
                    toastr.error("填写内容错误", "error");
                    return false;
                }
                var contentArr = content.split(";");
                if (contentArr.length > 2) {
                    toastr.error("填写内容错误", "error");
                    return false;
                }
            } else {
                toastr.error("不支持此组合", "error");
                return false;
            }

        } else {
            toastr.error("不支持此组合", "error");
            return false;
        }
    } else {
        if (label.type == 0 || label.type == 1) {
            if (isEmpty(label.content)) {
                toastr.error("单选框和复选框必须有填写内容", "error");
                return false;
            }
        } else if (label.type == 3) {
            if (label.content !== "datetime-local" || label.content !== "date") {
                toastr.error("日期选择框必须匹配date或者datetime-local", "error");
                return false;
            }
        } 
    }
    return true;
};

/**
 * 删除标签
 *
 * @param id
 */
Label.delete = function del() {
        if (this.check()) {
            var id = this.selectId;
            warning("确定删除吗", "", function () {
                $.get("/label_manager/delete?id=" + id, function () {
                    success("成功删除");
                    Label.search();
                });
            })
        }
};

function changToValue(str) {
    //0单选框  1复选框  2 文本框 3 日期选择 4 二级联动下拉框
    if(str ==0 ){
        return "单选框";
    }
    if(str ==1 ){
        return "复选框";
    }
    if(str ==2 ){
        return "文本框";
    }
    if(str ==3 ){
        return "日期选择";
    }
    if(str ==4 ){
        return "二级联动下拉框";
    }
}


$(function() {
    var jqGrid = new JqGrid(Label.tableId, Label.pagerId, Label.initOptions());
    Label.table = jqGrid.init();
});