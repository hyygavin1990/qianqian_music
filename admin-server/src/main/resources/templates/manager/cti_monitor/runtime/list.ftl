<!DOCTYPE html>
<html>

<head>
    <#include "/templates/layout/meta.ftl">
    <style>
        .cti-row {
            margin-bottom: 20px;
            height: 120px;
        }
        .show-row {
            font-size: 18px;
            font-weight: 110;
            margin-bottom: 9px;
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
                <h2>硬件监控</h2>
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
                            <div class="jqGrid_wrapper">
                                <table id="grid-table"></table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    <#include "/templates/layout/footer.ftl">
    </div>
</div>

<#include "/templates/layout/commonjs.ftl">

<script src="/static/modular/manager/cti_monitor/runtime/runtime.js"></script>

</body>
</html>
