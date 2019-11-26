var ReguConfig={};
ReguConfig.init=function() {

    setTimeout(function () {
        ReguConfig.initMoodEn();
    },10);
    setTimeout(function () {
        ReguConfig.initState();
    },10);
    setTimeout(function () {
        ReguConfig.initCorrect();
    },10);
    setTimeout(function () {
        ReguConfig.initLocation();
    },10);
    setTimeout(function () {
        ReguConfig.initInterrupt();
    },10);
    setTimeout(function () {
        ReguConfig.initEmoTrans();
    },10);


    setTimeout(function () {
        ReguConfig.initSet();
        ReguConfig.refreshSimpleSelect();
        ReguConfig.refreshAllTable();
        TriggerLineSet.refreshSetSelect();
    },300);
};

ReguConfig.initMoodEn = function () {
    var moodValues =[];
    var list = ReguConfigUtil.getList(1,0);
    if(list.length>0){
        var mood = list[0];
        var id = mood.id;
        $("#mood-regu-div").find("input[name=id]").val(id);
        var froms = mood.froms.split(",");
        var tos = mood.tos.split(",");
        var values = [];
        for (var i = 0; i < froms.length; i++) {
            var from = froms[i];
            var to = tos[i];
            values.push(from+","+to);
        }
        moodValues = values;
    }

    $.ajax({
        url:"/eventinfo/map",
        data:{
            rid:Wizard.rid
        },
        success:function (d) {
            var map = d.obj;
            ReguConfig.chosenInit(map,"mood-status-div","mood_status_select");
            $(".mood_status_select").val(moodValues);
            $(".mood_status_select").trigger('chosen:updated');

            $('.mood_status_select').on('change', function() {
                var len = $(this).val().length;
                if(len>5){
                    $(".mood-status-div").css("width",len*77+"px");
                }else{
                    $(".mood-status-div").css("width","400px");
                }
            });

        }
    });
};

ReguConfig.initState = function () {
    var list = ReguConfigUtil.getList(1,4);
    var nothearState;
    if(list.length>0){
        var nothear = list[0];
        var id = nothear.id;
        $("#nothear-regu-div").find("input[name=id]").val(id);
        nothearState = nothear.froms;
        var zjtype = nothear.tos;
        $("#nothear-regu-div").find('input:checkbox').eq(0).attr("checked",zjtype==1);

    }

    var statusDivs = ReguConfigData.statusDivs;
    var stateMap=ReguConfig.getStateinfoMap();
    for(var key in stateMap){
        stateMap[key]=key;
    }
    for (var i = 0; i < statusDivs.length; i++) {
        var obj = statusDivs[i].split(",");
        ReguConfig.chosenInit(stateMap,obj[0],obj[1],parseInt(obj[2]),obj.length>3?obj[3]:undefined);
    }

    $(".nothear_status_select").val(nothearState);
    $(".nothear_status_select").trigger('chosen:updated');

};

ReguConfig.initCorrect = function () {
    $("#correct-regu-div").find('input:checkbox').attr("checked",false);
    var correctConfigs = [];
    $.ajax({
        url:"/regulation/getCorrectConfigs",
        async:false,
        data:{
            rid:Wizard.rid
        },
        success:function (d) {
            correctConfigs = d.obj;
        }
    });
    var row = $("#correct-regu-div").find("div.row").eq(0).html();
    $("#correct-regu-inner-div").html("");
    var correctIds = [];
    for(i = 0;i<correctConfigs.length;i++){
        var cname =correctConfigs[i].name;
        var cid =correctConfigs[i].id;
        correctIds.push(parseInt(cid));
        $("#correct-regu-inner-div").append('<div class="row" style="height: 34px;">'+row.replace(/通用模块/,cname).replace(/width-400/,'width-130').replace(/value="translate"/,'value="'+cid+'"')
            +'<div class="col-sm-2 width-130 correct-status-div"></div></div>');
    }

    var statusDivs = "correct-status-div,correct_status_select,1";
    var stateMap=ReguConfig.getStateinfoMap();
    for(var key in stateMap){
        stateMap[key]=key;
    }
    var obj = statusDivs.split(",");
    ReguConfig.chosenInit(stateMap,obj[0],obj[1],parseInt(obj[2]));
    var list = ReguConfigUtil.getList(2,0);
    if(list.length>0){
        var correct =list[0];
        var id = correct.id;
        $("#correct-regu-div").find("input[name=id]").val(id);
        var status = correct.froms;
        var statusArr =[];
        if(status.length>0){
            statusArr =status.split(",");
        }

        var line = correct.value.split(",");
        for (var i = 0; i < line.length; i++) {
            var action = line[i];
            if(action=="translate"){
                $("#correct-regu-div").find('input:checkbox').eq(0).attr("checked",'true');
            }else{
                if(action=="name"){
                    $("#correct-regu-div").find('input:checkbox').eq(1).attr("checked",'true');
                    $(".correct-status-div").eq(0).find('select[name=status]').val(statusArr[0]);
                    $(".correct-status-div").eq(0).find('select[name=status]').trigger('chosen:updated');
                }else{
                    var cindex = correctIds.indexOf(parseInt(action));
                    var commcount = 0;
                    if(line.indexOf("name")!=-1) commcount++;
                    if(cindex!=-1){
                        $("#correct-regu-div").find('input:checkbox').eq(cindex+2).attr("checked",'true');
                        $(".correct-status-div").eq(cindex+1).find('select[name=status]').val(statusArr[cindex+commcount]);
                        $(".correct-status-div").eq(cindex+1).find('select[name=status]').trigger('chosen:updated');
                    }
                }

            }
        }
    }
};

ReguConfig.initLocation = function () {
    ReguConfig.chosenInit(ReguConfigData.locationMap,"location-method-div","location-method_select",1);
    var list = ReguConfigUtil.getList(2,1);
    if(list.length>0){
        var location = list[0];
        var id = location.id;
        $("#location-regu-div").find("input[name=id]").val(id);
        var locationState = location.froms;
        $(".location-status-div").find('select[name=status]').val(locationState);
        $(".location-status-div").find('select[name=status]').trigger('chosen:updated');
        var methods = location.methods.split(",");
        for (var i = 0; i < methods.length; i++) {
            $(".location-method-div").eq(i).find('select[name=status]').val(methods[i]);
            $(".location-method-div").eq(i).find('select[name=status]').trigger('chosen:updated');
        }
    }else{
        $(".location-status-div").find('select[name=status]').val([]);
        $(".location-status-div").find('select[name=status]').trigger('chosen:updated');
    }
};

ReguConfig.initInterrupt = function () {

    if(!ReguConfig.interruptIsInit){
        ReguConfig.basic_slider = document.getElementById('basic_slider');
        noUiSlider.create(ReguConfig.basic_slider, {
            start: 0,
            connect: [true, false],
            step: 5,
            range: {
                'min': 0,
                'max': 100
            }
        });

        ReguConfig.basic_slider.noUiSlider.on('update', function( values, handle ){
            $("#interrupt-per-div").html(parseInt(values[handle])+"%");
        });
    }else{
        ReguConfig.basic_slider.noUiSlider.set(0);
    }

    ReguConfig.interruptIsInit=true;
};

ReguConfig.chosenInit  = function (map,clsp,cls,max,placeholder){
    $("."+clsp).html('<select multiple="multiple" class="'+cls+'"  class="chosen-select" name="status"  ></select>');

    $("."+cls).html('');
    for(var key in map){
        $("."+cls).append('<option value="'+map[key]+'">'+key+'</option>');
    }

    $("."+cls).chosen({
        no_results_text: "没有状态",
        placeholder_text : placeholder?placeholder:"选择状态",
        search_contains: true,
        disable_search_threshold: 10,
        max_selected_options:max?max:"Infinity",
        width:"100%"
    });
};


ReguConfig.initEmoTrans= function () {
    $.ajax({
        url:"/sentiment/getListByRid",
        data:{rid:Wizard.rid},
        success:function (d) {
            var sentilist = d.obj;

            var sentimap={};
            for (var i = 0; i < sentilist.length; i++) {
                var obj = sentilist[i];
                sentimap[obj]= obj;
            }
            ReguConfig.chosenInit(sentimap,"emotrans-sentiment-div","emotrans_sentiment_select",1);
        }
    })
};
ReguConfig.initSet=function () {
    $.ajax({
        url:"/interruptdetail/getListByRidAndTypes",
        data:{rid:Wizard.rid,types:'Q,D'},
        success:function (d) {
            var qdlist = d.obj;
            var qdmap={"所有":"all"};
            var qdmap1={};
            $(qdlist).each(function () {
                qdmap[this.sname]= this.sname;
                qdmap1[this.sname+'：'+this.sdesc]= this.sname;
            });
            ReguConfig.chosenInit(qdmap,"set-qd-method-div","set_qd_method_select");
            ReguConfig.chosenInit(qdmap1,"set-qd-method-div-1","set_qd_method_select_1",1);
        }
    });
    var stateMap1=ReguConfig.getStateinfoMap();
    var stateMap ={"所有":"all"};
    for(var key in stateMap1){
        stateMap[key]=key;
    }

    ReguConfig.chosenInit(stateMap,"set-status-div-1","set_status_select_1");

    $("#set-regu-div").find("select[name=type]").change(function () {
        var type = $(this).val();
        $(".set-regu-type-div").addClass("hide");
        $(".set-regu-type-div").eq(type).removeClass("hide");
    })
};

ReguConfig.refreshSimpleSelect = function () {
    ReguConfig.chosenInit(ReguConfigData.timesMap,"match-times-div","match_times_select",1);
    ReguConfig.chosenInit(ReguConfigData.timesMap1,"deny-times-div","deny_times_select",1);
    ReguConfig.chosenInit(ReguConfigData.methodMap,"set-method-div","set_method_select",1);
};
ReguConfig.refreshAllTable = function () {
    var tableOptions = ReguConfigData.tableOptions;
    for(var key in tableOptions){
        ReguConfigUtil.refreshTable(tableOptions[key]);
    }
};

ReguConfig.showlist = function () {
    TriggerLineSet.init(Wizard.rid);
    $("#sets-upload-form").find("input[name=rid]").val(Wizard.rid);
    $("#setGridModal").modal();
};

ReguConfig.addMoodEn = function () {
    var id =$("#mood-regu-div").find("input[name=id]").val();

    var values =$("#mood-regu-div").find("select[name=status]").val();
    if(values.length==0){
        info("请选择至少一个跳转");
        return;
    }
    var froms=[];
    var tos=[];
    for(var i =0;i<values.length;i++){
        var value =values[i];
        var arr = value.split(",");
        froms.push(arr[0]);
        tos.push(arr[1]);
    }

    var data = {
        id:id?id:null,
        rid:Wizard.rid,
        froms:froms.join(","),
        tos:tos.join(","),
        name:'mood-en',
        type:1,
        rtype:0
    };
    id =  ReguConfig.add(data);
    $("#mood-regu-div").find("input[name=id]").val(id);
    success("更新成功！！");
};

ReguConfig.addSetRe = function () {
    var type =$("#set-regu-div").find("select[name=type]").val();
    if(type==0){
        ReguConfig.addStateSetRe();
    }else{
        ReguConfig.addQDSetRe();
    }
};


ReguConfig.showTriggerLineSet = function (btn) {
    var id = $(btn).siblings('input').eq(0).val();
    var config=null;
    $.ajax({
        url:"/regulation/config/getById",
        async:false,
        data:{
            id:id
        },
        success:function (d) {
            config = d.obj;
        }
    });
    TriggerLineSet.show(config.setids);
};

ReguConfig.addStateSetRe = function () {
    var name =$("#set-regu-div").find("input[name=name]").val();
    var selectData = ["","","","",""];
    $(".set-regu-type-div").eq(0).find("select[name=status]").each(function (n) {
        if(n<4){
            var obj = $(this).val()[0];
            if(obj){
                selectData[n]=obj;
            }
        }else{
            var qds = $(this).val();
            if(qds.length>0){
                selectData[n]=qds.join(",");
            }
        }

    });
    if(name==""){
        info("名称不能为空");
        return;
    }
    if(selectData[0]==""||selectData[1]==""||selectData[2]==""){
        info("from、to状态和方法都必须设置");
        return;
    }
    if(selectData[2]=="forward"&&selectData[3]==""){
        info("包含方式必须设置集合");
        return;
    }

    if(selectData[4]!=""&&selectData[4].indexOf("all")!=-1&&selectData[4]!="all"){
        info("直跳排除选中all就不能选其他项了");
        return;
    }
    var data = {
        name:name,
        value:0,
        froms : selectData[0],
        tos : selectData[1],
        methods : selectData[2],
        setids : selectData[3],
        memo : selectData[4],
        rid:Wizard.rid,
        type:1,
        rtype:1
    };
    if(data.froms==data.tos){
        info("from、to状态不能相同");
        return;
    }
    ReguConfig.add(data);
    ReguConfigUtil.refreshTable(ReguConfigData.tableOptions.set);
    $("#set-regu-div").find("input[name=name]").val("");
    $(".set-regu-type-div").eq(0).find("select[name=status]").each(function () {
        $(this).val([]);
        $(this).trigger('chosen:updated');
    });
    success("增加规则成功！！");
};
ReguConfig.addQDSetRe = function () {
    var name =$("#set-regu-div").find("input[name=name]").val();
    var selectData = ["","",""];
    $(".set-regu-type-div").eq(1).find("select[name=status]").each(function (n) {
        if(n<2){
            var obj = $(this).val()[0];
            if(obj){
                selectData[n]=obj;
            }
        }else{
            var qds = $(this).val();
            if(qds.length>0){
                selectData[n]=qds.join(",");
            }
        }

    });
    if(name==""){
        info("名称不能为空");
        return;
    }
    if(selectData[0]==""||selectData[1]==""||selectData[2]==""){
        info("Q&D、集合和适用状态都必须设置");
        return;
    }
    if(selectData[2]!=""&&selectData[2].indexOf("all")!=-1&&selectData[2]!="all"){
        info("适用状态选中all就不能选其他项了");
        return;
    }
    var data = {
        name:name,
        value:1,
        froms : selectData[2],
        tos : selectData[0],
        methods : "forward",
        setids : selectData[1],
        rid:Wizard.rid,
        type:1,
        rtype:1
    };
    if(data.froms==data.tos){
        info("from、to状态不能相同");
        return;
    }
    ReguConfig.add(data);
    ReguConfigUtil.refreshTable(ReguConfigData.tableOptions.set);
    $("#set-regu-div").find("input[name=name]").val("");
    $(".set-regu-type-div").eq(0).find("select[name=status]").each(function () {
        $(this).val([]);
        $(this).trigger('chosen:updated');
    });
    success("增加规则成功！！");
};

ReguConfig.addNumHelp = function () {
    swal({
        title:  null ,
        text: ReguConfigData.numHelpHtml,
        showConfirmButton:true,
        html: true
    });
};

ReguConfig.addNumRe = function () {
    var name =$("#num-regu-div").find("input[name=name]").val();
    name =$.trim(name);
    if(name==""){
        info("名称不能为空");
        return;
    }
    var lower =$("#num-regu-div").find("input[name=lower]").val();
    lower =$.trim(lower);
    if(lower==""){
        info("下限不能为空");
        return;
    }
    var upper =$("#num-regu-div").find("input[name=upper]").val();
    upper =$.trim(upper);
    if(upper==""){
        info("上限不能为空");
        return;
    }
    if(parseInt(lower)>=parseInt(upper)){
        info("下限必须小于上限");
        return;
    }
    var unit =$("#num-regu-div").find("input[name=unit]").val();
    unit =$.trim(unit);
    if(unit==""){
        info("单位不能为空");
        return;
    }
    var inkeyword =$("#num-regu-div").find("input[name=inkeyword]").val();
    inkeyword =$.trim(inkeyword);
    var outkeyword =$("#num-regu-div").find("input[name=outkeyword]").val();
    outkeyword =$.trim(outkeyword);
    if(inkeyword==""&&outkeyword==""){
        info("区间内外关键词至少配置一项");
        return;
    }
    var reverse =$("#num-regu-div").find("input[name=reverse]").is(":checked");
    var needunit =$("#num-regu-div").find("input[name=needunit]").is(":checked");
    var values =[];
    $("#num-regu-div").find("select[name=status]").each(function () {
        var str = $(this).val().join(",");
        if(str!=""){
            values.push(str);
        }

    });
    if(values.length<3){
        info("from、to（区间内、区间外）状态都必须设置");
        return;
    }
    var tos = values[1]+","+values[2];
    var reverseStr = "";
    var keywordStr ="";
    if(inkeyword!=""&&outkeyword!=""){
        reverseStr = reverse?"1^0":"0^1";
        keywordStr = reverse?(outkeyword+"^"+inkeyword):(inkeyword+"^"+outkeyword);
    }else if(inkeyword!=""){
        reverseStr = "0";
        keywordStr = inkeyword;
    }else if(outkeyword!=""){
        reverseStr = "1";
        keywordStr = outkeyword;
    }

    var data = {
        name:name,
        froms : values[0],
        tos : tos,
        methods : lower+"||"+upper+"||"+reverseStr+"||"+(needunit?1:0),
        setids : unit+"||"+keywordStr,
        rid:Wizard.rid,
        type:1,
        rtype:2

    };

    if( data.tos.indexOf(data.froms)!=-1 ){
        info("from、to状态不能重复");
        return;
    }

    ReguConfig.add(data);
    ReguConfigUtil.refreshTable(ReguConfigData.tableOptions.num);
    $("#num-regu-div").find("input[type=text]").val("");
    $("#num-regu-div").find("input[type=number]").val("");
    $("#num-regu-div").find("input[name=tos]").val("");
    $("#num-regu-div").find("input[name=needunit]").prop("checked",false);
    $("#num-regu-div").find("input[name=reverse]").prop("checked",false);
    $("#num-regu-div").find("select[name=status]").each(function () {
        $(this).val([]);
        $(this).trigger('chosen:updated');
    });
    success("增加规则成功！！");
};

ReguConfig.addMatchRe = function () {
    var values =[];
    $("#match-regu-div").find("select[name=status]").each(function () {
        var obj = $(this).val()[0];
        if(obj){
            values.push(obj);
        }

    });

    if(values.length<3){
        info("from、to状态和次数都必须设置");
        return;
    }

    var data = {
        name:'match('+values[0]+','+values[1]+')-'+values[2],
        froms : values[0],
        tos : values[1],
        times : values[2],
        rid:Wizard.rid,
        type:1,
        rtype:3

    };
    if( data.froms ==data.tos ){
        info("from、to状态不能重复");
        return;
    }
    ReguConfig.add(data);
    ReguConfigUtil.refreshTable(ReguConfigData.tableOptions.match);
    $("#match-regu-div").find("input[type=text]").val("");
    $("#match-regu-div").find("select[name=status]").each(function () {
        $(this).val([]);
        $(this).trigger('chosen:updated');
    });
    success("增加规则成功！！");
};
ReguConfig.addAbnormalConfigs = function () {
    var tos = $("#abnormal-regu-div").find("input[name=tos]").val();
    tos= tos.trim();
    if(tos==undefined||tos==""){
        info("自定义话术不能为空");
        return;
    }

    if(! /^[0-9a-zA-Z]+$/.test(tos)){
        info("自定义话术只能是字母数字组合");
        return;
    }

    $.ajax({
        url:"/regulation/config/addAbnormalConfigs",
        async:false,
        data:{rid:Wizard.rid,tos:tos},
        success:function (d) {
        }
    });

    ReguConfigUtil.refreshTable(ReguConfigData.tableOptions.abnormal);
    $("#abnormal-regu-div").find("input[name=tos]").val("");
    success("批量生成成功！！");
};

ReguConfig.addNotHear = function () {
    var id = $("#nothear-regu-div").find("input[name=id]").val();
    var zjtype = ($("#nothear-regu-div").find('input:checkbox').is(':checked'))?1:0;
    var values =[];
    $("#nothear-regu-div").find("select[name=status]").each(function () {
        var obj = $(this).val()[0];
        if(obj){
            values.push(obj);
        }

    });

    if(values.length<1){
        info("结束状态必须设置");
        return;
    }

    var data = {
        id:id?id:null,
        name:'nothear',
        froms : values[0],
        tos:zjtype,
        rid:Wizard.rid,
        type:1,
        rtype:4

    };
    if( data.froms ==data.tos ){
        info("from、to状态不能重复");
        return;
    }
    id = ReguConfig.add(data);
    $("#nothear-regu-div").find("input[name=id]").val(id);
    success("增加规则成功！！");
};

ReguConfig.addDenyConfigs = function () {
    var values =[];
    $("#deny-regu-div").find("select[name=status]").each(function () {
        var obj = $(this).val()[0];
        if(obj){
            values.push(obj);
        }
    });
    if(values.length<2){
        info("结束状态和次数都必须设置");
        return;
    }
    var params = {
        end : values[0],
        time : values[1],
        rid:Wizard.rid
    };
    $.ajax({
        url:"/regulation/config/addDenyConfigs",
        async:false,
        data:params,
        success:function (d) {
        }
    });

    ReguConfigUtil.refreshTable(ReguConfigData.tableOptions.deny);
    $("#match-regu-div").find("input[type=text]").val("");
    $("#match-regu-div").find("select[name=status]").each(function () {
        $(this).val([]);
        $(this).trigger('chosen:updated');
    });
    success("批量生成成功！！");
};

ReguConfig.addEmotransConfigs = function () {
    var values =[];
    $("#emotrans-regu-div").find("select[name=status]").each(function () {
        var obj = $(this).val()[0];
        if(obj){
            values.push(obj);
        }
    });
    if(values.length<3){
        info("状态、转换前和转换后都必须设置");
        return;
    }

    var data = {
        name:'emo::'+values[0]+'=>'+values[1],
        value:values[0],
        froms:values[1],
        tos:values[2],
        rid:Wizard.rid,
        type:1,
        rtype:6
    };
    if( data.froms ==data.tos ){
        info("转换前和转换后必须不同");
        return;
    }
    ReguConfig.add(data);
    ReguConfigUtil.refreshTable(ReguConfigData.tableOptions.emotrans);
    $("#emotrans-regu-div").find("select[name=status]").each(function () {
        $(this).val([]);
        $(this).trigger('chosen:updated');
    });
    success("增加规则成功！！");
};

ReguConfig.addRelatedConfigs = function () {
    var values =[];
    $("#related-regu-div").find("select[name=status]").each(function () {
        var obj = $(this).val()[0];
        if(obj){
            values.push(obj);
        }
    });
    if(values.length<2){
        info("状态、转换前和转换后都必须设置");
        return;
    }

    var data = {
        name:'related::'+values[0]+'=>'+values[1],
        froms:values[0],
        tos:values[1],
        rid:Wizard.rid,
        type:1,
        rtype:7
    };
    if( data.froms ==data.tos ){
        info("from和to必须不同");
        return;
    }
    ReguConfig.add(data);
    ReguConfigUtil.refreshTable(ReguConfigData.tableOptions.related);
    $("#related-regu-div").find("select[name=status]").each(function () {
        $(this).val([]);
        $(this).trigger('chosen:updated');
    });
    success("增加规则成功！！");
};

ReguConfig.addCorrectLine = function () {
    var id = $("#correct-regu-div").find("input[name=id]").val();
    var correct_line=[];
    var correct_line_name=[];
    var froms = [];
    $("#correct-regu-div").find('input:checkbox').each(function () {
        if ($(this).is(':checked')) {
            var action = $(this).val();
            var action_name = $(this).parent().siblings("div").html().trim();
            correct_line.push(action);
            if(action!="translate" ){
                correct_line_name.push(action_name);
                $(this).parent().siblings(".correct-status-div").find("select[name=status]").each(function () {
                    var obj = $(this).val()[0];
                    if(obj){
                        froms.push(obj);
                    }
                });
            }
        }
    });

    if(correct_line.length==0){
        info("未选中任何模块");
        return;
    }

    if(correct_line.length==1){
        var action = correct_line[0];
        if(action!="translate"){
            info("纠错模块必须包含通用模块");
            return;
        }
    }

    if(correct_line.length>1){
        var len =0;
        for (var i=0;i<correct_line.length;i++){
            if(correct_line[i]!="translate"){
                len++;
            }
        }
        if(len!=froms.length){
            info("非通用模块必须设置适用状态");
            return;
        }

    }

    var data = {
        id:id?id:null,
        name:'correct_line',
        value:correct_line.join(","),
        froms : (froms.length>0?froms.join(","):null),
        tos:(correct_line_name.length>0?correct_line_name.join(","):null),
        rid:Wizard.rid,
        type:2,
        rtype:0
    };
    id =  ReguConfig.add(data);
    $("#correct-regu-div").find("input[name=id]").val(id);
    success("更新成功！！");

};

ReguConfig.addLocationStatus = function () {
    var id = $("#location-regu-div").find("input[name=id]").val();
    var values =[];
    $("#location-regu-div").find("select[name=status]").each(function () {
        var obj = $(this).val()[0];
        if(obj){
            values.push(obj);
        }
    });
    if(values.length!=4){
        info("请设置适用状态和跳转规则");
        return;
    }
    var hasState = false;
    var methods=[];
    for (var i = 1; i < values.length; i++) {
        methods.push(values[i]);
        if(values[i]==0){
            hasState = true;
        }
    }
    if(!hasState){
        info("跳转规则至少包含一个状态类型");
        return;
    }

    var data = {
        id:id?id:null,
        name:'location',
        froms : values[0],
        methods:methods.join(","),
        rid:Wizard.rid,
        type:2,
        rtype:1

    };
    id = ReguConfig.add(data);
    $("#location-regu-div").find("input[name=id]").val(id);
    success("更新规则成功！！");

};

ReguConfig.delLocationStatus = function () {
    var id = $("#location-regu-div").find("input[name=id]").val();
    warning("确定删除吗", "", function () {
        $.get("/regulation/config/delete?id=" + id, function (d) {
            if(d.obj==0){
                success("删除成功");
                ReguConfig.initLocation();
            }else{
                info("删除失败");
            }

        });
    })
};

ReguConfig.addInterruptConfig = function () {
    var froms =null;
    $("#interrupt-regu-div").find("select[name=status]").each(function () {
        var obj = $(this).val()[0];
        if(obj){
            froms = obj;
        }
    });
    if(!froms){
        info("请设置适用状态");
        return;
    }
    var value = $("#interrupt-per-div").text();
    var data = {
        name:'interrupt-'+froms,
        froms : froms,
        value : "0."+value.replace(/%/,""),
        rid:Wizard.rid,
        type:2,
        rtype:2
    };
    ReguConfig.add(data);
    ReguConfigUtil.refreshTable(ReguConfigData.tableOptions.interrupt);

    success("更新规则成功！！");

};

ReguConfig.add = function (data) {
    var res=null;
    $.ajax({
        url:"/regulation/config/addRegulationConfig",
        async:false,
        data:data,
        success:function (d) {
            res = d.obj;
        }
    });
    return res;
};

ReguConfig.getStateinfoMap = function () {
    var stateMap=null;
    $.ajax({
        url:"/stateinfo/map",
        async:false,
        data:{
            rid:Wizard.rid
        },
        success:function (d) {
            stateMap = d.obj;
        }
    });
    return stateMap;
};

ReguConfig.delRe = function (btn) {
    var id = $(btn).siblings('input').eq(0).val();
    var type = $(btn).siblings('input').eq(1).val();
    warning("确定删除吗", "", function () {
        $.get("/regulation/config/delete?id=" + id, function (d) {

            if(d.obj==0){
                success("删除成功");
                ReguConfigUtil.refreshTable(ReguConfigData.tableOptions[type]);

            }else{
                info("删除失败");
            }

        });
    })
};

ReguConfig.changeTime = function (btn) {
    var id = $(btn).siblings('input').eq(0).val();
    var type = $(btn).siblings('input').eq(1).val();
    $.get("/regulation/config/changetime?id=" + id, function (d) {
        if(d.obj==0){
            ReguConfigUtil.refreshTable(ReguConfigData.tableOptions[type]);
        }
    });
};

ReguConfig.configSpeech = function (id,time,btn) {
    if(time<2) {
        info("次数2次以下的无法配置");
        return;
    }
    var config=null;
    $.ajax({
        url:"/regulation/config/getById",
        async:false,
        data:{
            id:id
        },
        success:function (d) {
            config = d.obj;
        }
    });
    var speeches =[];
    for(i=1;i<time;i++){
        speeches.push("");
    }
    var arr =[];
    if(config.tos!=null&&config.tos!=""){
        arr = config.tos.split(",");
    }

    for(i=0;i<arr.length;i++){
        speeches[i]=(arr[i]=='default'?'':arr[i]);
    }

    var setids =[];
    if(config.setids!=null&&config.setids!=""){
        setids = config.setids.split(",");
    }
    var value =config.value;

    var html =
        "<form class=\"form-horizontal\" id=\"config-speech-form\" style='text-align: left;'>\n" +
        "                    <input type=\"hidden\"  name=\"rid\">\n" +
        "                    <input type=\"hidden\"  name=\"sid\">\n" +
        "                    <input type=\"hidden\"  name=\"zjtype\">\n" +
        "                    <input type=\"hidden\"  name=\"name\">\n" ;
        for(var i=1;i<time;i++){
            html+="          <div class=\"form-group\">\n" +
        "                        <label class=\"col-sm-2 control-label\" style='margin-top: 7px;' >话术"+i+"</label>\n" +
        "                        <div class=\"col-sm-3\">\n" +
        "                            <div class=\"textarea no-padding\" style='text-align: left;margin-top: 7px;'>\n" +
        "                                <textarea name=\"content\" style=\"resize:none;width: 80%;height:34px;line-height: 28px;vertical-align:middle; border: 1px solid #e5e6e7;border-radius: 1px;\" >"+speeches[i-1]+"</textarea>&nbsp;" +
        "                            </div>\n" +
        "                        </div>\n" +
        "                        <div class=\"col-sm-2 width-30 no-padding\" style='margin-top: 7px;'>\n" +
        "                           <input type=\"checkbox\" name=\"setid\"  style=\"display:block;width: 20px;height: 20px;\">\n" +
        "                        </div>"+
        "                         <label class=\"col-sm-3 control-label no-padding\" style='margin-top: 14px;text-align: left;margin-left: 1.5%;' >不合并Zx-1</label>\n" +
        "                        </div>"+
        "                    </div>\n" ;
        }
        if(config.methods=="w"){
            html+="          <div class=\"form-group\">\n" +
        "                        <label class=\"col-sm-2 control-label\" >语气词转换 </label>\n" +
        "                        <div class=\"col-sm-2 width-30\" style='margin-top: 7px;'>\n" +
        "                           <input type=\"checkbox\" name=\"value\"  style=\"display:block;width: 20px;height: 20px;\">\n" +
        "                        </div>"+
        "                    </div>\n" ;
        }

        html+="              <div class=\"form-group\">\n" +
        "                        <label class=\"col-sm-2 control-label\"></label>\n" +
        "                        <div class=\"col-sm-10\">\n" +
        "                             <div type=\"button\" class=\"btn btn-sm btn-primary\">提交</div>&nbsp;&nbsp;&nbsp;"+
        "                             <div type=\"button\" class=\"btn btn-sm btn-default\" >取消</div>"+
        "                        </div>\n" +
        "                    </div>\n" +
        "                </form>";
    swal({
        title:  null ,
        text: html,
        showConfirmButton:false,
        html: true
    });
    $("#config-speech-form").find("input[name=setid]").each(function (n) {
        $(this).prop("checked",setids[n]==1);
    });
    $("#config-speech-form").find("input[name=value]").prop("checked",value==1);

    $("#config-speech-form").find("div.btn").eq(0).click(function () {

        var speechArr =[];
        $("#config-speech-form").find("textarea").each(function () {
            var val = $(this).val().trim();
            val=(val==""?"default":val);
            if(val=="default"){
                speechArr.push(val);
            }else if(/^[0-9a-zA-Z]{1,4}$/g.test(val)){
                speechArr.push(val);
            }

        });
        if(speechArr.length<(time-1)){
            info("话术名字必须是1-3位字母数字组合");
            return;
        }
        var setidArr=[];
        $("#config-speech-form").find("input[name=setid]").each(function () {
            setidArr.push($(this).is(":checked")?1:0);
        });
        var val = $("#config-speech-form").find("input[name=value]").is(":checked")?1:0;

        $.ajax({
            url:"/regulation/config/update",
            async:false,
            data:{
                id:id,
                tos:speechArr.join(","),
                setids:setidArr.join(","),
                value:val
            },
            success:function (d) {
                success("更新成功");
            }
        });

    });
    $("#config-speech-form").find("div.btn").eq(1).click(function () {
        swal.close();
    });
};

ReguConfig.showConfigRelated = function (btn) {
    var id = $(btn).siblings('input').eq(0).val();
    $("#related-condition-form").find("input[name=id]").val(id);
    var stateMap=ReguConfig.getStateinfoMap();
    for(var key in stateMap){
        stateMap[key]=key;
    }
    ReguConfig.chosenInit(stateMap,"related-condition-status-div","related_condition_status_select",1);
    $.ajax({
        url:"/sentiment/getListByRid",
        data:{rid:Wizard.rid},
        success:function (d) {
            var sentilist = d.obj;

            var sentimap={};
            for (var i = 0; i < sentilist.length; i++) {
                var obj = sentilist[i];
                sentimap[obj]= obj;
            }
            ReguConfig.chosenInit(sentimap,"related-sentiment-div","related_sentiment_select",1);
        }
    });
    ReguConfig.renderRelatedConditionTable();
    $("#relatedGridModal").modal();
};
ReguConfig.addRelatedCondition = function () {

    var id = $("#related-condition-form").find("input[name=id]").val();
    var values =[];
    $("#related-condition-form").find("select[name=status]").each(function () {
        var obj = $(this).val()[0];
        if(obj){
            values.push(obj);
        }
    });
    if(values.length<2){
        info("状态和情感都必须配置！");
        return;
    }
    $.ajax({
        url:"/regulation/config/addRelatedCondition",
        data:{id:id,status:values[0],senti:values[1]},
        success:function () {
            ReguConfig.renderRelatedConditionTable();
        }
    });

};
ReguConfig.delRelatedCondition = function (btn) {

    var id = $("#related-condition-form").find("input[name=id]").val();
    var oid = $(btn).siblings('input').eq(0).val();
    $.ajax({
        url:"/regulation/config/delRelatedCondition",
        data:{id:id,oid:oid},
        success:function () {
            ReguConfig.renderRelatedConditionTable();
        }
    });

};
ReguConfig.renderRelatedConditionTable = function () {
    ReguConfigUtil.refreshTable(ReguConfigData.tableOptions.related);
    var id = $("#related-condition-form").find("input[name=id]").val();
    $.ajax({
        url:"/regulation/config/getRelatedConditions",
        data:{id:id},
        success:function (d) {
            var list = d.obj;
            var tbody = $("#relatedGridModal").find("tbody");
            tbody.html('');
            if(list.length>0){
                for (var i = 0; i < list.length; i++) {
                    var oid = list[i].oid;
                    var status = list[i].status;
                    var senti = list[i].senti;
                    tbody.append('<tr><td>'+status+'</td><td>'+senti+'</td><td><input type="hidden" value="'+oid+'"/><button class="btn btn-xs btn-danger" onclick="ReguConfig.delRelatedCondition(this)">删除</button>&nbsp;&nbsp;</td></tr>');
                }
            }
        }
    });
    $("#related-condition-form").find("select[name=status]").each(function () {
        $(this).val([]);
        $(this).trigger('chosen:updated');
    });

};


ReguConfig.changeLevel = function (btn,tab) {
    var id = $(btn).siblings('input').eq(0).val();
    var config=null;
    $.ajax({
        url:"/regulation/config/getById",
        async:false,
        data:{
            id:id
        },
        success:function (d) {
            config = d.obj;
        }
    });
    var level = config.times;
    swal({
            title: "设置优先级",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: "优先级",
            inputValue:level
        },
        function(inputValue){

            if(inputValue==""||inputValue==undefined){
                swal.showInputError("优先级不能为空");
                return false;
            }
            if(isNaN(inputValue)){
                swal.showInputError("优先级必须是数字");
                return false;
            }
            if(inputValue<=0){
                swal.showInputError("优先级必须是正整数");
                return false;
            }
            if(inputValue>100){
                swal.showInputError("优先级不能超过100");
                return false;
            }

            $.ajax({
                url:"/regulation/config/update",
                async:false,
                data:{
                    id:id,
                    times:inputValue
                },
                success:function (d) {
                    success("更新成功");
                    var tt =tab==1?ReguConfigData.tableOptions.set:ReguConfigData.tableOptions.num;
                    ReguConfigUtil.refreshTable(tt);
                }
            });
        });

};

ReguConfig.editAbnormalRe = function (btn) {
    var config=null;
    var id = $(btn).siblings('input').eq(0).val();
    $.ajax({
        url:"/regulation/config/getById",
        async:false,
        data:{
            id:id
        },
        success:function (d) {
            config = d.obj;
        }
    });
    var tos =config.tos;
    var methods =config.methods;

    var html =
        "<form class=\"form-horizontal\" id=\"config-abnormal-form\" style='text-align: left;'>\n" +
        "   <div class=\"form-group\">\n" +
        "       <label class=\"col-sm-3 control-label\" style='margin-top: 7px;' >自定义话术</label>\n" +
        "       <div class=\"col-sm-6\">\n" +
        "           <div class=\"textarea no-padding\" style='text-align: left;margin-top: 7px;'>\n" +
        "               <textarea name=\"tos\" style=\"resize:none;width: 80%;height:34px;line-height: 28px;vertical-align:middle; border: 1px solid #e5e6e7;border-radius: 1px;\" >"+tos+"</textarea>&nbsp;" +
        "           </div>\n" +
    "           </div>\n" +
        "   </div>\n" +
        "   <div class=\"form-group\">\n" +
        "       <label class=\"col-sm-3 control-label\" style='margin-top: 7px;' >默认挽回</label>\n" +
        "       <div class=\"col-sm-2 width-30\" style='margin-top: 7px;'>\n" +
        "           <input type=\"checkbox\" name=\"methods\"  style=\"display:block;width: 20px;height: 20px;\">\n" +
        "       </div>"+
        "   </div>\n" +
        "   <div class=\"form-group\">\n" +
        "       <label class=\"col-sm-2 control-label\"></label>\n" +
        "       <div class=\"col-sm-10\">\n" +
        "           <div type=\"button\" class=\"btn btn-sm btn-primary\">提交</div>&nbsp;&nbsp;&nbsp;"+
        "           <div type=\"button\" class=\"btn btn-sm btn-default\" >取消</div>"+
        "       </div>\n" +
        "   </div>\n" +
        "</form>";
    swal({
        title:  null ,
        text: html,
        showConfirmButton:false,
        html: true
    });
    $("#config-abnormal-form").find("input[name=methods]").prop("checked",methods==1);


    $("#config-abnormal-form").find("div.btn").eq(0).click(function () {

        var tos = $("#config-abnormal-form").find("textarea").val();
        var methods = $("#config-abnormal-form").find("input[name=methods]").is(":checked")?"1":"0";
        tos= tos.trim();
        if(tos==undefined||tos==""){
            info("自定义话术不能为空");
            return;
        }

        $.ajax({
            url:"/regulation/config/update",
            async:false,
            data:{
                id:id,
                tos:tos,
                methods:methods
            },
            success:function (d) {
                ReguConfigUtil.refreshTable(ReguConfigData.tableOptions['abnormal']);
                success("更新成功");
            }
        });

    });
    $("#config-abnormal-form").find("div.btn").eq(1).click(function () {
        swal.close();
    });
};

ReguConfig.initInRule = function () {
    warning("该操作会重置规则，确定初始化吗？", "", function () {
        $.get("/inrule/init?rid=" + Wizard.rid, function (d) {
            if(d.obj===0){
                success("重置成功！");
            }else{
                info("初始化失败！");
            }

        });
    })
};
