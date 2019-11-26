<!DOCTYPE html>
<html >
<head>
    <#include "/templates/layout/meta.ftl">
        <link href="/static/css/plugins/dualListbox/bootstrap-duallistbox.min.css" rel="stylesheet">
        <style>
            .info-container {
                display: none;
            }
        </style>
    <style>
        .clearfix:after,.clearfix:before{display:table;content:"";line-height:0}
        .clearfix:after{clear:both !important;}
        /*leads信息完善*/
        .perfectLeadsInforWin{width:34%;overflow-y:auto;background: #fff;border-radius: 8px;z-index: 9999;padding: 10px 20px;border:1px solid #ccc;}
        .perfectLeadsInforWin .closeBtn{background: url(/img/close.png) no-repeat;width:18px;height:18px;padding:10px;position: absolute;right:20px;top:20px;cursor: pointer;}
        .perfectLeadsInforWin .titleBox{text-align: center;color:#494949;line-height:40px;margin-bottom: 20px;border-bottom:1px solid #ccc;}
        .leadsInforListsBox .labelTxt{width:30%;text-align: right;  display: inline-block;margin-right: 20px;color:#9b9b9b;}
        .leadsInforListsBox .firstName{width:20%;height:30px;line-height:20px;border:1px solid #ccc;padding:5px;}
        .leadsInforListsBox .selectType{margin-right: 10px;}
        .leadsInforListsBox select{width:20%;}
        .submitBtn{width:145px;height:35px;text-align: center;line-height: 35px;color:#fff;border-radius: 4px;margin:10px;display: inline-block;
            background: -webkit-linear-gradient(left, #ff5a3e , #ff2a68); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(right, #ff5a3e, #ff2a68); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(right, #ff5a3e, #ff2a68); /* Firefox 3.6 - 15 */
            background: linear-gradient(to right, #ff5a3e , #ff2a68); /* 标准的语法 */}
        .scrollTabContent{width:65%;overflow-y: auto;}

        .form-group {
            margin-bottom: 5px;
        }
        .form-group .control-label {
            color: #9b9b9b;
            padding-top: 3px;
        }

        .form-group .form-control {
            height: 35px;
        }

        .form-group1 .form-control {
            height: 35px;
        }


        .label-box {
            min-height: 500px;
        }

        .label-box .form-group label {
            font-weight: 400;
        }
        .label-box .form-group1 label {
            font-weight: 400;
        }

        .pretty-border {
            border: 1px solid #dddddd;
        }

        .btn-circle {
            width: 30px;
            height: 30px;
            text-align: center;
            padding: 6px 0;
            font-size: 12px;
            line-height: 1.0;
            border-radius: 15px;
        }

        .comments {
            width:100%;/*自动适应父布局宽度*/
            overflow:auto;
            word-break:break-all;
        }
    </style>
        <script type="text/javascript" src="/static/js/jquery-3.1.1.min.js"></script>
</head>

<body class="no-skin">
<div id="wrapper">
    <#include "/templates/layout/left.ftl">
        <div id="page-wrapper" class="gray-bg">
        <#include "/templates/layout/header.ftl">
            <div class="wrapper wrapper-content animated fadeIn">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="row">
                            <div class="ibox collapsed border-bottom">
                                <div class="ibox-content" style="display: block;">
                                    <font style="vertical-align: inherit;">项目：${project.name!} </font>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <font style="vertical-align: inherit;">客户手机号：${calls.phone!}</font>&nbsp;&nbsp;&nbsp;&nbsp;
                                        <font style="vertical-align: inherit;">时间：${callsTime?string("yyyy-MM-dd HH:mm:ss")}</font>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <font style="vertical-align: inherit;">坐席:${staff.name!} </font>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <font style="vertical-align: inherit;">质检人员:${qualityName!} </font>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <font style="vertical-align: inherit;">线路:${caller!} </font>
                                     <input value="${calls.id?string}" type="hidden" id="callid" >
                                    <input value="${calls.pid}" type="hidden" id="pid" >
                                    <input value="${phoneId}" type="hidden" id="phoneId" >
                                    <button class="control-auth btn btn-success" data-auth="rulequality_recombine" id="recombine" onclick="recombine()" type="button"  controls="controls"  style="margin:10px 10px 5px 15px;vertical-align: middle;">录音重新生成</button>
                                </div>
                                <div class="ibox-content" style="display: block;">
                                    <span style="padding-left:16px;"><font style="vertical-align: inherit;">总的(m1)：</font><audio id="audio1" controls="controls" src="${m1allvoicepath}" style="width: 25%;margin:5px 5px 5px 0px;vertical-align: middle;"></audio></span>
                                    <span ><font style="vertical-align: inherit;">总的(h2)：</font><audio id="audio2" controls="controls" src="${h2allvoicepath}" style="width: 25%;margin:5px 5px 5px 0px;vertical-align: middle;"></audio></span>
                                    <span ><font style="vertical-align: inherit;">合并：</font><audio id="audio3" controls="controls" src="${allvoicepath}" style="width: 25%;margin:5px 5px 5px 0px;vertical-align: middle;"></audio></span><br>
                                    <span style="padding-left:16px;"><font style="vertical-align: inherit;">客户(m1)：</font><audio id="audio4" controls="controls" src="${m1outvoicepath}" style="width: 25%;margin:5px 5px 5px 0px;vertical-align: middle;"></audio></span>
                                    <span style="padding-left:16px;"></span><br>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="row">
                            <div class="ibox collapsed border-bottom">
                                <div class="ibox-title">
                                    <h5 style="margin:6px 0px 0px 0px ">通话问题提交</h5>
                                </div>
                                <div class="ibox-content" style="display:block;height: 150px;">

                                    <div class="col-lg-5">
                                        <div class="row">
                                            <span ><font style="vertical-align: inherit;">问题类型：</font></span>
                                            <span ><font style="vertical-align: inherit;color: gainsboro">（可多选）</font></span>
                                        </div>
                                        <div class="row" id="qtypes">
                                            <#list qtypes as qtype>
                                                <#if qtype.checked=1>
                                                    <label><input value="${qtype.alltype.id}"  type="checkbox" checked="checked">${qtype.alltype.name}</label>
                                                <#else>
                                                    <label><input value="${qtype.alltype.id}"  type="checkbox" >${qtype.alltype.name}</label>
                                                </#if>
                                            </#list>
                                        </div>
                                    </div>
                                    <div class="col-lg-5">
                                        <div class="row">
                                            <span ><font style="vertical-align: inherit;">问题描述：</font></span>
                                            <span ><font style="vertical-align: inherit;color: gainsboro">（不同问题分开描述）</font></span>
                                        </div>
                                        <div class="row">
                                            <textarea rows="5" cols="50" class="comments" id="qdescription" >${calls.qdescription}</textarea>
                                        </div>
                                    </div>

                                    <div class="col-lg-2">
                                        <div class="row" style="margin-left: 0px;margin-top: 80px;">
                                            <button class="btn btn-success"   type="button" onclick="submitQuestion()">提交</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" style="overflow:auto;overflow-x:hidden;">
                    <div class="col-lg-7">
                        <div class="row">
                            <div class="ibox float-e-margins">
                                <div class="ibox-title">
                                    <h5 style="margin:6px 0px 0px 0px ">录音翻译内容</h5>
                                </div>
                                <div class="ibox-content" style="overflow:auto;overflow-x:hidden;height:650px;">

                                    <div>
                                        <div class="feed-activity-list">
                                        <#--加载语音对话-->
                                            <#list callLogs as callLog>
                                                    <div class="feed-element">
                                                <span  class="pull-left">
                                                    <img alt="image" class="img-circle" src="/static/img/avatar2.png">
                                                </span>
                                                    <div class="media-body ">
                                                        <small class="pull-right " style="color: #ff892a">${callLog.inittime?string("yyyy-MM-dd HH:mm:ss")}</small>
                                                        <#if callLog.type==2>
                                                            <div>客服：</div>
                                                            <span>
                                                            ${callLog.content!}<button value="${callLog.time}"  hidden-data="${callLog.robotTime}" class="btn btn-sm btn-warning" onclick="playVoice(this)">播放</button>
                                                         </span>
                                                        <#else>
                                                            <div>用户：</div>
                                                            <span style="color: red">
                                                            ${callLog.content!}
                                                            </span>
                                                        </#if>
                                                    </div>
                                                </div>
                                            </#list>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="row">
                            <div class="ibox-content" style="display: block; height:698px;">
                                <div id="leadsContent" class="submitInforBox  form-horizontal">
                                    <#--<div class="form-group"><label class="col-lg-4 control-label">卡种</label><div class="col-lg-6"><label><input type="radio" value="young卡" name="card_species">young卡</label><label><input type="radio" value="王者荣耀卡" name="card_species">王者荣耀卡</label><label><input type="radio" value="银联标准信用卡金卡" name="card_species">银联标准信用卡金卡</label></div></div><div class="form-group"><label class="col-lg-4 control-label">姓名</label><div class="col-lg-6"><input type="text" class="form-control" value="未填写" id="name" name="name" placeholder=""></div></div><div class="form-group"><label class="col-lg-4 control-label">拼音/英文姓名</label><div class="col-lg-6"><input type="text" class="form-control" value="未填写" id="eng_name" name="eng_name" placeholder=""></div></div><div class="form-group"><label class="col-lg-4 control-label">身份证</label><div class="col-lg-6"><input type="text" class="form-control" value="未填写" id="id_card" name="id_card" placeholder=""></div></div><div class="form-group"><label class="col-lg-4 control-label">公司名称</label><div class="col-lg-6"><input type="text" class="form-control" value="未填写" id="company_name" name="company_name" placeholder=""></div></div><div class="form-group"><label class="col-lg-4 control-label">公司地址</label><div class="col-lg-6"><input type="text" class="form-control" value="未填写" id="company_addr" name="company_addr" placeholder=""></div></div><div class="form-group"><label class="col-lg-4 control-label">公司电话</label><div class="col-lg-6"><input type="text" class="form-control" value="未填写" id="company_tel" name="company_tel" placeholder=""></div></div><div class="form-group"><label class="col-lg-4 control-label">职务类别</label><div class="col-lg-6"><input type="text" class="form-control" value="未填写" id="job_category" name="job_category" placeholder=""></div></div><div class="form-group"><label class="col-lg-4 control-label">教育程度</label><div class="col-lg-6"><label><input type="radio" value="初中及以下" name="education_level">初中及以下</label><label><input type="radio" value="高中及中专技校" name="education_level">高中及中专技校</label><label><input type="radio" value="大专" name="education_level">大专</label><label><input type="radio" value="本科" name="education_level">本科</label><label><input type="radio" value="研究生" name="education_level">研究生</label><label><input type="radio" value="博士级以上" name="education_level">博士级以上</label></div></div><div class="form-group"><label class="col-lg-4 control-label">电子邮箱</label><div class="col-lg-6"><input type="text" class="form-control" value="未填写" id="email" name="email" placeholder=""></div></div><div class="form-group"><label class="col-lg-4 control-label">现居地址</label><div class="col-lg-6"><input type="text" class="form-control" value="未填写" id="now_addr" name="now_addr" placeholder=""></div></div><div class="form-group"><label class="col-lg-4 control-label">寄卡地址</label><div class="col-lg-6"><input type="text" class="form-control" value="未填写" id="send_card_addr" name="send_card_addr" placeholder=""></div></div><div class="form-group"><label class="col-lg-4 control-label">行业类别</label><div class="col-lg-6"><label><input type="radio" value="高级负责人" name="industry2">高级负责人</label><label><input type="radio" value="中级负责人" name="industry2">中级负责人</label><label><input type="radio" value="一般员工" name="industry2">一般员工</label><label><input type="radio" value="基层生产" name="industry2">基层生产</label><label><input type="radio" value="基层销售" name="industry2">基层销售</label><label><input type="radio" value="基层服务" name="industry2">基层服务</label><label><input type="radio" value="其他" name="industry2">其他</label></div></div><div class="form-group"><label class="col-lg-4 control-label">直系亲属联系人</label><div class="col-lg-6"><input type="text" class="form-control" value="未填写" id="parent_contact" name="parent_contact" placeholder=""></div></div><div class="form-group"><label class="col-lg-4 control-label">联系人手机号</label><div class="col-lg-6"><input type="text" class="form-control" value="未填写" id="contact_phone" name="contact_phone" placeholder=""></div></div><div class="form-group"><label class="col-lg-4 control-label">备注</label><div class="col-lg-6"><input type="text" class="form-control" value="未填写" id="memo" name="memo" placeholder=""></div></div><div class="form-group"><label class="col-lg-4 control-label">质检成功</label><div class="col-lg-6"><label><input type="radio" checked="" value="是" name="flg">是</label><label><input type="radio" value="否" name="flg">否</label></div></div>-->
                                    ${leadsHtml}
                                </div>
                                <div class="leadsInforListsBox" style="text-align: center">
                                    <input value="${nextPhoneId}" type="hidden" id="nextPhoneId">
                                    <input value="${projectId}" type="hidden" id="projectId">
                                    <input value="${companyId}" type="hidden" id="companyId">
                                    <input value="${phone}" type="hidden" id="phone">
                                    <#--<input value="${batchId}" type="hidden" id="batchId">-->
                                    <input value="${batchname}" type="hidden" id="batchname">
                                    <input value="${status}" type="hidden" id="status">
                                    <input value="${time}" type="hidden" id="date">
                                    <input value="${seat}" type="hidden" id="seat">
                                    <#if nextPhoneId==''>
                                    <span class="submitBtn" style="cursor: pointer">提交</span>
                                    <#else >
                                    <span class="submitBtn" style="cursor: pointer">提交,并下一条</span>
                                    </#if>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <#--<div class="row">-->
                    <#--<div class="col-lg-12">-->
                        <#--<input value="${verify}" type="hidden" id="verifysss" >-->
                        <#--<div class="col-lg-6">-->
                            <#--<div class="row">-->
                                <#--<div class="ibox collapsed border-bottom">-->
                                    <#--<div class="ibox-title">-->
                                        <#--<h5 style="margin:6px 0px 0px 0px ">超级教练标注提交</h5>-->
                                    <#--</div>-->
                                    <#--<div class="ibox-content" style="display:block;height: 150px;">-->

                                        <#--<div class="col-lg-10">-->
                                            <#--<div class="row">-->
                                                <#--<span ><font style="vertical-align: inherit;">标注类型：</font></span>-->
                                                <#--<span ><font style="vertical-align: inherit;color: gainsboro">（可多选）</font></span>-->
                                            <#--</div>-->
                                            <#--<div class="row" id="coachtypes">-->
                                                <#--<#if coachTypes??>-->
                                                    <#--<#list coachTypes as coachtype>-->
                                                        <#--<label><input value="${coachtype.id}"  type="checkbox" name="coachtype">${coachtype.name}</label>-->
                                                    <#--</#list>-->
                                                <#--<#else>-->
                                                    <#--<label>改规则组未建标注类别！</label>-->
                                                <#--</#if>-->
                                            <#--</div>-->
                                        <#--</div>-->
                                        <#--<div class="col-lg-2">-->
                                            <#--<div class="row" style="margin-left: 0px;margin-top: 80px;">-->
                                                <#--<button class="btn btn-success"   type="button" onclick="submitCoach()">提交</button>-->
                                            <#--</div>-->
                                        <#--</div>-->
                                    <#--</div>-->
                                <#--</div>-->
                            <#--</div>-->
                        <#--</div>-->
                        <#--<div class="col-lg-6  control-auth" data-auth="rulequality_verify">-->
                            <#--<div class="row">-->
                                <#--<div class="ibox collapsed border-bottom">-->
                                    <#--<div class="ibox-title">-->
                                        <#--<h5 style="margin:6px 0px 0px 0px ">审核提交</h5>-->
                                    <#--</div>-->
                                    <#--<div class="ibox-content" style="display:block;height: 150px;">-->
                                        <#--<div class="col-lg-10">-->
                                            <#--<div class="row">-->
                                                <#--<span ><font style="vertical-align: inherit;">审核状态：</font></span>-->
                                                <#--<select class="selectpicker" id="verify">-->
                                                    <#--<#if verify==''>-->
                                                        <#--<option selected value="">未审核</option>-->
                                                        <#--<option value="1">审核合格</option>-->
                                                        <#--<option value="0">审核不合格</option>-->
                                                    <#--<#elseif verify=='0'>-->
                                                        <#--<option value="">未审核</option>-->
                                                        <#--<option value="1">审核合格</option>-->
                                                        <#--<option selected value="0">审核不合格</option>-->
                                                    <#--<#else>-->
                                                        <#--<option value="">未审核</option>-->
                                                        <#--<option selected value="1">审核合格</option>-->
                                                        <#--<option value="0">审核不合格</option>-->
                                                    <#--</#if>-->
                                                <#--</select>-->
                                            <#--</div>-->
                                        <#--</div>-->
                                        <#--<div class="col-lg-2">-->
                                            <#--<div class="row" style="margin-left: 0px;margin-top: 80px;">-->
                                                <#--<button class="btn btn-success"   type="button" onclick="submitVerify()">提交</button>-->
                                            <#--</div>-->
                                        <#--</div>-->
                                    <#--</div>-->
                                <#--</div>-->
                            <#--</div>-->
                        <#--</div>-->
                    <#--</div>-->
                <#--</div>-->
            </div>
        <#include "/templates/layout/footer.ftl">
        </div>
</div>

<!-- /.main-container -->
<#include "/templates/layout/commonjs.ftl">
<script type="text/javascript">
    $(document).ready(function(){
        refreshPermission("rule_quality");
    });


    var notContains = function(keys,key){
        if(keys==""){
            return true;
        }

        if(key==""){
            return false;
        }
        var flg = true;
        var arrayKeys = keys.split(",");
        for(i=0;i<arrayKeys.length;i++){
            if(arrayKeys[i] == key){
                flg =false;
                break;
            }

        }
        return flg;
    }

    function playVoice(obj) {
        var time = $(obj).val();
        var robotTime = $(obj).attr("hidden-data");
        var audio3 = document.getElementById('audio3');
        audio3.currentTime = parseInt(time)+parseInt(robotTime);
        audio3.play();
    }

    function GetQueryString(name) {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }


    function recombine(){
        info("正在生成中,请稍后");
        // 调用方法
        console.log(GetQueryString("phoneId"));
        $.ajax({
            url: "/rulequality/recombine?phoneId=" + GetQueryString("phoneId"),
            type: 'GET',
            dataType: "json",
            success: function (r) {
                if(r.code ===0){
                    success("生成成功，请刷新页面");
                }

            }
        })
    }
    function submitQuestion() {

       var qdes= $("#qdescription").val();//将textarea中的内容
        var arr = new Array();
        $("#qtypes :checkbox").each(function () {
            if ($(this).is(':checked')) {
                arr.push( $(this).val());
            }
        });
        var vals = arr.join(",");
        $.ajax({
            url: "/rulequality/qtypeadd",
            type: 'post',
            data:{
                callId: $("#callid").val(),
                types:vals,
                description:qdes,
            },
            dataType: "json",
            success: function (r) {
                swal({
                    title: "提交成功!",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    closeOnConfirm: false
                }, function () {
                    //如果有下一条，则打开下一条
                    swal.close();
                });
            }
        })
    }

    //打开质检页面
    var zhijian = function () {
        window.location.href = "/rulequality/detailComm?phoneId="+$("#nextPhoneId").val()+"&batchname="+ $("#batchname").val()+"&companyId="+$("#companyId").val()
                +"&phone="+$("#phone").val()+"&projectId="+$("#projectId").val()+
                "&status="+$("#status").val()+"&time="+$("#date").val()+"&seat="+$("#seat").val();
    };

    $(".submitBtn").click(function(){
        //暂停当前页面所有录音
        var audio1 = document.getElementById('audio1');
        var audio2 = document.getElementById('audio2');
        var audio3 = document.getElementById('audio3');
        audio1.pause();
        audio2.pause();
        audio3.pause();
        //判断是否选中质检成功radio
        var  radioFlgs = $("input[name=flg]");
        if(radioFlgs.length >0 ){
            if($("input[name=flg]:checked").length ==0){
                $("input[name=flg]").each(function(){
                    if($(this).val() == "否"){
                        $(this).attr("checked",true);
                    }
                })
            }
        }
        var  keys = "";
        var values = "";
        var  tempIndex = 0;
        $("#leadsContent").find(".form-group").each(function(){
            var value = "";
            //判断是否存在文本框，并且获取值
            var textDom = $(this).find("input[type=text]")
            if(textDom.length>0){
                var key = textDom.attr("id");
                if(notContains(keys,key)){
                    if(keys==""){
                        keys = key;
                    }else{
                        keys+=","+key;
                    }
                }

                if(textDom.val()!=""){
                    value = textDom.val();
                }
            }

            if(value ==""){
                //判断存不存在日期选择框（年月日），并且获取值
                var dateDom = $(this).find("input[type=date]")
                if(dateDom.length>0){
                    value = dateDom.val();
                    var key = dateDom.attr("id");
                    if(notContains(keys,key)){
                        if(keys==""){
                            keys = key;
                        }else{
                            keys+=","+key;
                        }
                    }
                }
            }

            if(value ==""){
                //判断存不存在复选框，并且获取值
                var checkBoxDom = $(this).find("input[type=checkbox]")
                if(checkBoxDom.length>0){
                    var key = checkBoxDom.eq(0).attr("name");
                    if(notContains(keys,key)){
                        if(keys==""){
                            keys = key;
                        }else{
                            keys+=","+key;
                        }
                    }
                    $(this).find("input[type=checkbox]:checked").each(function(){
                        if(value ==""){
                            value = $(this).val();
                        }else{
                            value += "|"+$(this).val();
                        }
                    })

                }
            }

            if(value ==""){
                //判断存不存在单选框，并且获取值
                var radioDom = $(this).find("input[type=radio]")
                if(radioDom.length>0){
                    var key = radioDom.eq(0).attr("name");
                    if(notContains(keys,key)){
                        if(keys==""){
                            keys = key;
                        }else{
                            keys+=","+key;
                        }
                    }

                    $(this).find("input[type=radio]:checked").each(function(){
                        value = $(this).val();
                    })

                }
            }

            if(value ==""){
                //判断存不存在datetime-local，并且获取值
                var dateDom = $(this).find("input[type=datetime-local]")
                if(dateDom.length>0){
                    value = dateDom.val();
                    var key = dateDom.attr("id");
                    if(notContains(keys,key)){
                        if(keys==""){
                            keys = key;
                        }else{
                            keys+=","+key;
                        }
                    }

                }
            }

            //判断是否存在二级联动框
            var bool = true;

            if(value ==""){
                var selectDom = $(this).find("select")
                if(selectDom.length>0){
                    bool = false;
                    //判断存不存在二级联动下拉框，并且获取值
                    $(this).find(".selectpicker").each(function(){
                        var selectVal = $(this).val();
                        var key = $(this).attr("name");
                        if(key!=''){
                            if(keys==""){
                                keys = key;
                            }else{
                                keys+=","+key;
                            }
                        }

                        if(selectVal==""||selectVal==null){
                            values=values+"||"+"未填写";
                        }else{
                            values=values+"||"+selectVal;
                        }
                    });
                }
            }

            if(value==""){
                value ="未填写";
            }
            if(tempIndex==0){
                values= value;
            }else{
                if(bool){
                    values=values+"||"+value;
                }else{
                }
            }
            tempIndex++;

        });
        console.log(keys);
        console.log(values);
        $.ajax({
            url: "/rulequality/commleads/add",
            type: 'post',
            data:{
                keys: keys,
                values: values,
                callId: $("#callid").val(),
                pid:$("#pid").val()
            },
            dataType: "json",
            success: function (r) {
                    swal({
                        title: "保存成功!",
                        text: "",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        closeOnConfirm: false
                    }, function () {
                        //如果有下一条，则打开下一条
                        if($("#nextPhoneId").val() != ''){
                            zhijian();
                            swal.close();
                        }else{
                            swal.close();
                        }
                    });
            }
        })
    })


    var getsrcollH = document.documentElement.clientHeight - 180;
    $(".scrollTabContent").css("height",getsrcollH+'px');
    $(".perfectLeadsInforWin").css("height",getsrcollH+'px');

    function openFile() {
        $("#file").click();
    }

    function showFile() {
        var path = $("#file").val();
        if (isEmpty(path)) {
            $("#filePath").html("");
            $("#upload").hide();
        } else {
            $("#filePath").html("").html(path);
            $("#upload").show();
        }
    }
    function  submitCoach() {
        var arr = new Array();
        $("#coachtypes :checkbox").each(function () {
            if ($(this).is(':checked')) {
                arr.push( $(this).val());
            }
        });
        if(arr.length<=0){
            toastr.error("至少选一个标注类别", "error");
            return
        }
        var types=arr.join(",");
        debugger
        $.ajax({
            url: "/rulequality/commitToCoach",
            type: 'post',
            data:{
                types: types,
                phoneId: $("#phoneId").val(),
            },
            dataType: "json",
            success: function (r) {
                if (r.code === 0) {
                    success("提交成功")
                }
            }
        })
    }

    function  submitVerify() {
        $.ajax({
            url: "/rulequality/subverify",
            type: 'post',
            data:{
                verstatus:$("#verify").val() ,
                callId: $("#callid").val(),
            },
            dataType: "json",
            success: function (r) {
                if (r.code === 0) {
                    success("提交成功")
                }else{
                    warning(r.msg)
                }
            }
        })
    }
</script>
</body>
</html>
