var Sentiment = {
    tableId: "#grid-table-s",
    pagerId: "#grid-pager-s",
    selectId: null, //grid选择的条目id
    table: null,
    isInit:false,
    domain: "regulation_list",
    map:{slist:[],dlist:[],qlist:[]},
    smap:{},
    cmap:{}
};

/**
 * jqGrid初始化参数
 */
Sentiment.initOptions = {
    url: "/model/sentiment/grid",
    rowNum:100,
    colNames: ['名称', '信息','语料数', '操作','id','name'],
    colModel: [
        {name: 'namedesc', index: 'namedesc', width: 20, editable: false, sortable: false,formatter:function (cellvar, options, rowObject) {
            return rowObject['name']+'：'+rowObject['description'];
        }},
        {name: 'info', index: 'info', width: 20, editable: true, sortable: false,align:"center"},
        {name: 'corpusCount', index: 'corpusCount', width: 20, editable: true, sortable: false,align:"center"},
        {
            name: 'opt',
            index: 'opt',
            width: 20,
            editable: false,
            sortable: false,
            formatter: function (cellvar, options, rowObject) {
                return '<input type="button" class="btn btn-sm btn-info" value="配置语料" onclick="Sentiment.showChooseCorpus('+ rowObject['id']+','+ rowObject['xid']+',\''+rowObject['name']+ '\','+rowObject['type']+')"/>&nbsp;&nbsp;'
                +'<input type="button" class="btn btn-sm btn-warning" value="清除语料" onclick="Sentiment.clearCorpus('+ rowObject['xid']+','+rowObject['type']+')"/>&nbsp;';
            }
        },
        {name: 'id', index: 'id', hidden: true},
        {name: 'name', index: 'name', hidden: true}
    ],
    gridComplete: function () {
        $(Sentiment.tableId).setGridWidth(document.body.clientWidth*0.6);
        var list=$(Sentiment.tableId).jqGrid("getRowData");
        $.each(list, function(){
            var id = this.id;
            var sen = this.name;
            var type = sen.substring(0,1);
            Sentiment.smap[id]=sen;
            switch (type){
                case "S":
                    Sentiment.map.slist.push(this);
                    break;
                case "D":
                    Sentiment.map.dlist.push(this);
                    break;
                case "Q":
                    Sentiment.map.qlist.push(this);
                    break;
            }
        });
    }
};

Sentiment.delete = function (id) {
    warning("确定删除吗", "", function () {
        $.get("/trigger/set/delete?id=" + id, function (d) {

            if(d.obj==0){
                success("成功删除");
                Sentiment.search();
            }else{
                info("规则中使用了该集合不能删除");
            }

        });
    })
};
Sentiment.addAllCorpus = function () {
    var iret = Sentiment.checkRun();
    if(iret ==1 ){
        info("规则已暂停，请不要操作模型");
        return;
    }

    if(iret ==2 ){
        info("模型训练中,请不要配置语料");
        return;
    }
    waiting("配置中");
    warning("确定要配置所有语料","",function () {
        $.ajax({
            url:'/model/corpus/chooseAll',
            data:{rid:Wizard.rid},
            success:function (data) {
                success("配置成功！");
                Sentiment.search();
            }
        })
    });
};

Sentiment.checkRun = function () {
    var iret =0;
    var state = -1;
    $.ajax({
        url:"/regulation/get",
        data:{
            id:Wizard.rid
        },
        async:false,
        success:function (d) {
            var regu = d.obj;
            state = regu.state;
        }

    });
    if(state==3){
        iret =1;
        return iret;
    }

    var modelGroup = Sentiment.getModelGroup(Wizard.rid);
    if(modelGroup){
        var mstatus = modelGroup.mstatus;
        if(mstatus!=undefined&&mstatus==0){
            iret =2;
            return iret;
        }
    }
};

Sentiment.setCorpusFilter = function (clusterid) {
    $(".filter.form-control").eq(0).val(clusterid+"：");
    $('.dual_select').bootstrapDualListbox('refresh');

};
/*Sentiment.showChooseCorpus = function (sid,xid,type) {
    $.ajax({
        url:'/model/corpus/getClusterIds',
        data:{sid:sid},
        async:false,
        success:function (d) {
            var idList =d.obj;
            var html = "";
            $.each(idList,function () {
                if(this>0){
                    html+='<button class="btn btn-xs btn-info" onclick="Sentiment.setCorpusFilter('+this+')" >类别：'+this+'</button>&nbsp;&nbsp;';
                }
            });
            $('#clusterIdsDiv').html(html);

        }
    });
    $("#chooseCorpusModel").find('input[name=xid]').val(xid);
    $("#chooseCorpusModel").find('input[name=type]').val(type);
    var iret = Sentiment.checkRun();
    if(iret ==1 ){
        info("规则已暂停，请不要操作模型");
        return;
    }

    if(iret ==2 ){
        info("模型训练中,请不要配置语料");
        return;
    }

    $.ajax({
        url:'/model/corpus/sentenceJson',
        data:{sid:sid,xid:xid},
        success:function (data) {
            var list = data.obj;
            $("#chooseCorpusModel").find(".bootstrap-duallistbox-container").remove();
            $("#chooseCorpusModel").find(".dual_select").remove();
            $("#chooseCorpusModel").find(".modal-body").append('<select class="form-control dual_select" multiple> </select>');
            $(list).each(function () {
                var clusterid = this.clusterid;
                $(".dual_select").append('<option '+(this.selected==1?'selected':'')+' value="'+this.id+'">'+(clusterid>=1?(clusterid+"："):"")+this.sentence+'</option>');
            });

            $('.dual_select').bootstrapDualListbox('refresh');
            $('.dual_select').bootstrapDualListbox({
                preserveSelectionOnMove: 'moved',
                moveOnSelect: false,
                selectorMinimalHeight: 160
            });
            $("#chooseCorpusModel").modal();
            $('.dual_select').change(function () {
                var xid = $("#chooseCorpusModel").find('input[name=xid]').val();
                var type = $("#chooseCorpusModel").find('input[name=type]').val();
                var corpusIds = $(this).val();
                console.log(corpusIds.length);
                var corpusIdStr = corpusIds.length>0?corpusIds.join(','):"";
                $.ajax({
                    url:'/model/corpus/choose',
                    type:'POST',
                    data:{xid:xid,type:type,corpusIds:corpusIdStr},
                    success:function (data) {
                        Sentiment.search();
                    }
                })
            })
        }
    })

};*/
Sentiment.getParentBySid = function (sid) {
    var obj=null;
    $.ajax({
        url:"/sentiment/getParentBySid",
        async:false,
        data:{sid:sid},
        success:function (d) {
            obj = d.obj;
        }
    });
    return obj;
};

Sentiment.showChooseCorpus = function (sid,xid,sen,type) {
    var sentiment = null;
    $.ajax({
        url:"/sentiment/findById",
        data:{id:sid},
        async:false,
        success:function (d) {
            sentiment = d.obj;
        }
    });
    $("#chooseCorpusModel").find(".modal-title").html("选择<span style='color: red;'>"+sentiment.name+"</span>的语料");
    $("#chooseCorpusModel").find("input[name=xid]").val(xid);
    $("#chooseCorpusModel").find("input[name=type]").val(type);
    var senSelHtml ="";
    var psen = Sentiment.getParentBySid(sid);
    if(psen.pid){
        senSelHtml+='<optgroup label="'+psen.industry+'">' +
            '<option value="'+psen.pid+'">'+psen.pdesc+'</option>' +
            '</optgroup>';
    }

    var stype = sen.substring(0,1);
    var senSelList;
    switch (stype){
        case "S":
            senSelList = Sentiment.map.slist;
            break;
        case "D":
            senSelList = Sentiment.map.dlist;
            break;
        case "Q":
            senSelList = Sentiment.map.qlist;
            break;
    }
    var senSel = $("#chooseCorpusModel").find("select[name=sentiment]");

    senSelHtml += '<optgroup label="项目级别">';
    var sidList = [];
    $.each(senSelList,function () {
        var obj = this;
        if(sidList.indexOf(obj.id)!=-1){
            return true;
        }
        if(obj.id ==sid){
            senSelHtml +="<option value='"+obj.id+"' selected='selected' >"+obj.namedesc+"</option>";
        }else{
            senSelHtml +="<option value='"+obj.id+"'>"+obj.namedesc+"</option>";
        }
        sidList.push(obj.id);
    });
    senSelHtml += '</optgroup>';
    senSel.html(senSelHtml);
    Sentiment.cmap={};
    $.ajax({
        url:'/model/corpus/getClusters',
        data:{sid:sid},
        async:false,
        success:function (d) {
            var idList =d.obj;
            var clusterSel = $("#chooseCorpusModel").find("select[name=clusterid]");
            var clusterSelHtml = "<option value='-1'>全部</option>";
            clusterSelHtml += "<option value='0'>默认分类</option>";
            Sentiment.cmap[0]="默认分类";
            $.each(idList,function () {
                Sentiment.cmap[this.id]=this.name;
                clusterSelHtml +="<option value='"+this.id+"'>"+this.name+"</option>";
            });
            clusterSel.html(clusterSelHtml);
        }
    });
    CorpusNoChoose.init(sid,xid,type);
    CorpusChoose.init(sid,xid,type);
    $("#chooseCorpusModel").modal();
};


Sentiment.changeSentiment = function (sel,id) {
    var sid = $(sel).val();
    $.ajax({
        url:'/model/corpus/getClusters',
        data:{sid:sid},
        async:false,
        success:function (d) {
            var idList =d.obj;
            var clusterSel = $(id).find("select[name=clusterid]");
            var clusterSelHtml = "<option value='-1'>全部</option>";
            clusterSelHtml += "<option value='0'>默认分类</option>";
            Sentiment.cmap[0]="默认分类";
            $.each(idList,function () {
                Sentiment.cmap[this.id]=this.name;
                clusterSelHtml +="<option value='"+this.id+"'>"+this.name+"</option>";
            });
            clusterSel.html(clusterSelHtml);
        }
    });
};

Sentiment.clearCorpus = function (xid,type) {
    warning("确定清除吗", "", function () {
        waiting("清除中");
        $.ajax({
            url:"/model/corpus/clear",
            data:{xid:xid,type:type},
            success:function (d) {
                swal.close();
                Sentiment.search();
            }
        });
    });
};
Sentiment.search = function () {
    var searchParam = {};
    Sentiment.table.reload(searchParam);
};

Sentiment.changeUniversal = function (sel) {
    var val = $(sel).val();
    if(val==0){
        $("#novel-threshold-div").addClass("hide");
    }else{
        $("#novel-threshold-div").removeClass("hide");
    }
};

Sentiment.changeCorpusMatch = function (sel) {
    var val = $(sel).val();
    if(val==0){
        $("#corpus-match-length-div").addClass("hide");
        $("#corpus-similar-thold-div").addClass("hide");
    }else {
        $("#corpus-match-length-div").removeClass("hide");
        if(val==2){
            $("#corpus-similar-thold-div").removeClass("hide");
        }else{
            $("#corpus-similar-thold-div").addClass("hide");
        }

    }
};

Sentiment.changeSentenceMulti = function (sel) {
    var val = $(sel).val();
    if(val==0){
        $("#qd-privilege-div").addClass("hide");
    }else{
        $("#qd-privilege-div").removeClass("hide");
    }
};


Sentiment.changeCorpusAbnormal = function (sel) {
    var val = $(sel).val();
    if(val==0){
        $("#corpus-abnormal-thold-div").addClass("hide");
    }else {
        $("#corpus-abnormal-thold-div").removeClass("hide");
    }
};

Sentiment.getModelGroup = function (rid) {
    var modelGroup=null;
    $.ajax({
        url:"/model/getModelGroup",
        async:false,
        data:{rid:rid},
        success:function (d) {
            modelGroup = d.obj;
        }
    });
    return modelGroup;
};
Sentiment.initModelDiv = function (rid) {
    var modelGroup=Sentiment.getModelGroup(rid);
    $.get('/stateinfo/getStateSentitypesMap',{rid:rid},function (data) {
        var list= data.obj;
        var n=0;
        var html ="";
        $.each(list,function (k,v) {
            html += " <div class=\"form-group\">\n" +
                "                <label class=\"col-sm-1 control-label\">"+(n==0?"默认回复情感":"&nbsp;")+"</label>\n" +
                "                <label class=\"col-sm-2 control-label label-50 ml-1p \" style=\"padding-right: 0;\">"+k+"</label>\n" +
                "                <input type='hidden' name='from' value='"+k+"'/>\n" +
                "                <div class=\"col-sm-1\">\n" +
                "                    <select class=\"form-control\" name=\""+k+"senti\">\n" ;
                $.each( v, function(){
                    var s= this;
                    html += "<option value='"+s+"'>"+s+"</option>";
                });
            html +="                 </select>\n" +
                "                </div>\n" +
                "     </div>";
            n++;
        });
        $("#default-confirm-div").html(html);
        if(modelGroup&&modelGroup.id){
            $("#init-model-form").find("input[name=id]").val(modelGroup.id);
            var route = modelGroup.route;
            $("#init-model-form").find("input[name=route]").val(route);
            if(route&&route.length>0){
                $("#init-model-form").find("input[name=route]").attr("disabled","disabled");
            }
            var config_json = eval("("+modelGroup.config+")");
            $("#init-model-form").find("select[name=sentence_multi_open]").val(config_json.sentence_multi_open?1:0);
            $("#init-model-form").find("select[name=universal_open]").val(config_json.universal_open?1:0);
            if(config_json.corpus_match_open){
                if(config_json.corpus_similar_open){
                    $("#init-model-form").find("select[name=corpus_match_open]").val(2);
                }else{
                    $("#init-model-form").find("select[name=corpus_match_open]").val(1);
                }

            }else{
                $("#init-model-form").find("select[name=corpus_match_open]").val(0);
            }

            if(config_json.corpus_abnormal_open){
                $("#init-model-form").find("select[name=corpus_abnormal_open]").val(1);
            }

            if(config_json.sentence_multi_open){
                $("#qd-privilege-div").removeClass('hide');
                $("#init-model-form").find("select[name=qd-privilege]").val(config_json.qd_privilege);
            }
            if(config_json.universal_open){
                $("#novel-threshold-div").removeClass('hide');
                $("#init-model-form").find("select[name=novel_threshold]").val(config_json.novel_threshold);
            }
            if(config_json.corpus_match_open){
                $("#corpus-match-length-div").removeClass('hide');
                $("#init-model-form").find("input[name=corpus_match_length]").val(config_json.corpus_match_length);
            }
            if(config_json.corpus_similar_open){
                $("#corpus-similar-thold-div").removeClass('hide');
                $("#init-model-form").find("input[name=corpus_similar_thold]").val(config_json.corpus_similar_thold*100);
            }
            if(config_json.corpus_abnormal_open){
                $("#corpus-abnormal-thold-div").removeClass('hide');
                $("#init-model-form").find("input[name=corpus_abnormal_thold]").val(config_json.corpus_abnormal_thold*100);
            }
            var default_confirm= config_json.default_confirm;
            $.each(default_confirm,function (k,v) {
                $("select[name="+k+"senti]").val(v);
            })
        }
    });
    Sentiment.refreshModelRadio();
};
Sentiment.showErrorEvalLog = function (vid) {
    $("#errorEvalLogModel").modal();
    ErrorEvalLog.init(Wizard.rid,vid);
};
Sentiment.showErrorTrainLog = function (vid) {
    $("#errorTrainLogModel").modal();
    ErrorTrainLog.init(Wizard.rid,vid);
};
Sentiment.abandonModel = function (vid) {
    warning("确定废弃吗", "", function () {
        waiting("废弃中");
        $.ajax({
            url:"/model/abandon",
            data:{rid:Wizard.rid,vid:vid},
            success:function (d) {
                var obj = d.obj;
                if(obj.code==0){
                    success("废弃成功");
                }else{
                    info(obj.errmsg);
                }

                Sentiment.refreshModelRadio();
                Sentiment.initModelDiv(Wizard.rid);
            }
        });
    });
};

Sentiment.refreshModelRadio = function () {
    $.ajax({
        url:'/model/getModelVersions',
        data:{rid:Wizard.rid},
        success:function (data) {
            var list = data.obj.mvList;
            if(list.length>0){
                var mg=data.obj.mg;
                var html = "";
                var selectedHtml = "";

                $(list).each(function () {
                    var val = this;
                    html += "<div class='row' style='height: 34px;'>\n" +
                        "        <div class='col-sm-2 width-30 '>\n" +
                        "            <input type='radio' value='"+val.id+"' name='modelRadio' style='width: 20px;height: 20px;margin-top: 7px;' "+(mg.version_id==val.id?"checked='checked'":"")+" >\n" +
                        "        </div>\n" +
                        "        <div class='col-sm-2 width-400 ' style='line-height: 34px;'>\n" +
                        "            "+val.version+"："+val.description+"\n" +
                        "        </div>\n" +
                        "        <div class='col-sm-2 width-400 ' style='line-height: 34px;'>\n" +
                        "            <input type='button' class='btn btn-sm btn-info' value='训练情况' onclick='Sentiment.showErrorEvalLog("+val.id+")' >&nbsp;" +
                        "            <input type='button' class='btn btn-sm btn-warning' value='错误日志' onclick='Sentiment.showErrorTrainLog("+val.id+")' >&nbsp;" +
                        "            <input type='button' class='btn btn-sm btn-danger' value='废弃模型' onclick='Sentiment.abandonModel("+val.id+")' >\n" +
                        "        </div>\n" +
                        "     </div>";
                    if(mg.version_id==val.id){
                        selectedHtml = "<div class='row' style=\"height: 34px;\">\n" +
                            "               <div class='col-sm-2 width-30 '>\n" +
                            "                   <input type='checkbox' style='width: 20px;height: 20px;margin-top: 7px;' checked  disabled >\n" +
                            "               </div>\n" +
                            "               <div class='col-sm-2 width-400 ' style='line-height: 34px;'>\n" +
                            "                   "+val.version+"："+val.description+"\n" +
                            "               </div>\n" +
                            "           </div>";
                    }
                });
                html = selectedHtml+ html;
                if(html.length>0){
                    $("#modelRadioDiv").html(html);
                }

            }
        }
    })
};

Sentiment.createModel =function () {
    warning("确定生成吗", "", function () {
        var desc = $("#init-model-form").find("textarea[name=desc]").val();
        var branch_id = $("#init-model-form").find("select[name=branchid]").val();
        desc = $.trim(desc);
        if(desc === false||desc === ""){
            info('你需要输入版本描述');
            return;
        }
        waiting("生成模型中");
        $.ajax({
            url:"/model/init",
            data:{rid:Wizard.rid,desc:desc,branch_id:branch_id},
            success:function (d) {
                var obj = d.obj;
                if(obj.code==0){
                    success("生成成功");
                    $("#init-model-form").find("input[name=route]").attr("disabled","disabled");
                }else{
                    info(obj.errmsg);
                }

                Sentiment.refreshModelRadio();
                Sentiment.initModelDiv(Wizard.rid);
            }
        });
    });


};

Sentiment.updateMgParams =function () {

    var iret = Sentiment.checkRun();
    if(iret ==1 ){
        info("规则已暂停，请不要操作模型");
        return;
    }

    if(iret ==2 ){
        info("模型训练中,请不要更新参数");
        return;
    }
    var id = $("#init-model-form").find("input[name=id]").val();
    var route = $("#init-model-form").find("input[name=route]").val();
    route=route.trim();
    if(route === false||route === ""){
        info('你需要输入路由');
        return;
    }
    var re =  /^[0-9a-zA-Z\\-]*$/g;
    if (!re.test(route)){
        info('路由必须是字母数字组合');
        return;
    }

    var sentence_multi_open = $("#init-model-form").find("select[name=sentence_multi_open]").val();
    var universal_open = $("#init-model-form").find("select[name=universal_open]").val();
    var corpus_match_open = $("#init-model-form").find("select[name=corpus_match_open]").val();
    var corpus_abnormal_open = $("#init-model-form").find("select[name=corpus_abnormal_open]").val();
    var config ={
        sentence_multi_open:sentence_multi_open==1,universal_open:universal_open==1,corpus_match_open:corpus_match_open>=1,
        corpus_similar_open:corpus_match_open==2,corpus_abnormal_open:corpus_abnormal_open==1,
        default_confirm:{}
    };

    if(config.sentence_multi_open){
        config.qd_privilege=$("#init-model-form").find("select[name=qd_privilege]").val();
    }
    if(config.universal_open){
        config.novel_threshold=$("#init-model-form").find("select[name=novel_threshold]").val();
    }
    if(config.corpus_match_open){
        config.corpus_match_length=$("#init-model-form").find("input[name=corpus_match_length]").val();
        if(!config.corpus_match_length){
            info('匹配长度不能为空');
            return;
        }
        if(config.corpus_match_length<=0){
            info('匹配长度不能小于等于0');
            return;
        }
        if(config.corpus_similar_open){
            config.corpus_similar_thold=$("#init-model-form").find("input[name=corpus_similar_thold]").val();
            if(!config.corpus_similar_thold){
                info('相似度门限不能为空');
                return;
            }
            if(config.corpus_similar_thold<=0){
                info('相似度门限不能小于等于0');
                return;
            }
            if(config.corpus_similar_thold>=100){
                info('相似度门限不能超过100');
                return;
            }
            config.corpus_similar_thold = config.corpus_similar_thold/100;
        }
    }

    if(config.corpus_abnormal_open){
        config.corpus_abnormal_thold=$("#init-model-form").find("input[name=corpus_abnormal_thold]").val();
        if(!config.corpus_abnormal_thold){
            info('相似度门限不能为空');
            return;
        }
        if(config.corpus_abnormal_thold<=0){
            info('相似度门限不能小于等于0');
            return;
        }
        if(config.corpus_abnormal_thold>=100){
            info('相似度门限不能超过100');
            return;
        }
        config.corpus_abnormal_thold = config.corpus_abnormal_thold/100;

        if(config.corpus_similar_open){
            if(config.corpus_similar_thold<=config.corpus_abnormal_thold){
                info('文本强制匹配的相似度门限必须高于答非所问的');
                return;
            }

        }
    }

    $("#default-confirm-div").find("select").each(function () {
        var from = $(this).parent().siblings('input').val();
        config.default_confirm[from]= $(this).val();
    });
    var data = {
        id:id?id:null,
        route:route,
        config:JSON.stringify(config),
        rid:Wizard.rid
    };
    $.ajax({
        url:"/model/addOrUpdateModelGroup",
        async:false,
        data:data,
        success:function (data) {
            var obj = data.obj;
            if(obj.code==0){
                success("更新成功");
            }else{
                info(obj.errmsg);
            }
            Sentiment.initModelDiv(Wizard.rid);
        }
    });

};
Sentiment.changeModel =function () {
    var iret = Sentiment.checkRun();
    if(iret ==1 ){
        info("规则已暂停，请不要操作模型");
        return;
    }

    if(iret ==2 ){
        info("模型训练中,请不要切换模型");
        return;
    }
    warning("确定切换吗", "", function () {
        var id = $("input[name=modelRadio]:checked").val();
        waiting("模型切换中");
        $.get("/model/change",{rid:Wizard.rid,vid:id},function (data) {
            var obj = data.obj;
            if(obj.code==0){
                success("切换完毕");
            }else{
                info(obj.errmsg);
            }
            Sentiment.refreshModelRadio();
        })
    });

};
Sentiment.initModelVersions = function (rid) {
    $.ajax({
        url:"/regulation/getModuleVersions",
        data:{
            rid:rid,
            module:"model"
        },
        success:function (d) {
            var versions = d.obj;
            $("select[name=branchid]").html("");
            $(versions).each(function () {
                $("select[name=branchid]").append("<option value='"+this.bid+"'>"+this.bname+":"+this.binfo+"</option>");
            })
        }
    });
};

Sentiment.init = function (rid) {

    Sentiment.initModelDiv(rid);
    Sentiment.initModelVersions(rid);
    if(Sentiment.isInit){
        Sentiment.search();
    }else{
        Sentiment.initOptions.url += "?rid="+rid;
        var jqGrid = new JqGrid(Sentiment.tableId, Sentiment.pagerId, Sentiment.initOptions);
        Sentiment.table = jqGrid.init();
        Sentiment.isInit = true;
    }
    Wizard.refreshPermission(Sentiment.domain,"step5");

};


var ErrorEvalLog = {
    tableId: "#grid-table-e",
    pagerId: "#grid-pager-e",
    selectId: null, //grid选择的条目id
    table: null,
    isInit:false
};

ErrorEvalLog.initOptions = {
    url: "/model/getErrorEvalLog",
    rowNum:20,
    page:1,
    colNames: ['状态', '情感','recall', 'preci'],
    colModel: [
        {name: 'fromstatus', index: 'fromstatus', width: 119, editable: false, sortable: false,align:"center"},
        {name: 'triggertype', index: 'triggertype', width: 119, editable: false, sortable: false,align:"center"},
        {name: 'recall', index: 'recall', width: 150, editable: false, sortable: false,align:"center"},
        {name: 'preci', index: 'preci', width: 150, editable: false, sortable: false,align:"center"}
    ],
    gridComplete: function () {
        setTimeout(function () {
            var width = $("#errorEvalLogModel").find(".modal-body").width();
            $(ErrorEvalLog.tableId).setGridWidth(width);
        },150);

    }
};

ErrorEvalLog.search = function (rid,vid) {
    var searchParam = {"rid":rid,"vid":vid};
    ErrorEvalLog.table.reload(searchParam);
};

ErrorEvalLog.init = function (rid,vid) {

    if(ErrorEvalLog.isInit){
        ErrorEvalLog.search(rid,vid);
    }else{
        ErrorEvalLog.initOptions.postData ={"rid":rid,"vid":vid};
        var jqGrid = new JqGrid(ErrorEvalLog.tableId, ErrorEvalLog.pagerId, ErrorEvalLog.initOptions);
        ErrorEvalLog.table = jqGrid.init();
        ErrorEvalLog.isInit = true;
    }

};


var ErrorTrainLog = {
    tableId: "#grid-table-et",
    pagerId: "#grid-pager-et",
    selectId: null, //grid选择的条目id
    table: null,
    isInit:false
};

ErrorTrainLog.initOptions = {
    url: "/model/getErrorTrainLog",
    rowNum:20,
    page:1,
    colNames: ['文字','状态', '语料情感','预测情感'],
    colModel: [
        {name: 'calltext', index: 'calltext', width: 200, editable: false, sortable: false},
        {name: 'fromstatus', index: 'fromstatus', width: 114, editable: false, sortable: false,align:"center"},
        {name: 'traintrigger', index: 'traintrigger', width: 112, editable: false, sortable: false,align:"center"},
        {name: 'pretrigger', index: 'pretrigger', width: 112, editable: false, sortable: false,align:"center"}
    ],
    gridComplete: function () {
        setTimeout(function () {
            var width = $("#errorTrainLogModel").find(".modal-body").width();
            $(ErrorTrainLog.tableId).setGridWidth(width);
        },150);

    }
};

ErrorTrainLog.search = function (rid,vid) {
    var searchParam = {"rid":rid,"vid":vid};
    searchParam.fromstatus = $("#errorTrainLogModel").find("input[name=fromstatus]").val();
    $(ErrorTrainLog.tableId).jqGrid('setGridParam',{page:1});
    ErrorTrainLog.table.reload(searchParam);
};

ErrorTrainLog.init = function (rid,vid) {

    if(ErrorTrainLog.isInit){
        ErrorTrainLog.search(rid,vid);
    }else{
        ErrorTrainLog.initOptions.postData ={"rid":rid,"vid":vid};
        var jqGrid = new JqGrid(ErrorTrainLog.tableId, ErrorTrainLog.pagerId, ErrorTrainLog.initOptions);
        ErrorTrainLog.table = jqGrid.init();
        ErrorTrainLog.isInit = true;
    }

};
