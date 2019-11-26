<div class="form-horizontal" id="init-rule-form">
    <input type="hidden"  name="pid" value="${pid?if_exists}">
    <input type="hidden"  name="id" value="${rid?if_exists}">
    <fieldset>
        <div id="legend" class="col-lg-12" >
            <legend class="">肯定语气词规则</legend>
        </div>
    </fieldset>
    <div class="form-inline inline-div" id="mood-regu-div">
        <table class="table table-bordered table-hover" style="width: 20%;margin-top: 10px;">
            <thead>
            <tr>
                <th>from</th><th>to</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
    <br/>
    <fieldset>
        <div id="legend" class="col-lg-12">
            <legend class="">答非所问规则</legend>
        </div>
    </fieldset>
    <div class="form-inline inline-div" id="match-regu-div">
        <table class="table table-bordered table-hover" style="width: 80%;margin-top: 10px;">
            <thead>
            <tr>
                <th>名称</th><th>from</th><th>to</th><th>次数</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
    <fieldset>
        <div id="legend" class="col-lg-12">
            <legend class=""></legend>
        </div>
    </fieldset>
    <div class="form-inline inline-div" id="abnormal-regu-div">
        <table class="table table-bordered table-hover" style="width: 100%;margin-top: 10px;">
            <thead>
            <tr>
                <th>名称</th><th>from</th><th>自定义话术</th><th>挽回方式</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
    <fieldset>
        <div id="legend" class="col-lg-12" >
            <legend class="">听不清规则</legend>
        </div>
    </fieldset>
    <div class="form-inline inline-div" id="nothear-regu-div">
        <table class="table table-bordered table-hover" style="width: 20%;margin-top: 10px;">
            <thead>
            <tr>
                <th>结束状态</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
    <br/>
    <fieldset>
        <div id="legend" class="col-lg-12">
            <legend class="">拒绝规则</legend>
        </div>
    </fieldset>
    <div class="form-inline inline-div" id="deny-regu-div" >
        <table class="table table-bordered table-hover" style="width: 20%;margin-top: 10px;">
            <thead>
            <tr>
                <th>名称</th><th>次数</th><th>适用状态</th><th>结束状态</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>

    <fieldset>
        <div id="legend" class="col-lg-12">
            <legend class="">情感转换规则</legend>
        </div>
    </fieldset>
    <div class="form-inline inline-div" id="emotrans-regu-div" >
        <table class="table table-bordered table-hover" style="width: 100%;margin-top: 10px;">
            <thead>
            <tr>
                <th>状态</th><th>转换前</th><th>转换后</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
    <fieldset>
        <div id="legend" class="col-lg-12">
            <legend class="">关联状态规则</legend>
        </div>
    </fieldset>
    <div class="form-inline inline-div" id="related-regu-div" >
        <table class="table table-bordered table-hover" style="width: 100%;margin-top: 10px;">
            <thead>
            <tr>
                <th>from</th><th>to</th><th>条件</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
    <fieldset>
        <div id="legend" class="col-lg-12">
            <legend class="">纠错模块</legend>
        </div>
    </fieldset>
    <div class="form-inline inline-div" id="correct-regu-div" >
        <table class="table table-bordered table-hover" style="width: 20%;margin-top: 10px;">
            <thead>
            <tr>
                <th>模块</th><th>状态</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
    <fieldset>
        <div id="legend" class="col-lg-12">
            <legend class="">地名状态</legend>
        </div>
    </fieldset>
    <div class="form-inline inline-div" id="location-regu-div" >
        <table class="table table-bordered table-hover" style="width: 20%;margin-top: 10px;">
            <thead>
            <tr>
                <th>状态</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
    <br/>
    <fieldset>
        <div id="legend" class="col-lg-12" >
            <legend class="">打断比例配置</legend>
        </div>
    </fieldset>
    <div class="form-inline inline-div" id="interrupt-regu-div">
        <table class="table table-bordered table-hover" style="width: 100%;margin-top: 10px;">
            <thead>
            <tr>
                <th>名称</th><th>from</th><th>百分率</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
    <br/>
    <fieldset>
        <div id="legend" class="col-lg-12" >
            <legend class="">直跳、集合性规则</legend>
        </div>
    </fieldset>
    <div class="form-inline inline-div" id="set-regu-div">
        <table class="table table-bordered table-hover" style="width: 100%;margin-top: 10px;">
            <thead>
            <tr>
                <th>名称</th><th>类型</th><th>from/适用状态</th><th>to/QD</th><th>方法</th><th>集合</th><th>直跳排除</th><th>优先级</th><th>查看</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
    <br/>
    <fieldset>
        <div id="legend" class="col-lg-12">
            <legend class="">数值性规则</legend>
        </div>
    </fieldset>
    <div class="form-inline inline-div"  id="num-regu-div">
        <table class="table table-bordered table-hover" style="width: 100%;margin-top: 10px;">
            <thead>
            <tr>
                <th>名称</th><th>from</th><th>to</th><th>下限</th><th>上限</th><th>单位</th><th>单位必要性</th><th>关键词</th><th>优先级</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
</div>
