<div class="form-horizontal" id="init-rule-form">
    <input type="hidden"  name="pid" value="${pid?if_exists}">
    <input type="hidden"  name="id" value="${rid?if_exists}">
    <fieldset>
        <div id="legend" class="col-lg-12" >
            <legend class="">肯定语气词规则</legend>
            <label class="col-sm-1 control-label label-50 add-label" ><button class="btn btn-sm btn-primary " onclick="ReguConfig.addMoodEn()">更新</button></label>
        </div>
    </fieldset>
    <div class="form-inline inline-div" id="mood-regu-div">
        <div>
            <input type="hidden" name="id"/>
            <label class="col-sm-1 control-label label-60">跳转</label>
            <div class="col-sm-2 width-400 mood-status-div"></div>
        </div>
    </div>
    <br/>
    <br/>
    <br/>
    <fieldset>
        <div id="legend" class="col-lg-12">
            <legend class="">答非所问规则</legend>
            <label class="col-sm-1 control-label label-50 add-label" ><button class="btn btn-sm btn-primary " onclick="ReguConfig.addMatchRe()">增加</button></label>
        </div>
    </fieldset>
    <div class="form-inline inline-div" id="match-regu-div">
        <div style="height: 34px;">
            <label class="col-sm-1 control-label label-50 " >from</label>
            <div class="col-sm-2 width-130 match-status-div" ></div>
            <label class="col-sm-1 control-label label-50 ml-1p" >to</label>
            <div class="col-sm-2 width-130 match-status-div" ></div>
            <label class="col-sm-1 control-label label-60 ml-1p" >次数</label>
            <div class="col-sm-2 width-130 match-times-div"></div>
        </div>
        <table class="table table-bordered table-hover" style="width: 100%;margin-top: 10px;">
            <thead>
            <tr>
                <th>名称</th><th>from</th><th>to</th><th>次数</th><th>操作</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
    <fieldset>
        <div id="legend" class="col-lg-12">
            <label class="col-sm-2 control-label label-50 add-label" ><button class="btn btn-sm btn-primary " onclick="ReguConfig.addAbnormalConfigs()">批量生成</button></label>
        </div>
    </fieldset>
    <div class="form-inline inline-div" id="abnormal-regu-div">
        <div style="height: 34px;">
            <label class="col-sm-1 control-label label-100">自定义话术</label>
            <div class="col-sm-2">
                <input type="text" class="form-control" name="tos" >
            </div>
            <label class="col-sm-3 control-label ml-2p ">ps:该规则只有模型开启答非所问匹配开关才会生效</label>
        </div>
        <table class="table table-bordered table-hover" style="width: 100%;margin-top: 10px;">
            <thead>
            <tr>
                <th>名称</th><th>from</th><th>自定义话术</th><th>挽回方式</th><th>操作</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
    <fieldset>
        <div id="legend" class="col-lg-12" >
            <legend class="">听不清规则</legend>
            <label class="col-sm-1 control-label label-50 add-label" ><button class="btn btn-sm btn-primary " onclick="ReguConfig.addNotHear()">更新</button></label>
        </div>
    </fieldset>
    <div class="form-inline inline-div" id="nothear-regu-div">
        <div style="height: 34px;">
            <input type="hidden" name="id"/>
            <label class="col-sm-1 control-label label-100">结束状态</label>
            <div class="col-sm-2 width-130 nothear-status-div"></div>
            <div class="col-sm-2 width-30 ">
                <input type="checkbox" value="needzj"  style="width: 20px;height: 20px;">
            </div>
            <label class="col-sm-2 width-130 "  style="margin-top: 7px;">
                是否转接
            </label>
        </div>
    </div>
    <br/>
    <fieldset>
        <div id="legend" class="col-lg-12">
            <legend class="">拒绝规则</legend>
            <label class="col-sm-1 control-label label-50 add-label" ><button class="btn btn-sm btn-primary" onclick="ReguConfig.addDenyConfigs()">批量生成</button></label>
        </div>
    </fieldset>
    <div class="form-inline inline-div" id="deny-regu-div" >
        <div style="height: 34px;">
            <label class="col-sm-1 control-label label-100">结束状态</label>
            <div class="col-sm-2 width-130 deny-status-div"></div>
            <label class="col-sm-1 control-label label-60 ml-1p">次数</label>
            <div class="col-sm-2 width-130 deny-times-div"></div>
        </div>
        <table class="table table-bordered table-hover" style="width: 100%;margin-top: 10px;">
            <thead>
            <tr>
                <th>名称</th><th>次数</th><th>适用状态</th><th>结束状态</th><th>操作</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
    <fieldset>
        <div id="legend" class="col-lg-12">
            <legend class="">情感转换规则</legend>
            <label class="col-sm-1 control-label label-50 add-label" ><button class="btn btn-sm btn-primary" onclick="ReguConfig.addEmotransConfigs()">增加</button></label>
        </div>
    </fieldset>
    <div class="form-inline inline-div" id="emotrans-regu-div" >
        <div style="height: 34px;">
            <label class="col-sm-1 control-label label-60">状态</label>
            <div class="col-sm-2 width-130 emotrans-status-div"></div>
            <label class="col-sm-1 control-label label-100 ml-1p">转换前</label>
            <div class="col-sm-2 width-130 emotrans-sentiment-div"></div>
            <label class="col-sm-1 control-label label-100 ml-1p">转换后</label>
            <div class="col-sm-2 width-130 emotrans-sentiment-div"></div>
        </div>
        <table class="table table-bordered table-hover" style="width: 100%;margin-top: 10px;">
            <thead>
            <tr>
                <th>状态</th><th>转换前</th><th>转换后</th><th>操作</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
    <fieldset>
        <div id="legend" class="col-lg-12">
            <legend class="">关联状态规则</legend>
            <label class="col-sm-1 control-label label-50 add-label" ><button class="btn btn-sm btn-primary" onclick="ReguConfig.addRelatedConfigs()">增加</button></label>
        </div>
    </fieldset>
    <div class="form-inline inline-div" id="related-regu-div" >
        <div style="height: 34px;">
            <label class="col-sm-1 control-label label-50">from</label>
            <div class="col-sm-2 width-130 related-status-div"></div>
            <label class="col-sm-1 control-label label-50 ml-1p">to</label>
            <div class="col-sm-2 width-130 related-status-div"></div>
        </div>
        <table class="table table-bordered table-hover" style="width: 100%;margin-top: 10px;">
            <thead>
            <tr>
                <th>from</th><th>to</th><th>条件</th><th>操作</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
    <fieldset>
        <div id="legend" class="col-lg-12" >
            <legend class="">纠错模块配置</legend>
            <label class="col-sm-1 control-label label-50 add-label" ><button class="btn btn-sm btn-primary " onclick="ReguConfig.addCorrectLine()">更新</button></label>
        </div>
    </fieldset>
    <div class="form-inline inline-div" id="correct-regu-div">
        <input type="hidden" name="id"/>
        <div class="row" style="height: 34px;">
            <div class="col-sm-2 width-30 " style="margin-left: 2%;">
                <input type="checkbox" value="translate"  style="width: 20px;height: 20px;margin-top: 7px;">
            </div>
            <div class="col-sm-2 width-400 " style="line-height: 34px;" >
                通用模块
            </div>
        </div>
        <div class="row" style="height: 34px;">
            <div class="col-sm-2 width-30 " style="margin-left: 2%;">
                <input type="checkbox" value="name"  style="width: 20px;height: 20px;margin-top: 7px;">
            </div>
            <div class="col-sm-2 width-130 " style="line-height: 34px;" >
                姓名模块
            </div>
            <div class="col-sm-2 width-130 correct-status-div"></div>
        </div>
        <div id="correct-regu-inner-div">
        </div>
    </div>
    <br/>
    <fieldset>
        <div id="legend" class="col-lg-12" >
            <legend class="">地名规则设置</legend>
            <label class="col-sm-1 control-label label-50 add-label" ><button class="btn btn-sm btn-primary " onclick="ReguConfig.addLocationStatus()">更新</button></label>
            <label class="col-sm-1 control-label label-50 add-label" ><button class="btn btn-sm btn-primary " onclick="ReguConfig.delLocationStatus()">清除</button></label>
        </div>
    </fieldset>
    <div class="form-inline inline-div" id="location-regu-div">
        <div style="height: 34px;">
            <input type="hidden" name="id"/>
            <label class="col-sm-1 control-label label-60">状态</label>
            <div class="col-sm-2 width-130 location-status-div"></div>
            <label class="col-sm-2 control-label label-100 ml-2p">非地名</label>
            <div class="col-sm-2 width-130 location-method-div"></div>
            <label class="col-sm-2 control-label label-60">省份</label>
            <div class="col-sm-2 width-130 location-method-div"></div>
            <label class="col-sm-2 control-label label-60">城市</label>
            <div class="col-sm-2 width-130 location-method-div"></div>

        </div>
    </div>
    <br/>
    <fieldset>
        <div id="legend" class="col-lg-12" >
            <legend class="">打断比例配置</legend>
            <label class="col-sm-1 control-label label-50 add-label" ><button class="btn btn-sm btn-primary " onclick="ReguConfig.addInterruptConfig()">增加</button></label>
        </div>
    </fieldset>
    <div class="form-inline inline-div" id="interrupt-regu-div">
        <div style="height: 34px;">
            <label class="col-sm-1 control-label label-50 ">from</label>
            <div class="col-sm-2 width-130 interrupt-status-div" ></div>
            <label class="col-sm-1 control-label label-100">百分率</label>
            <div class="col-sm-1">
                <div id="basic_slider" style="margin-top: 7px;"></div>
            </div>
            <label class="col-sm-1 control-label label-60" id="interrupt-per-div"></label>
        </div>
        <table class="table table-bordered table-hover" style="width: 100%;margin-top: 10px;">
            <thead>
            <tr>
                <th>名称</th><th>from</th><th>百分率</th><th>操作</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
    <fieldset>
        <div id="legend" class="col-lg-12" >
            <legend class="">直跳、集合型规则</legend>
            <label class="col-sm-1 control-label label-50 add-label" ><button class="btn btn-sm btn-primary" onclick="ReguConfig.addSetRe()">增加</button></label>
            <label class="col-sm-1 control-label label-50 add-label" ><button class="btn btn-sm btn-primary" onclick="ReguConfig.showlist()">集合</button></label>
        </div>
    </fieldset>
    <div class="form-inline inline-div" id="set-regu-div">
        <div style="height: 34px;">
            <label class="col-sm-1 control-label label-60">名称</label>
            <div class="col-sm-2">
                <input type="text" class="form-control" name="name" >
            </div>
            <label class="col-sm-1 control-label label-60 ml-5p">类型</label>
            <div class="col-sm-2 width-130 ml-2p">
                <select name="type" class="form-control" >
                    <option value="0">状态跳转</option>
                    <option value="1">情感转换</option>
                </select>
            </div>
            <div class="set-regu-type-div">
                <label class="col-sm-1 control-label label-50 ">from</label>
                <div class="col-sm-2 width-130 set-status-div" ></div>
                <label class="col-sm-1 control-label label-50 ml-1p" >to</label>
                <div class="col-sm-2 width-130 set-status-div" ></div>
                <label class="col-sm-1 control-label label-60 ml-1p" >方法</label>
                <div class="col-sm-2 width-160 set-method-div"></div>
                <label class="col-sm-1 control-label label-60 ml-1p" >集合</label>
                <div class="col-sm-2 width-200 set-div"></div>
                <label class="col-sm-1 control-label label-100 ml-1p" >直跳排除</label>
                <div class="col-sm-2 width-320 set-qd-method-div"></div>
            </div>
            <div class="set-regu-type-div hide">
                <label class="col-sm-1 control-label label-50 " >Q&D</label>
                <div class="col-sm-2 width-320 set-qd-method-div-1"></div>
                <label class="col-sm-1 control-label label-60" >集合</label>
                <div class="col-sm-2 width-180 set-div"></div>
                <label class="col-sm-1 control-label label-100 ml-1p">适用状态</label>
                <div class="col-sm-2 width-400 set-status-div-1" ></div>
            </div>
        </div>
        <table class="table table-bordered table-hover" style="width: 100%;margin-top: 10px;">
            <thead>
            <tr>
                <th>名称</th><th>类型</th><th>from/适用状态</th><th>to/QD</th><th>方法</th><th>集合</th><th>直跳排除</th><th>优先级</th><th>操作</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
    <fieldset>
        <div id="legend" class="col-lg-12">
            <legend class="">数值性规则</legend>
            <label class="col-sm-1 control-label label-50 add-label" ><button class="btn btn-sm btn-primary " onclick="ReguConfig.addNumRe()">增加</button></label>
            <label class="col-sm-1 control-label label-50 add-label" ><button class="btn btn-sm btn-primary " onclick="ReguConfig.addNumHelp()">帮助</button></label>
        </div>
    </fieldset>
    <div class="form-inline inline-div"  id="num-regu-div">
        <div class="col-lg-12 col-md-8 col-xs-5" style="min-height: 50px;">
            <label class="col-sm-1 control-label label-60">名称</label>
            <div class="col-sm-2 no-padding width-200">
                <input type="text" class="form-control" name="name"  >
            </div>
            <label class="col-sm-1 control-label label-50 ml-1p" >from</label>
            <div class="col-sm-2 width-130 num-status-div "></div>
            <label class="col-sm-1 control-label label-50 ml-1p" >to</label>
            <div class="col-sm-2 width-130 num-to-status-div-1" ></div>
            <div class="col-sm-2 width-130 num-to-status-div-2" ></div>
            <label class="inline">
                <span class="lbl">下限</span>
            </label>
            <input type="number" class="form-control" style="width: 80px;" name="lower" >
            <label class="inline">
                <span class="lbl">上限</span>
            </label>
            <input type="number" class="form-control" style="width: 80px;" name="upper" >
            <label class="inline">
                <span class="lbl">单位</span>
            </label>
            <input type="text" class="form-control" style="width: 100px;" name="unit" >
            <label class="inline">
                <span class="lbl">必须包含单位</span>
            </label>
            <input type="checkbox"  name="needunit" >

        </div>
        <div class="col-lg-12 col-md-8 col-xs-5" style="min-height: 50px;">
            <label class="col-sm-1 control-label label-60">集合</label>
            <input type="text" class="form-control" name="outkeyword" placeholder="跳区间外状态">
            <input type="text" class="form-control" name="inkeyword" placeholder="跳区间内状态">
            <label class="inline">
                <span class="lbl">区间外优先</span>
            </label>
            <input type="checkbox"  name="reverse" >
        </div>
        <table class="table table-bordered table-hover" style="width: 100%;margin-top: 10px;">
            <thead>
            <tr>
                <th>名称</th><th>from</th><th>to</th><th>下限</th><th>上限</th><th>单位</th><th>单位必要性</th><th>关键词</th><th>优先级</th><th>操作</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
    <div class="row">
        <button class="btn btn-success" style="margin-left: 2%;"
                onclick="ReguConfig.initInRule()">生成规则
        </button>
    </div>
</div>
