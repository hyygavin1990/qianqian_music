<!DOCTYPE html>
<html>

<head>
<#include "/templates/layout/meta.ftl">
</head>

<body>
<div id="wrapper">
<#include "/templates/layout/left.ftl">

    <div id="page-wrapper" class="gray-bg">
    <#include "/templates/layout/header.ftl">
    <!-- 计费显示界面 -->
    <#include "/templates/layout/footer.ftl">
    </div>

<#include "/templates/layout/commonjs.ftl">
</div>


<script src="/static/js/plugins/ladda/spin.min.js"></script>
<script src="/static/js/plugins/ladda/ladda.min.js"></script>
<script src="/static/js/plugins/ladda/ladda.jquery.min.js"></script>
<script src="/static/js/plugins/dualListbox/jquery.bootstrap-duallistbox.js"></script>
<script src="/static/modular/layout/billing.js"></script>
</body>
</html>
