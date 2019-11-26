<!DOCTYPE html>
<html>

<head>
    <#include "/templates/layout/meta.ftl">
    <link href="/static/css/plugins/dualListbox/bootstrap-duallistbox.min.css" rel="stylesheet">
        <link rel="stylesheet" href="/static/css/bootstrap-datetimepicker.min.css" />

        <style>
        .info-container {
            display: none;
        }
    </style>
</head>

<body>
<div id="wrapper">
<#include "/templates/layout/left.ftl">
    <div id="page-wrapper" class="gray-bg">
    <#include "/templates/layout/header.ftl">

        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-lg-10">
                <ol class="breadcrumb">
                    <li>
                        <a href="/main">首页</a>
                    </li>
                    <li class="active">
                        <strong>列表</strong>
                    </li>
                </ol>
            </div>
            <div class="col-lg-2">

            </div>
        </div>

        <div class="wrapper wrapper-content">
            <div class="row">
                <div class="col-lg-12">
                    <div class="ibox ">
                        <div class="ibox-content">
                            <input type="text" id="headerGroupId" value="${headerGroupId}" style="display: none;">
                            <div class="bar search-bar">
                                <#--<div class="form-inline">-->
                                    <#---->
                                    <#--<button class="btn btn-success"  id="search" type="button" onclick="Label.search()">搜索</button>-->
                                    <#--<button class="btn btn-success" type="button" onclick="Label.resetSearch()">重置</button>-->
                                    <#--<button class="btn btn-success" id="download" type="button" onclick="Label.download()">导出</button>-->
                                <#--</div>-->
                            </div>
                            <div class="bar operate-bar">
                                <button class="control-display btn btn-sm btn-primary" data-auth="headergroup_config_save" id="save">保存更改</button>
                            </div>
                            <div class="jqGrid_wrapper">
                            <#--jqgrid 表格栏-->
                                <table id="grid-table"></table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div style="display: none;" >
            <input type="text" class="control-disabled" id="seqInput" value="">
        </div>


    <#include "/templates/layout/footer.ftl">
    </div>

<#include "/templates/layout/commonjs.ftl">
</div>

<script src="/static/modular/manager/headergroup/config.js"></script>
<script src="/static/js/bootstrap-datetimepicker.min.js"></script>





</body>
</html>
