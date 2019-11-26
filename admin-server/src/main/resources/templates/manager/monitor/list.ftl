<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">

<head>
<#include "/templates/layout/meta.ftl">
    <link href="/static/css/style.css" rel="stylesheet">
    <style>
        *{margin:0px;padding:0px;}
        .progressBox{border-left:1px solid #ababab;padding:20px 0;width: 95%;margin:0px;}
        .progressBox .progress1{height: 50px;background:#fac090; z-index: 300;}
        .progressBox .progress2{height: 50px;background:#8eb4e3;margin-top: -20px;position: relative;z-index: 200;padding-top: 20px; }
        .progressBox .progress3{height: 50px;background:#c3d69b; margin-top: -20px;position: relative;z-index: 100;padding-top: 20px;}
        .progressBox .progress4{height: 50px;background: #fac090; margin-top: 30px;position: relative;z-index: 200;padding-top: 20px;}
        .progressBox2{border-left:1px solid #ababab;padding:1px 0;margin:0px 10px 0px 0px;}
        div {
            position: relative;
            line-height: 30px;
        }

        input[type="radio"] {
            width: 20px;
            height: 20px;
            opacity: 0;
        }

        label {
            position: absolute;
            left: 5px;
            top: 3px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 1px solid #999;
        }

        /*设置选中的input的样式*/
        /* + 是兄弟选择器,获取选中后的label元素*/
        input:checked+label {
            background-color: #fe6d32;
            border: 1px solid #fe6d32;
        }

        input:checked+label::after {
            position: absolute;
            content: "";
            width: 5px;
            height: 10px;
            top: 3px;
            left: 6px;
            border: 2px solid #fff;
            border-top: none;
            border-left: none;
            transform: rotate(45deg)
        }
        .td-font{
            text-align: center;
            font-size: 20px;
            width: 7%;
        }
        .td-font-td{
            width: 15%;
        }
        .td-font-td2{
            width: 26%;
        }
        .td-font2{
            text-align: center;
            font-size: 15px;
        }
        .td-font3{
            text-align: center;
            font-size: 15px;
            width: 10%;
        }
        .class1{
            width: 10px;
            height: 10px;
            float: left;
            margin-top: 10px;
            margin-right: 5px;
            background-color: #fac090;
        }
        .class2{
            width: 10px;
            height: 10px;
            float: left;
            margin-top: 10px;
            margin-right: 5px;
            background-color: #8eb4e3;
        }
        .class3{
            width: 10px;
            height: 10px;
            float: left;
            margin-top: 10px;
            margin-right: 5px;
            background-color: #c3d69b;
        }
        .table>tbody>tr>td{
            border:0px;
            vertical-align: middle;
        }
        .table>thead>tr>th{
            border:0px;
        }
    </style>
</head>

<body>
<div id="wrapper">
<#include "/templates/layout/left.ftl">
    <div id="page-wrapper" class="gray-bg">
    <#include "/templates/layout/header.ftl">
        <div class="row wrapper border-bottom white-bg page-heading">
            <h2>监控系统</h2>
            <div style="height:40px;width: 230px;float: right;background-color: #b7b7b7;text-align: center;line-height: 40px;">
                <strong>实时统计到：<span id="time"style="font-size: 26px;"></span></strong>
            </div>
            <!-- 选项卡 -->
            <ul id="myTab" class="nav nav-tabs" role="tablist">
                <li class="active"><a href="#bulletin" role="tab" data-toggle="tab">分组</a></li>
                <li><a href="#rule" role="tab" data-toggle="tab">坐席</a></li>
            </ul>
            <div class="ibox-content">
                <div id="staffgroup" class="bar search-bar">
                    <div class="form-inline">
                        <div class="form-group">
                            <span>企业：</span>
                            <select id="companyId" class="form-control" style="width: 180px;" onchange="Monitor.getProject();">
                                <option value="">请选择企业......</option>
                                <#if companys??>
                                    <#list companys as company>
                                        <option value="${company.id}">${company.name}</option>
                                    </#list>
                                </#if>
                            </select>
                        </div>
                        <div class="form-group">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>项目：</span>
                            <select id="projectId" class="form-control" onchange="Monitor.getTable();" style="width: 180px;">
                                <option value="">请选择项目......</option>
                            </select>
                        </div>
                        <div class="form-group">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>内容选择：</span>
                            <div class="radio-inline">
                                <input id="item1" type="radio" name="item" value="0" checked>
                                <label for="item1"></label>&nbsp;&nbsp;
                                <span>所有分组</span>
                            </div>
                            <div class="radio-inline">
                                <input id="item2" type="radio" name="item" value="1">
                                <label for="item2"></label>&nbsp;&nbsp;
                                <span>我的分组</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="staff" class="bar search-bar" hidden>
                    <div class="form-inline">
                        <div class="form-group">
                            <span>企业：</span>
                            <select id="companyId2" class="form-control" style="width: 180px;" onchange="Monitor.getProject2();">
                                <option value="">请选择企业......</option>
                                <#if companys??>
                                    <#list companys as company>
                                        <option value="${company.id}">${company.name}</option>
                                    </#list>
                                </#if>
                            </select>
                        </div>
                        <div class="form-group">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>项目：</span>
                            <select id="projectId2" class="form-control" onchange="Monitor.getStaffGroup();" style="width: 180px;">
                                <option value="">请选择项目......</option>
                            </select>
                        </div>
                        <div class="form-group">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>坐席组：</span>
                            <select id="staffGroup2" class="form-control" onchange="Monitor.getTable2();" style="width: 180px;">
                                <option value="">请选择坐席组......</option>
                            </select>
                        </div>
                        <div class="form-group">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>内容选择：</span>
                            <div class="radio-inline">
                                <input id="item3" type="radio" name="item2" value="0" checked>
                                <label for="item3"></label>&nbsp;&nbsp;
                                <span>所有坐席</span>
                            </div>
                            <div class="radio-inline">
                                <input id="item4" type="radio" name="item2" value="1">
                                <label for="item4"></label>&nbsp;&nbsp;
                                <span>我的坐席</span>
                            </div>
                        </div>
                    </div>
                </div>
                <#--<h5 class="page-header"></h5>-->
                <div class="tab-content" id="maincontent">
                <#--分组内容面板-->
                    <div class="tab-pane fade in active" id="bulletin">
                            <div id="tabletop" hidden>
                            <div style="width:93%;height:1px;margin-left:0px;padding:0px;background-color:#D5D5D5;overflow:hidden;"></div>
                            <div style="float: right;margin-top: -46px;">
                                <div class="class1"></div><span>实际值</span></br>
                                <div class="class2"></div><span>理论到达值</span></br>
                                <div class="class3"></div><span>日目标</span>
                            </div>
                            <div style="margin-top:10px;color: #4a4a4a;font-size:20px;">
                                <strong>分组情况</strong>
                            </div>
                            <#--<div style="width:100%; height:100%; overflow:scroll;">-->
                                <table <#--cellspacing="0"--> width="100%" align="center" class="table1">
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th class="td-font2">上线人数</th>
                                        <th class="td-font2">人均通话时长</th>
                                        <th class="td-font2">人均接听量</th>
                                        <th class="td-font2">成单量</th>
                                        <th class="td-font2">人均成单量</th>
                                        <th class="td-font2">坐席成单率</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            <#--</div>-->
                        </div>
                    </div>
                    <#--坐席内容面板-->
                    <div class="tab-pane fade" id="rule">
                        <div id="table2top" hidden>
                            <div style="width:93%;height:1px;margin-left:0px;padding:0px;background-color:#D5D5D5;overflow:hidden;"></div>
                            <div style="float: right;margin-top: -46px;">
                                <div class="class1"></div><span>实际值</span></br>
                                <div class="class2"></div><span>理论到达值</span></br>
                                <div class="class3"></div><span>日目标</span>
                            </div>
                            <div style="margin-top:10px;color: #4a4a4a;font-size:20px;">
                                <strong>整体情况</strong>
                            </div>
                            <#--<div style="width:100%; height:100%; overflow:scroll;">-->
                                <table <#--cellspacing="0"--> width="100%;" align="center" class="table2">
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th class="td-font2">上线人数</th>
                                        <th class="td-font2">人均通话时长</th>
                                        <th class="td-font2">人均接听量</th>
                                        <th class="td-font2">成单量</th>
                                        <th class="td-font2">人均成单量</th>
                                        <th class="td-font2">坐席成单率</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            <#--</div>-->
                        </div>
                        <div id="table3top" hidden>
                            <div style="width:100%;height:1px;margin-left:0px;padding:0px;background-color:#D5D5D5;overflow:hidden;"></div>
                            <div style="margin-top:10px;color: #4a4a4a;font-size:20px;">
                                <strong>坐席情况</strong>
                            </div>
                            <div class="form-inline" style="margin-top: 15px;">
                                <div class="form-group">
                                    <span>状态：</span>
                                    <select id="status" class="form-control" onchange="Monitor.staffStatus();" style="width: 120px;">
                                        <option value="">全部</option>
                                        <option value="0">离线</option>
                                        <option value="1">在线</option>
                                    </select>
                                </div>
                            </div>
                            <#--<div style="width:100%; height:100%; overflow:scroll;">-->
                                <table <#--cellspacing="0"--> width="100%;" align="center" class="table3">
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th class="td-font2">实时状态</th>
                                        <th class="td-font2">通话总时长</th>
                                        <th class="td-font2">接听量</th>
                                        <th class="td-font2">成单量</th>
                                        <th class="td-font2">坐席成单率</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            <#--</div>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <#include "/templates/layout/footer.ftl">
    </div>
</div>
<#include "/templates/layout/commonjs.ftl">
<script src="/static/modular/manager/monitor/monitor.js"></script>
<!-- echarts -->
<script src="/static/js/plugins/echarts/echarts.min.js"></script>
</body>
</html>
