/**
 * 角色管理的单例
 */
var CmpMenu = {
    id: "menuTable",	//表格id
    table: null,
    domain: "cmp_menu"
};

/**
 * 初始化表格的列
 */
CmpMenu.initColumn = function () {
    var columns = [
        {title: 'id', field: 'id', visible: false, align: 'center', valign: 'middle',width:'50px'},
        {title: '菜单名称', field: 'name', align: 'center', valign: 'middle', sortable: true,width:'17%'},
        {title: '菜单编号', field: 'code', align: 'center', valign: 'middle', sortable: true,width:'12%'},
        {title: '菜单父编号', field: 'pcode', align: 'center', valign: 'middle', sortable: true},
        {title: '请求地址', field: 'url', align: 'center', valign: 'middle', sortable: true,width:'15%'},
        {title: '排序', field: 'sequence', align: 'center', valign: 'middle', sortable: true},
        {title: '是否是菜单', field: 'type', align: 'center', valign: 'middle', sortable: true, formatter: function(cellValue) {
            if (cellValue == '0') {
                return "不是";
            } else {
                return "是";
            }
        }},
        {title: '状态', field: 'enabled', align: 'center', valign: 'middle', sortable: true,  formatter: function(cellValue) {
            return cellValue ? "启用" : "禁用";
        }},
        {title: '操作', field: 'operation', align: 'center', valign: 'middle', sortable: true,  formatter: function(cellValue, rowObject) {
            var id = rowObject["id"];
            var str = "";
            str += '<input type="button" class="btn btn-sm btn-info" data-auth="cmp_menu_edit" value="编辑" onclick="CmpMenu.edit(' + id + ')"/>&nbsp;';
            str += '<input type="button" class="btn btn-sm btn-danger" data-auth="cmp_menu_delete" value="删除" onclick="CmpMenu.delete(' + id + ')"/>';
            return str;
        }}
    ];
    return columns;
};



/**
 * 搜索
 */
CmpMenu.search = function () {
    var queryData = {};
    CmpMenu.table.refresh({query: queryData});
};

var jstreeOptions = {
    core: {
        data: [],
        themes: {
            "variant" : "large"
        }
    },
    checkbox: {
        "keep_selected_style": false
    }
 };


/**
 * 新增弹框
 */
CmpMenu.create = function () {
    $("#createModal").modal();
};

/**
 * 保存
 */
CmpMenu.insert = function () {
    var menu = getFormJson($("#create-form"));
    menu.pcode = treeInput1.attr("data-code");
    menu.enabled = document.querySelector("#createModal .js-switch").checked;
    $.ajax({
        url: "/cmp_config/menu/insert",
        type: 'POST',
        data: JSON.stringify(menu),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#createModal").modal("hide");
                success("保存成功");
                CmpMenu.search();
                $("#create-form")[0].reset();
            }
        }
    })
};

/**
 * 编辑弹框
 */
CmpMenu.edit = function (id) {
    //每次编辑前取消选择所有，会触发"changed.jstree"事件
    treePanel2.jstree("deselect_all");
    $.ajax({
        url: "/cmp_config/menu/get?id=" + id,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var menu = r.obj;
                var form = $("#edit-form");
                form.find("input[name='id']").val(menu.id);
                form.find("input[name='name']").val(menu.name);
                form.find("input[name='url']").val(menu.url);
                form.find("input[name='code']").val(menu.code);
                treePanel2.jstree("select_node", menu.pcode);
                form.find("input[name='icon']").val(menu.icon);
                form.find("select[name='type']").val(menu.type);
                form.find("input[name='sequence']").val(menu.sequence);
                setSwitchery(editSwitchery, menu.enabled);
                $("#editModal").modal();
            }
        }
    })
};

/**
 * 更新
 */
CmpMenu.update = function () {
    var menu = getFormJson($("#edit-form"));
    menu.enabled = document.querySelector("#editModal .js-switch").checked;
    menu.pcode = treeInput2.attr("data-code");
    $.ajax({
        url: "/cmp_config/menu/update",
        type: 'POST',
        data: JSON.stringify(menu),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#editModal").modal("hide");
                CmpMenu.search();
                success("保存成功");
            }
        }
    })
};


CmpMenu.delete = function del(id) {
    warning("确定删除吗", "", function () {
        $.get("/cmp_config/menu/delete?id=" + id, function () {
            success("成功删除");
            CmpMenu.search();
        });
    })
};

var createSwitchery;
var editSwitchery;
var treeInput1 = $("#create-menu-input");
var treePanel1 = $("#create-menu-panel");
var treeInput2 = $("#edit-menu-input");
var treePanel2 = $("#edit-menu-panel");

$(function () {
    //初始化tree grid
    var table = new BSTreeTable(CmpMenu.id, "/cmp_config/menu/grid", CmpMenu.initColumn());
    table.setExpandColumn(1);
    table.setIdField("id");
    table.setCodeField("code");
    table.setParentCodeField("pcode");
    table.setExpandAll(false);
    table.init();
    CmpMenu.table = table;

    //菜单input添加click事件
    $(".tree-input").on("click", function () {
        //modal框添加click，如果点击的不是菜单下拉部分，就隐藏菜单下拉框
        var modalClicked = function (event) {
            var className = event.target.className;
            if (!(className.indexOf("tree-input") !== -1 || className.indexOf("tree-panel") !== -1 || $(event.target).parents(".tree-panel").length > 0)) {
                $(".tree-panel").fadeOut("fast");
                $(".modal-content").unbind("click", modalClicked);
            }
        };
        var panel = $(".tree-panel");
        if ($(panel).is(":hidden")) {
            $(panel).css({
                width: $(this).outerWidth(),
                height: "200px"
            }).slideDown("fast");
        }
        $(".modal-content").bind("click", modalClicked);
    });

    //初始化插件
    initPlugins();


    function initPlugins() {
        //初始化开关
        //初始化Switchery选择插件
        createSwitchery = new Switchery(document.querySelector('#createModal .js-switch'), {color: '#1AB394'});
        editSwitchery = new Switchery(document.querySelector('#editModal .js-switch'), {color: '#1AB394'});

        //初始化菜单下拉树
        $.ajax({
            url: "/cmp_config/menu/jstree",
            type: 'GET',
            dataType: "json",
            success: function (r) {
                if (r.code === 0) {
                    jstreeOptions.core.data = r.obj;
                    //绑定点击事件
                    treePanel1.jstree(jstreeOptions).bind("changed.jstree", function (obj, e) {
                        //input赋值
                        treeInput1.val(e.node.text);
                        treeInput1.attr("data-code", e.node.id);
                        //隐藏div
                        treePanel1.fadeOut("fast");
                    });
                    treePanel2.jstree(jstreeOptions).bind("changed.jstree", function (obj, e) {
                        //如果是取消选择所有事件，清空input
                        if (e.action === "deselect_all") {
                            treeInput2.val("");
                            treeInput2.attr("data-code", "");
                        } else {
                            treeInput2.val(e.node.text);
                            treeInput2.attr("data-code", e.node.id);
                            treePanel2.fadeOut("fast");
                        }
                    });
                }
            }
        });
    }
});
