var Regulation = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    selectId: null, //grid选择的条目id
    table: null,
    domain: "regulation_list"
};


/**
 * jqGrid初始化参数
 */
Regulation.initOptions ={
    url: "/regulation/grid",
    autowidth: true,
    colNames: ['id','标签', '版本','分类','状态','激活状态','外呼任务数', '操作'],
    colModel: [
        {name: 'id', index: 'id', width: 50, editable: false, sortable: false,align:"center"},
        {name: 'tag', index: 'tag', width: 100, editable: false, sortable: false,align:"center"},
        {name: 'version', index: 'version', width: 70, editable: false, sortable: false,align:"center"},
        {
            name: 'cate',
            index: 'cate',
            width: 70,
            editable: false,
            sortable: false,
            align:"center",
            formatter: function (cellvar, options, rowObject) {
                var text ="";
                if(rowObject['cname']&&rowObject['scname']){
                    text+=rowObject['cname']+'-'+rowObject['scname'];
                }
                return text;
            }
        },
        {
            name: 'stateCon',
            index: 'stateCon',
            width: 70,
            editable: false,
            sortable: false,
            align:"center",
            formatter: function (cellvar, options, rowObject) {
                var state = rowObject['state'];
                var text = "";
                switch (state){
                    case 0:
                        text= "未审核";
                        break;
                    case 1:
                        text= "已审核";
                        break;
                    case 2:
                        text= "已废弃";
                        break;
                    case 3:
                        text= "已暂停";
                        break;
                    case 4:
                        text= "重启中";
                        break;
                    case 5:
                        text= "重启失败";
                        break;
                }
                return text;
            }
        },
        {
            name: 'acstateCon',
            index: 'acstateCon',
            width: 100,
            editable: false,
            sortable: false,
            align:"center",
            formatter: function (cellvar, options, rowObject) {
                var acstate = rowObject['acstate'];
                return acstate == 0 ? "未激活" : "已激活";
            }
        },
        {name: 'pcount', index: 'pcount', width: 70, editable: false, sortable: false,align:"center"},
        {
            name: 'opt',
            index: 'opt',
            width: 280,
            editable: false,
            sortable: false,
            formatter: function (cellvar, options, rowObject) {
                var id = rowObject['id'];
                var cid = rowObject['cid'];
                var industry_id = rowObject['industry_id'];
                var state = rowObject['state'];
                var acstate = rowObject['acstate'];
                var str =  '';
                if(state==2){
                    str += '<input type="button" class="control-auth btn btn-sm btn-success" value="查看" data-auth="regulation_edit" onclick="Regulation.show(\'' +cid+'\',\''+ id +'\')"/>';
                    return str;
                }
                if (state == 0) {
                    str += '<input type="button" class="control-auth btn btn-sm btn-warning" value="编辑" data-auth="regulation_edit" onclick="Regulation.edit(\'' +cid+'\',\''+ id +'\')"/>';
                    str += '<input type="button" class="control-auth btn btn-sm btn-info" value="审核" data-auth="regulation_verify" onclick="Regulation.verify(\''+ id + '\')"/>';
                }else if (state == 1) {
                    str += '<input type="button" class="control-auth btn btn-sm btn-success" value="查看" data-auth="regulation_edit" onclick="Regulation.show(\'' +cid+'\',\''+ id +'\')"/>';
                    if(acstate!=1){
                        str += '<input type="button" class="control-auth btn btn-sm btn-success" value="激活" data-auth="regulation_edit" onclick="Regulation.showActive('+ id +','+industry_id+')"/>';
                    }else if(acstate==1){
                        str += '<input type="button" class="control-auth btn btn-sm btn-primary" value="暂停" data-auth="regulation_edit" onclick="Regulation.stop('+ id +',this)"/>';
                    }
                }else if(state==3){
                    str += '<input type="button" class="control-auth btn btn-sm btn-success" value="查看" data-auth="regulation_edit" onclick="Regulation.show(\'' +cid+'\',\''+ id +'\')"/>';
                    str += '<input type="button" class="control-auth btn btn-sm btn-primary" value="重启" data-auth="regulation_edit" onclick="Regulation.restart('+ id +',this)"/>';
                }
                str += '<input type="button" class="control-auth btn btn-sm btn-info" value="废弃" data-auth="regulation_waste" onclick="Regulation.abandon('+ id +',this)"/>';
                str += '<input type="button" class="control-auth btn btn-sm btn-danger" value="接口测试" data-auth="regulation_interface_test" onclick="Regulation.showRemoteTest(\''+ id +'\')"/>';
                // str += '<input type="button" class="control-auth btn btn-sm btn-primary" value="关联短信" data-auth="regulation_regulation_note" onclick="Regulation.toSms(\'' +cid+'\',\''+ id +'\')"/>';
                str += '<input type="button" class="control-auth btn btn-sm btn-primary" value="绑定规则分类" data-auth="regulation_subcategory" onclick="Regulation.showSubcategory('+id+')"/>';
                if(rowObject['pcount']>0){
                    str += '<input type="button" class="control-auth btn btn-sm btn-danger" value="外呼任务" data-auth="regulation_edit" onclick="Regulation.showProject(\''+ id +'\')"/>';
                }
                return str;
            }
        }
    ],
    gridComplete: function () {
        refreshPermission(Regulation.domain);
    }
};

/**
 * 根据关键词搜索
 */
Regulation.search = function () {
    var searchParam = {};
    searchParam.inid = $("#inid").val().trim();
    searchParam.cid = $("#cid").val().trim();
    searchParam.scid = $("#scid").val().trim();
    searchParam.tag = $("#tag").val().trim();
    searchParam.version = $("#version").val().trim();
    searchParam.state = $("#state").val().trim();
    Regulation.table.reload(searchParam);
};

/**
 * 重置搜索
 */
Regulation.resetSearch = function () {
    Regulation.search();
};



/**
 * 关联标签
 */
Regulation.toRelation = function (rid) {
    window.location.href = "/projectLabel/label/list?rid=" + rid;
};


Regulation.test = function (id) {
    warning("确定测试吗？", "", function () {
        swal({
            title: "<h2>测试中</h2>",
            text:'<div class="spiner-example" style="height:162px;">'+
            '<div class="sk-spinner sk-spinner-wave">'+
            '<div class="sk-rect1"></div>'+
            '<div class="sk-rect2" style="margin-left: 2px"></div>'+
            '<div class="sk-rect3" style="margin-left: 2px"></div>'+
            '<div class="sk-rect4" style="margin-left: 2px"></div>'+
            '<div class="sk-rect5" style="margin-left: 2px"></div>'+
            '</div>'+
            '</div>',
            html: true,
            showConfirmButton:false
        });
        $.get("/statetest/batchTest?rid=" + id, function (d) {
            var obj =d.obj;
            if (obj.code==0) {
                if(obj.allpass==1){
                    success("全部测试通过，具体："+obj.result);
                }else{
                    info("未全部测试通过，具体："+obj.result);
                }

            }else if (obj.code==1) {
                info(obj.result);
            }
        });
    })
};

Regulation.showRemoteTest = function (id) {
    $("#remote-test-form").find("input[name=calltext]").val("");
    $("#remote-test-form").find("input[name=fromstatus]").val("");
    $("#remote-test-form").find("p").html("") ;
    $("#remote-test-form").find("input[name=rid]").val(id);
    $("#remoteTestModal").modal();
};

Regulation.remoteTest = function (refresh) {
    var rid = $("#remote-test-form").find("input[name=rid]").val().trim();
    var calltext = $("#remote-test-form").find("input[name=calltext]").val().trim();
    var fromstatus = $("#remote-test-form").find("input[name=fromstatus]").val().trim();
    waiting("测试中");
    $.ajax({
        url: "/statetest/remoteTest",
        type: 'POST',
        data:{calltext:calltext,fromstatus:fromstatus,rid:rid,refresh:refresh?1:0},
        dataType: "json",
        success: function (r) {
            var obj = r.obj;
            success("请求成功");
            if(obj.code>=0){
                $("#remote-test-form").find("p").html(obj.result) ;
            }

        }
    });
};

Regulation.showProject = function (id) {
    $.ajax({
        url:"/regulation/getProjectRegulationsByRid",
        data:{rid:id},
        success:function (d) {
            var list = d.obj;
            var tbody = $("#projectModal").find("tbody");
            tbody.html("");
            if(list&&list.length>0){
                $.each(list,function () {
                    tbody.append('<tr><td>'+this.cname+'</td><td>'+this.pid+'</td><td>'+this.pname+'</td></tr>')
                })
            }
        }
    });

    $("#projectModal").modal();
};
Regulation.create =function () {
    var categories =[];
    $.ajax({
        url:"/category/getAll",
        async:false,
        success:function (d) {
            categories = d.obj;
        }
    });
    var select = $("#createModal").find("select[name=scid]");
    var cpselect = $("#createModal").find("select[name=cpscid]");
    select.html("");
    cpselect.html("");
    var selectHtml = "";
    var cpselectHtml = "";
    $.each(categories, function(n, val) {

        var cid = val.cid;
        var cname = val.name;
        var list = val.list;
        selectHtml+='<optgroup label = "'+cname+'">';
        cpselectHtml+='<optgroup label = "'+cname+'">';
        $.each(list,function () {
            selectHtml+=('<option data="'+cid+'" value="'+this.id+'">'+this.name+'</option>');
            cpselectHtml+=('<option data="'+cid+'"  value="'+this.id+'">'+this.name+'</option>');
        });
        selectHtml+='</optgroup>';
        cpselectHtml+='</optgroup>';
    });
    select.html(selectHtml);
    cpselect.html(cpselectHtml);
    var industries =[];
    $.ajax({
        url:"/industry/list",
        async:false,
        success:function (d) {
            industries = d.obj;
        }
    });
    var select1 = $("#createModal").find("select[name=industryId]");
    select1.html("");
    for(var j=0;  j< industries.length;j++){
        select1.append('<option value="'+industries[j].id+'">'+industries[j].name+'</option>');
    }

    $("#createModal").find("select[name=scid]").change(function () {
        $("#createModal").find("select[name=cpscid]").val($(this).val().trim());
        var scid = $(this).val().trim();
        var cid = $(this).find("option:selected").attr("data").trim();
        Regulation.changeCategory(scid,cid);
    });
    $("#createModal").find("select[name=cpscid]").change(function () {
        var scid =$(this).val().trim();
        var cid = $(this).find("option:selected").attr("data").trim();
        Regulation.changeCategory(scid,cid);
    });
    Regulation.changeCategory(categories[0].list[0].id,categories[0].cid);

    /*$("#createModal").find("select[name=industryId]").change(function () {
        Regulation.changeIndustry($(this).val().trim());
    });
    Regulation.changeIndustry(industries[0].id);*/
    $("#createModal").find("input[type=checkbox]").click(function () {
       if($(this).is(":checked")){
           $("#createModal").find("input[name=iscopy]").val("1");
           $(".cpridSelect").css("visibility","visible");
       }else{
           $("#createModal").find("input[name=iscopy]").val("0");
           $(".cpridSelect").css("visibility","hidden");
       }
    });
    $("#createModal").modal();
};

/*Regulation.changeIndustry=function(industryId){

    var models =[];
    $.ajax({
        url:"/modelgroup/getListByIndustryId",
        data:{industryId:industryId},
        async:false,
        success:function (d) {
            models = d.obj;
        }
    });
    var select = $("#createModal").find("select[name=mid]");
    select.html("");
    select.append('<option value="-1">无</option>');
    for(var i=0;  i< models.length;i++){
        select.append('<option value="'+models[i].id+'">'+models[i].name+'</option>');
    }

};*/
Regulation.changeCategory=function(scid,cid){
    $("#createModal").find("input[name=cid]").val(cid);
    var regulations =[];
    $.ajax({
        url:"/regulation/getByScid",
        data:{scid:scid},
        async:false,
        success:function (d) {
            regulations = d.obj;
        }
    });
    var select = $("#createModal").find("select[name=cprid]");
    select.html("");
    for(var i=0;  i< regulations.length;i++){
        select.append('<option value="'+regulations[i].id+'">'+regulations[i].tag+'-'+regulations[i].version+'</option>');
    }

};

Regulation.changeCidSelect=function(){
    var cid = $("#cid").val();
    var cateList =[];
    $.ajax({
        url:"/category/getSubCates",
        data:{cid:cid},
        async:false,
        success:function (d) {
            cateList = d.obj;
        }
    });
    var select = $("#scid");
    select.html('<option value="-1">所有</option>');
    for(var i=0;  i< cateList.length;i++){
        select.append('<option value="'+cateList[i].id+'">'+cateList[i].name+'</option>');
    }

};

Regulation.insert =function () {
    $.ajax({
        url:"/regulation/addOrUpdate",
        data:$("#create-form").serialize(),
        success:function (d) {
            if(d.obj==0){
                $("#createModal").modal("hide");
                Regulation.search();
                success("插入成功！");
            }else if(d.obj==1){
                info("标签或者版本为空");
            }else if(d.obj==2){
                info("规则生成后不能修改版本");
            }else if(d.obj==3){
                info("版本不能重复");
            }
        }
    });
};

Regulation.showActive =function (id,industry_id) {
    $("#active-form").find("input[name=rid]").val(id);
    $.ajax({
        url:"/regulation/getModuleVersions",
        data:{
            industry_id:industry_id,
            module:"rule"
        },
        success:function (d) {
            var versions = d.obj;
            $("#active-form").find("select[name=branchid]").html("");
            $(versions).each(function () {
                $("#active-form").find("select[name=branchid]").append("<option value='"+this.bid+"'>"+this.bname+":"+this.binfo+"</option>");
            })
        }
    });

    $("#activeModal").modal();
};

Regulation.active =function () {

    var id = $("#active-form").find("input[name=rid]").val().trim();
    var branch_id = $("#active-form").find("select[name=branchid]").val().trim();
    var numStr = $("#active-form").find("input[name=num]").val().trim();
    if (numStr === false) {
        return;
    }

    if (numStr === "") {
        info("你需要输入激活数目");
        return;
    }
    var num = parseInt(numStr);
    if(isNaN(num)){
        info("激活数目必须是数字");
        return;
    }
    if(num<=0){
        info("激活数目不能<=0");
        return;
    }

    warning("确定激活吗？", "", function (isConfirm) {
        if(!isConfirm){
            return;
        }
        $("#activeModal").modal("hide");
        var data = { id: id, num: num,branch_id:branch_id };
        waiting("激活中");

        $.get("/regulation/active", data, function (d) {
            var obj = d.obj;
            if (obj.code == 0) {
                success("成功激活");
                Regulation.search();
            }else {
                info(obj.errmsg);
            }

        });
         /*setTimeout(function () {
         success("成功激活");
         Regulation.search();
         },5000);*/
    })



};
Regulation.showSubcategory =function (rid) {
    $("#sub_rid").val(rid);
    $("#subcategoryDiv").html(" ");
    $.ajax({
        url:"/subcategory/getAllSubCategory?rid="+rid,
        success:function (r) {
            if(r.code==0){
                var obj=r.obj;
                var sublist=obj.sublist;
                var chosen=obj.chosen;
                var html="<select name='subcategory' class='form-control' id='subcategory'>";
                for(var i=0;i<sublist.length;i++){
                    if(chosen==sublist[i].id){
                        html+="<option selected value='"+sublist[i].id+"'>"+sublist[i].name+"</option>";
                    }else{
                        html+="<option value='"+sublist[i].id+"'>"+sublist[i].name+"</option>";
                    }
                }
                html+="</select>";
                $("#subcategoryDiv").html(html);
                $("#subcategoryModal").modal();
            }
        }
    })
}
Regulation.subcategory =function () {
    var rid=$("#sub_rid").val();
    var subid=$("#subcategory").val();
    var subname=$("#subcategory").find("option:selected").text();
    $.ajax({
        url:"/regulation/bindSubcategory",
        type:"post",
        data:{
            "rid":rid,
            "subid":subid,
            "subname":subname
        },
        success:function (r) {
            if(r.code==0){
                success("绑定成功");
                $("#subcategoryModal").modal('hide');
            }
        }
    })
}

Regulation.edit =function (cid,rid) {
    window.open("/regulation/wizard?cid="+cid+"&rid="+rid);
};
Regulation.show =function (cid,rid) {
    window.open("/regulation/wizard/show?cid="+cid+"&rid="+rid);
};
Regulation.toSms =function (cid,rid) {
    location.href="/regulation/smsshow?cid="+cid+"&rid="+rid;
};
Regulation.verify =function (id) {
    warning("确定审核通过吗？", "", function () {
        $.get("/regulation/verify?id=" + id, function (d) {
            var obj = d.obj;
            if(obj.code==0){
                Regulation.search();
                success("审核成功");
            }else{
                info(obj.errmsg);
            }
        });
    })
};
Regulation.abandon =function (id,btn) {
    btn.disabled =true;
    warning("确定废弃吗？", "", function (isConfirm) {
        if(!isConfirm){
            btn.disabled =false;
            return;
        }
        waiting("废弃中");
        $.get("/regulation/abandon?id=" + id, function (d) {
            var obj = d.obj;
            if(obj.code==0){
                Regulation.search();
                success("废弃成功");
            }else{
                info(obj.errmsg);
            }
            btn.disabled =false;
        });
    })
};
Regulation.stop =function (id,btn) {
    btn.disabled =true;
    warning("确定暂停吗？", "", function (isConfirm) {
        if(!isConfirm){
            btn.disabled =false;
            return;
        }
        waiting("暂停中");
        $.get("/regulation/stop?id=" + id, function (d) {
            var obj = d.obj;
            if(obj.code==0){
                Regulation.search();
                success("暂停成功");
            }else{
                info(obj.errmsg);
            }
            btn.disabled =false;
        });
    })
};
Regulation.restart =function (id,btn) {
    btn.disabled =true;
    warning("确定重启吗？", "", function (isConfirm) {
        if(!isConfirm){
            btn.disabled =false;
            return;
        }
        waiting("重启中");
        $.get("/regulation/restart?id=" + id, function (d) {
            var obj = d.obj;
            if(obj.code==0){
                Regulation.search();
                success("重启成功");
            }else{
                info(obj.errmsg);
            }
            btn.disabled =false;
        });
    })
};


$(function() {
    var jqGrid = new JqGrid(Regulation.tableId, Regulation.pagerId, Regulation.initOptions);
    Regulation.table = jqGrid.init();
});