var ReguConfigData={

    statusDivs:["set-status-div,set_status_select,1","num-status-div,num_status_select,1","num-to-status-div-1,num_to_status_select_1,1,区间外","num-to-status-div-2,num_to_status_select_2,1,区间内",
        "match-status-div,match_status_select,1","deny-status-div,deny_status_select,1","nothear-status-div,nothear_status_select,1",
        "location-status-div,location_status_select,1","interrupt-status-div,interrupt_status_select,1",
        "emotrans-status-div,emotrans_status_select,1","related-status-div,related_status_select,1"
    ],

    locationMap:{"状态":"0","复述":"1"},
    timesMap:{"1":"1","2":"2"},
    timesMap1:{"-1":"-1","1":"1","2":"2"},
    methodMap:{"包含":"forward","直接跳转":"directly"},
    methodReverseMap:{"forward":"包含","directly":"直接跳转"},
    numHelpHtml:"<table class=\"table table-bordered table-hover\" style=\"width: 100%;margin-top: 10px;\">\n" +
    "            <thead>\n" +
    "                <tr><th>参数</th><th>值</th></tr>\n" +
    "            </thead>\n" +
    "            <tbody>" +
    "                <tr><td>from</td><td>Z2</td></tr>" +
    "                <tr><td>to</td><td>Z3,Z4</td></tr>" +
    "                <tr><td>上下限</td><td>5,10</td></tr>" +
    "                <tr><td>单位</td><td>岁</td></tr>" +
    "                <tr><td>关键词</td><td>半岁</td></tr>" +
    "                <tr><td>关键词反向</td><td>false</td></tr>" +
    "                <tr><td>意义</td><td>1、(0,5)∪(10,∞)岁跳转到Z3 <br/> 2、[5,10]岁跳转到Z4 <br/> 3、关键词“半岁”会跳转到to中的第一个状态(这里是Z3，如果勾选关键词反向则会跳转到to中的第二个状态，就是Z4)</td></tr>" +
    "            </tbody>\n" +
    "        </table>",
    tableOptions:{
        set:{
            tableId:"set-regu-div",
            listType:[1,1],
            columnType:"set",
            cols:[
                {index:'name'},
                {index:'value',formatter:function (val) {
                    if(!val.value){
                        return "状态跳转";
                    }
                    return val.value==0?"状态跳转":"情感转换";
                }},
                {index:'froms'},
                {index:'tos',formatter:function (val) {
                    return val.tos=='all'?"所有":val.tos;
                }},
                {index:'method',formatter:function (val) {
                    return ReguConfigData.methodReverseMap[val.methods];
                }},
                {index:'setnames'},
                {index:'memo',formatter:function (val) {
                    if(val.memo){
                        return val.memo=='all'?"所有":val.memo;
                    }else{
                        return "";
                    }
                }},
                {index:'times'}
            ],
            buttons:[
                {class:'btn-danger',opt:'ReguConfig.delRe(this)',text:'删除'},
                {class:'btn-warning',opt:'ReguConfig.changeLevel(this,1)',text:'优先级'},
                {class:'btn-info',opt:'ReguConfig.showTriggerLineSet(this)',text:'集合'}
            ]
        },
        num:{
            tableId:"num-regu-div",
            listType:[1,2],
            columnType:"num",
            cols:[
                {index:'name'},
                {index:'froms'},
                {index:'tos',formatter:function (val) {
                    var arr = val.tos.split(",");
                    return "区间外："+arr[0]+"，区间内："+arr[1];
                }},
                {index:'method0',formatter:function (val) {
                    return val.methods.split("||")[0];
                }},
                {index:'method1',formatter:function (val) {
                    return val.methods.split("||")[1];
                }},
                {index:'set0',formatter:function (val) {
                    return val.setids.split("||")[0];
                }},
                {index:'method3',formatter:function (val) {
                    var methods =val.methods.split("||");
                    if(methods.length>3){
                        return (methods[3]==1?'必须':'非必须');
                    }else{
                        return '必须';
                    }
                }},
                {index:'set1',formatter:function (val) {
                    var keyword = val.setids.split("||")[1];
                    var direction = val.methods.split("||")[2];
                    var keywordArr = keyword.split("^");
                    var directionArr = direction.split("^");
                    if(keywordArr.length==1){
                        return (directionArr[0]==0?"区间内：":"区间外：")+keywordArr[0];
                    }else{
                        return (directionArr[0]==0?"1、区间内：":"1、区间外：")+keywordArr[0]+"<br/>"+
                            (directionArr[1]==0?"2、区间内：":"2、区间外：")+keywordArr[1];
                    }

                }},
                {index:'times'}
            ],
            buttons:[
                {class:'btn-danger',opt:'ReguConfig.delRe(this)',text:'删除'},
                {class:'btn-warning',opt:'ReguConfig.changeLevel(this,2)',text:'优先级'}
            ]
        },
        match:{
            tableId:"match-regu-div",
            listType:[1,3],
            columnType:"match",
            cols:[
                {index:'name'},
                {index:'froms'},
                {index:'tos'},
                {index:'times'}
            ],
            buttons:[
                {class:'btn-danger',opt:'ReguConfig.delRe(this)',text:'删除'},
                {class:'btn-info',opt:'ReguConfig.changeTime(this)',text:'切换次数'}
            ]
        },
        abnormal:{
            tableId:"abnormal-regu-div",
            columnType:"abnormal",
            listType:[1,8],
            cols:[
                {index:'name'},
                {index:'froms'},
                {index:'tos'},
                {index:'methods',formatter:function (val) {
                    return val.methods=='0'?"自定义":"默认";
                }}
            ],
            buttons:[
                {class:'btn-danger',opt:'ReguConfig.delRe(this)',text:'删除'},
                {class:'btn-info',opt:'ReguConfig.editAbnormalRe(this)',text:'编辑'}
            ]
        },
        deny:{
            tableId:"deny-regu-div",
            listType:[1,5],
            columnType:"deny",
            cols:[
                {index:'name'},
                {index:'times'},
                {index:'memo',formatter:function (val) {
                    if(val['methods']=='t'){
                        return val['memo']?val['memo']:"all";
                    }else{
                        return val['memo']?val['memo']:("Z"+val['name'].substring(1));
                    }

                }},
                {index:'froms'},
                {index:'buttons',formatter:function (val) {
                    var buttons = [
                        {class:'btn-danger',opt:'ReguConfig.delRe(this)',text:'删除'},
                        {class:'btn-info',opt:'ReguConfig.changeTime(this)',text:'切换次数'},
                        {class:'btn-warning',opt:'ReguConfig.configSpeech('+val.id+','+val.times+',this)',text:'配置话术'}
                    ];
                    return ReguConfigUtil.renderButton(val['id'],"deny",buttons);
                }}
            ]
        },
        interrupt:{
            tableId:"interrupt-regu-div",
            listType:[2,2],
            columnType:"interrupt",
            cols:[
                {index:'name'},
                {index:'froms'},
                {index:'value'}
            ],
            buttons:[
                {class:'btn-danger',opt:'ReguConfig.delRe(this)',text:'删除'}
            ],
            complete:function () {
                ReguConfig.basic_slider.noUiSlider.set(0);
            }
        },
        emotrans:{
            tableId:"emotrans-regu-div",
            listType:[1,6],
            columnType:"emotrans",
            cols:[
                {index:'value'},
                {index:'froms'},
                {index:'tos'}
            ],
            buttons:[
                {class:'btn-danger',opt:'ReguConfig.delRe(this)',text:'删除'}
            ]
        },
        related:{
            tableId:"related-regu-div",
            listType:[1,7],
            columnType:"related",
            cols:[
                {index:'froms'},
                {index:'tos'},
                {index:'value',formatter:function (val) {
                    var list =eval(val.value);
                    var arr =[];
                    if((!list) || list.length==0) return "";
                    for (var i = 0; i < list.length; i++) {
                        var obj = list[i];
                        arr.push(obj.status+"-"+obj.senti);
                    }
                    return arr.join(",");
                }}
            ],
            buttons:[
                {class:'btn-info',opt:'ReguConfig.showConfigRelated(this)',text:'配置'},
                {class:'btn-danger',opt:'ReguConfig.delRe(this)',text:'删除'}
            ]
        }
    }

};

var ReguConfigUtil={
    getList : function (type,rtype) {
        var list=null;
        var data = {
            type:type,
            rtype:rtype,
            rid:Wizard.rid
        };
        $.ajax({
            url:"/regulation/config/get",
            async:false,
            data:data,
            success:function (d) {
                list = d.obj;
            }
        });
        return list;
    },
    refreshTable : function (options) {
        if(options.complete){
            options.complete();
        }
        var type = options.listType[0];
        var rtype = options.listType[1];
        var cols = options.cols;
        var columnType = options.columnType;
        var list =this.getList(type,rtype);
        var html="";

        for (var i = 0; i < list.length; i++) {
            var val = list[i];
            var textArr = [];
            for (var j = 0; j < cols.length; j++) {
                var col = cols[j];
                if(col.formatter){
                    textArr.push(col.formatter(val));
                }else{
                    textArr.push(val[col.index]?val[col.index]:"");
                }

            }
            html+=this.renderTr(textArr,val['id'],columnType,options.buttons);

        }
        $("#"+options.tableId).find("tbody").html(html);
    },
    renderTr : function (textArr,id,type,buttons) {
        if(id&&type&&buttons){
            textArr.push(this.renderButton(id,type,buttons));
        }
        var html ="<tr>";
        for (var i = 0; i < textArr.length; i++) {
            var val = textArr[i];
            html+=('<td>'+val+'</td>');
        }
        html+="</tr>";
        return html;
    },
    renderButton : function (id,type,buttonArr) {
        var html ='<input type="hidden" value="'+id+'"/><input type="hidden" value="'+type+'"/>';
        for (var i = 0; i < buttonArr.length; i++) {
            var val = buttonArr[i];
            html+=('<button class="btn btn-xs '+val.class+'" onclick="'+val.opt+'">'+val.text+'</button>&nbsp;&nbsp;');
        }
        return html;
    }
};