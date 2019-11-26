<div class="col-xs-12">
    <fieldset>
        <div id="legend"   >
            <legend class="">配置语料</legend>
            <label class="col-sm-1 control-label label-50 add-label" ><button class="btn btn-sm btn-primary" onclick="Sentiment.addAllCorpus()">一键配置</button></label>
        </div>
    </fieldset>
    <table id="grid-table-s"></table>
    <div id="grid-pager-s"></div>
    <br/>
    <br/>
    <br/>
    <div class="form-horizontal" id="init-model-form">
        <fieldset>
            <div id="legend" >
                <legend class="">模型启动参数</legend>
            </div>
        </fieldset>
        <div class="form-horizontal">
            <input type="hidden" name="id" />
            <div class="form-group">
                <label class="col-sm-1 control-label">路由</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" name="route"/>
                </div>
            </div>
            <div class="hr-line-dashed"></div>
            <div class="form-group">
                <label class="col-sm-1 control-label">一句话多含义</label>
                <label class="col-sm-2 control-label label-100 ml-1p " style="padding-right: 0;">是否开启</label>
                <div class="col-sm-1">
                    <select class="form-control" name="sentence_multi_open" onchange="Sentiment.changeSentenceMulti(this);" >
                        <option value="0">否</option>
                        <option value="1">是</option>
                    </select>
                </div>
                <div id="qd-privilege-div" class="hide">
                    <label class="col-sm-2 control-label label-100 ml-1p " style="padding-right: 0;">QD优先级</label>
                    <div class="col-sm-2">
                        <select class="form-control" name="qd_privilege">
                            <option value="0">开头优先</option>
                            <option value="1">结尾优先</option>
                            <option value="2">比例优先</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="hr-line-dashed"></div>
            <div class="form-group">
                <label class="col-sm-1 control-label">万能话术</label>
                <label class="col-sm-2 control-label label-100 ml-1p " style="padding-right: 0;">是否开启</label>
                <div class="col-sm-1">
                    <select class="form-control" name="universal_open" onchange="Sentiment.changeUniversal(this);">
                        <option value="0">否</option>
                        <option value="1">是</option>
                    </select>
                </div>
                <div id="novel-threshold-div" class="hide">
                    <label class="col-sm-2 control-label label-100 ml-1p " style="padding-right: 0;">宽松程度</label>
                    <div class="col-sm-1">
                        <select class="form-control" name="novel_threshold">
                            <option value="1">严格</option>
                            <option value="0">宽松</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="hr-line-dashed"></div>
            <div class="form-group">
                <label class="col-sm-1 control-label">文本强制匹配</label>
                <label class="col-sm-2 control-label label-100 ml-1p " style="padding-right: 0;">是否开启</label>
                <div class="col-sm-1">
                    <select class="form-control" name="corpus_match_open" onchange="Sentiment.changeCorpusMatch(this);">
                        <option value="0">否</option>
                        <option value="1">严格</option>
                        <option value="2">宽松</option>
                    </select>
                </div>
                <div id="corpus-match-length-div" class="hide">
                    <label class="col-sm-2 control-label label-100 ml-1p " style="padding-right: 0;">匹配长度</label>
                    <div class="col-sm-1">
                        <input type="number" class="form-control" name="corpus_match_length"/>
                    </div>
                </div>
                <div id="corpus-similar-thold-div" class="hide">
                    <label class="col-sm-2 control-label label-100 ml-1p " style="padding-right: 0;">相似度门限</label>
                    <div class="col-sm-1">
                        <input type="number" class="form-control" name="corpus_similar_thold"/>
                    </div>
                    <label class="col-sm-1 control-label  label-50 ml-2p" style="padding-right: 0;">%</label>
                </div>
            </div>
            <div class="hr-line-dashed"></div>
            <div class="form-group">
                <label class="col-sm-1 control-label">答非所问</label>
                <label class="col-sm-2 control-label label-100 ml-1p " style="padding-right: 0;">是否开启</label>
                <div class="col-sm-1">
                    <select class="form-control" name="corpus_abnormal_open" onchange="Sentiment.changeCorpusAbnormal(this);">
                        <option value="0">否</option>
                        <option value="1">是</option>
                    </select>
                </div>
                <div id="corpus-abnormal-thold-div" class="hide">
                    <label class="col-sm-2 control-label label-100 ml-1p " style="padding-right: 0;">相似度门限</label>
                    <div class="col-sm-1">
                        <input type="number" class="form-control" name="corpus_abnormal_thold"/>
                    </div>
                    <label class="col-sm-1 control-label  label-50 ml-2p" style="padding-right: 0;">%</label>
                </div>
            </div>
            <div class="hr-line-dashed"></div>
            <div id ="default-confirm-div"></div>
            <div class="hr-line-dashed"></div>
            <div class="form-group">
                <div class="col-sm-4 col-sm-offset-1">
                    <button class="btn btn-primary" onclick="Sentiment.updateMgParams()">更新参数</button>
                </div>
            </div>
        </div>
        <div class="control-auth form-horizontal" id="create-model-form" data-auth="regulation_verify">
            <fieldset>
                <div id="legend" >
                    <legend class="">模型生成</legend>
                </div>
            </fieldset>
            <div class="form-horizontal">
                <div class="form-group">
                    <label class="col-sm-1 control-label">版本</label>
                    <div class="col-sm-1">
                        <select class="form-control" name="branchid">
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-1 control-label">版本描述</label>
                    <div class="col-sm-8">
                        <div class="textarea">
                            <textarea name="desc" style="resize:none;width: 100%;height:100px;border: 1px solid #e5e6e7;border-radius: 1px"></textarea>
                        </div>
                    </div>
                </div>
                <div class="hr-line-dashed"></div>
                <div class="form-group">
                    <div class="col-sm-4 col-sm-offset-1">
                        <button class="control-auth btn btn-primary" data-auth="regulation_verify" onclick="Sentiment.createModel()">生成模型</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="control-auth form-horizontal" id="choose-model-form" data-auth="regulation_verify">
            <fieldset>
                <div id="legend" >
                    <legend class="">选择模型</legend>
                    <button class="btn btn-sm btn-primary "   onclick="Sentiment.changeModel()">切换</button>
                </div>
            </fieldset>
            <div class="form-inline" id="modelRadioDiv">
                <div class="row" style="height: 34px;">
                    <div class="col-sm-2 width-400 " style="line-height: 34px;">
                        无
                    </div>
                </div>
            </div>
        </div>


    </div>
</div>



