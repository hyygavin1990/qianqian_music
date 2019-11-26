<#--新增状态弹框-->
<div class="modal fade" id="createStateModal" tabindex="-1" role="dialog" aria-labelledby="modalStateTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalStateTitle">新增状态</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="create-state-form">
                    <input type="hidden"  name="rid">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">名称</label>
                        <div class="col-sm-1 control-label" style="width: 2px;">Z-</div>
                        <div class="col-md-2" style="padding:0px;">
                            <input type="number" class="form-control" name="name"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">话术</label>
                        <div class="col-sm-8">
                            <div class="textarea">
                                <textarea name="value" style="resize:none;width: 100%;height:100px;border: 1px solid #e5e6e7;border-radius: 1px" > </textarea>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">评分</label>
                        <div class="col-sm-8">
                            <input type="number" class="form-control" name="score"/>
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Stateinfo.insert()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#--编辑状态弹框-->
<div class="modal fade" id="editStateModal" tabindex="-1" role="dialog" aria-labelledby="modalStateTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalStateTitle">编辑状态</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="edit-state-form">
                    <input type="hidden" name="id">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">话术</label>
                        <div class="col-sm-10">
                            <div class="textarea">
                                <textarea name="value" style="resize:none;width: 100%;height:100px;border: 1px solid #e5e6e7;border-radius: 1px" > </textarea>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">评分</label>
                        <div class="col-sm-10">
                            <input type="number" class="form-control" name="score">
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Stateinfo.update()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>

            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<#--新增跳转弹框-->
<div class="modal fade" id="createEventModal" tabindex="-1" role="dialog" aria-labelledby="modalEventTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalEventTitle">新增跳转</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="create-event-form">
                    <input type="hidden"  name="rid">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">适用状态</label>
                        <div class="col-sm-4" id="add_from_div">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">适用状态</label>
                        <div class="col-sm-4" id="add_to_div">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">触发类型</label>
                        <div class="col-sm-4">
                            <select id="industrySel" data="#sentiSel" class="form-control industrySel" style="width: 150px;">
                            </select>
                        </div>
                        <div class="col-sm-4">
                            <select id="sentiSel" name="sid" class="form-control sentiSel" style="width: 150px;">
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">是否主线</label>
                        <div class="col-sm-4">
                            <select  name="isMain" class="form-control industrySel" style="width: 150px;">
                                <option value="0">否</option>
                                <option value="1">是</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">标记</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" name="marks" />
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Eventinfo.insert()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#--编辑跳转弹框-->
<div class="modal fade" id="editEventModal" tabindex="-1" role="dialog" aria-labelledby="modalEventTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalEventTitle">编辑跳转</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="edit-event-form">
                    <input type="hidden"  name="id">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">触发类型</label>
                        <div class="col-sm-4">
                            <select id="industrySel1" data="#sentiSel1" class="form-control industrySel" style="width: 150px;">
                            </select>
                        </div>
                        <div class="col-sm-4">
                            <select id="sentiSel1" name="sid" class="form-control sentiSel" style="width: 150px;">
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">是否主线</label>
                        <div class="col-sm-4">
                            <select name="isMain" class="form-control" style="width: 150px;">
                                <option value="0">否</option>
                                <option value="1">是</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">标记</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" name="marks"/>
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Eventinfo.update()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>

            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<#--新增打断库弹框-->
<div class="modal fade" id="createIndeModal" tabindex="-1" role="dialog" aria-labelledby="modalIndeTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalIndeTitle">新增打断库</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="create-inde-form">
                    <input type="hidden"  name="rid">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">名称</label>
                        <div class="col-sm-1 control-label" style="width: 2px;">T-</div>
                        <div class="col-md-2" style="padding:0px;">
                            <input type="number" class="form-control" name="name" readonly/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">适用状态</label>
                        <div class="col-sm-10" id="add_status_div">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">话术</label>
                        <div class="col-sm-8">
                            <div class="textarea">
                                <textarea name="content" style="resize:none;width: 100%;height:100px;border: 1px solid #e5e6e7;border-radius: 1px" ></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">触发类型</label>
                        <div class="col-sm-4">
                            <select id="industrySel2" data="#sentiSel2" class="form-control industrySel1" style="width: 150px;">
                            </select>
                        </div>
                        <div class="col-sm-4">
                            <select id="sentiSel2" name="sid" class="form-control" style="width: 150px;">
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">是否转接</label>
                        <div class="col-sm-10">
                            <input type="checkbox" class="js-switch" />
                            <input type="hidden" name="zjtype"/>
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="InterruptDetail.insert()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#--编辑打断库弹框-->
<div class="modal fade" id="editIndeModal" tabindex="-1" role="dialog" aria-labelledby="modalIndeTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalIndeTitle">编辑打断库</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="edit-inde-form">
                    <input type="hidden"  name="id">
                    <input type="hidden"  name="rid">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">名称</label>
                        <div class="col-sm-1 control-label" style="width: 2px;">T-</div>
                        <div class="col-md-2" style="padding:0px;">
                            <input type="number" class="form-control" name="name"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">适用状态</label>
                        <div class="col-sm-10" id="edit_status_div">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">话术</label>
                        <div class="col-sm-8">
                            <div class="textarea">
                                <textarea name="content" style="resize:none;width: 100%;height:100px;border: 1px solid #e5e6e7;border-radius: 1px" ></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">触发类型</label>
                        <div class="col-sm-4">
                            <select id="industrySel3" data="#sentiSel3" class="form-control industrySel1" style="width: 150px;">
                            </select>
                        </div>
                        <div class="col-sm-4">
                            <select id="sentiSel3" name="sid" class="form-control" style="width: 150px;">
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">是否转接</label>
                        <div class="col-sm-10">
                            <input type="checkbox" class="js-switch" />
                            <input type="hidden" name="zjtype"/>
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="InterruptDetail.update()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>

            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#--编辑集合弹框-->
<div class="modal fade" id="setGridModal" tabindex="-1" role="dialog" aria-labelledby="modalSetGridTitle" aria-hidden="true" >
    <div class="modal-dialog">
        <div class="modal-content" style="width: 172%;margin-left: -50%">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalSetGridTitle">集合列表</h4>
            </div>
            <div class="modal-body">
                <div class="row" style="margin-left:-2%;margin-bottom: 0.5%;">
                    <form enctype="multipart/form-data" class="form-horizontal" method="post"
                          id="sets-upload-form">
                        <div class="col-xs-1 no-padding" style="width:40px;margin-top: 7px;">
                            <label class="col-sm-2 control-label no-padding" style=" width:40px;">名称</label>
                        </div>
                        <div class="col-xs-3" style=" width:140px;padding-right: 0;">
                            <input type="text" class="form-control" name="name"/>
                        </div>
                        <div class="col-xs-1 no-padding" style="width:40px;margin-top: 7px;">
                            <label class="col-sm-2 control-label no-padding" style="width:40px;">数据</label>
                        </div>
                        <div class="col-xs-3">
                            <div class="uploadFileBox" style="margin-top: 0px;margin-left: 0px">
                                <input type="hidden" name="rid" value="">
                                <input class="form-control" name="txt"
                                       onchange="Wizard.showfile(this)" type="file"/>
                                <span>上传txt文件(UTF8格式)</span>
                            </div>
                        </div>
                        <div class="col-xs-2">
                            <input type="button" value="上传集合" data="sets-upload-form|/trigger/set/add"
                                   style="margin-top:0.5%;margin-left: 2%;"
                                   onclick="alert('已经提交成功！！请勿重复提交！！')"
                                   class="submit btn btn-sm btn-primary">
                        </div>
                    </form>
                </div>

                <table id="grid-table-3"></table>

                <div id="grid-pager-3"></div>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>

            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<#--项目初始化参数弹框-->
<div class="modal fade" id="editInitParamModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="initParamModalTitle">初始化项目参数</h4>
                <input type="hidden" name="rid" value="">
                <input type="hidden" name="isUpdate" value="false">
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="initParam-form">
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Voice.insertInitParam()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>



<#--手动增加话术弹框-->
<div class="modal fade" id="insertVoiceRobotModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="insertVoice">新增话术</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="voiceRobot-form">
                    <input type="hidden" name="rid" value="">
                    <div class="form-group">
                        <label class="col-sm-4 control-label">状态</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" name="name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-4 control-label">话术</label>
                        <div class="col-sm-8">
                            <input type="text"   class="form-control" name="content">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Voice.insertVoiceRobot()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>

            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<#--编辑话术弹框-->
<div class="modal fade" id="editVoiceRobotModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="editVoice">编辑话术</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="editVoiceRobot-form">
                    <input type="hidden" name="rid" value="">
                    <input type="hidden" name="id" value="">
                    <div class="form-group">
                        <label class="col-sm-4 control-label">状态</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" name="name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-4 control-label">话术</label>
                        <div class="col-sm-8">
                            <input type="text"   class="form-control" name="content">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Voice.updateVoiceRobot()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<#--新增录音弹框-->
<div class="modal fade" id="insertVoiceModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" >新增录音</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="voice-form">
                    <input type="hidden" name="rid" value="">
                    <div class="form-group">
                        <label class="col-sm-4 control-label">名称</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" name="name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-4 control-label">性别</label>
                        <div class="col-sm-8">
                            <select  class="form-control" name="sex">
                                <option value="0">不指定性别</option>
                                <option value="1">男</option>
                                <option value="2">女</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="RobotVoice.insertVoice()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<#--编辑录音弹框-->
<div class="modal fade" id="editVoiceModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" >编辑</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="editVoice-form">
                    <input type="hidden" name="rid" value="">
                    <input type="hidden" name="id" value="">
                    <div class="form-group">
                        <label class="col-sm-4 control-label">名称</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" name="name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-4 control-label">性别</label>
                        <div class="col-sm-8">
                            <select  class="form-control" name="sex">
                                <option value="0">不指定性别</option>
                                <option value="1">男</option>
                                <option value="2">女</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="RobotVoice.updateVoice()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<#--批量上传录音弹框-->
<div class="modal fade" id="batchUploadVoice" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" >批量上传录音</h4>
            </div>
            <div class="modal-body">
                <form enctype="multipart/form-data" action="" method="post" id="voiceImport-form">
                    <input type="hidden" name="rid" value="">
                    <input type="hidden" name="id" value="">
                    <h2 name="name"></h2>
                    <h2>请选择本地的录音</h2>
                    <h2>可以多选，但一次性选择太多会影响网络</h2>
                    <input id="wav" name="wav" class="file" type="file" multiple
                           data-min-file-count="1"> <br>
                    <button type="button" onclick="RobotVoice.batchImport(this);" class="btn btn-primary">提交</button>
                    <button type="reset" class="btn btn-default">重置</button>
                </form>
            </div>
            <div class="modal-footer">
            <#--<button type="button" class="btn btn-sm btn-primary" onclick="RobotVoice.updateVoice()">确定</button>-->
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<#--试听录音弹框-->
<div class="modal fade" id="playVoice" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" >试听录音</h4>
            </div>
            <div class="modal-body">
                <input type="hidden" name="rid" value="">
                <input type="hidden" name="id" value="">
                <div id="allVoice">

                </div>
            </div>
            <div class="modal-footer">
            <#--<button type="button" class="btn btn-sm btn-primary" onclick="RobotVoice.updateVoice()">确定</button>-->
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>


<div class="modal fade" id="syncVoiceModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" >录音同步</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="">
                    <input type="hidden" id="voiceId" name="voiceId">
                    <div class="form-group">
                        <label class="col-sm-2 control-label"></label>
                        <div class="col-sm-10">
                            <label><input type="checkbox" id="all" name="all" value="" onclick="checkAll()">全选</label><br>
                            <div id="cti_container">
                            </div>
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="RobotVoice.syncVoice()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>

            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<#--编辑关联状态的弹框-->
<div class="modal fade" id="relatedGridModal" tabindex="-1" role="dialog" aria-labelledby="modalRelatedGridTitle" aria-hidden="true" >
    <div class="modal-dialog">
        <div class="modal-content" style="width: 172%;margin-left: -50%">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalSetGridTitle">条件列表</h4>
            </div>
            <div class="modal-body">
                <div class="row" style="margin-left:-2%;margin-bottom: 0.5%;">
                    <form class="form-horizontal" method="post"
                          id="related-condition-form">
                        <div class="col-xs-1 no-padding" style="width:40px;margin-top: 7px;">
                            <input type="hidden" class="form-control" name="id"/>
                            <label class="col-sm-2 control-label no-padding" style=" width:40px;">状态</label>
                        </div>
                        <div class="col-xs-3 related-condition-status-div" style=" width:140px;padding-right: 0;">
                        </div>
                        <div class="col-xs-1 no-padding" style="width:40px;margin-top: 7px;">
                            <label class="col-sm-2 control-label no-padding" style="width:40px;">情感</label>

                        </div>
                        <div class="col-xs-3 related-sentiment-div" style=" width:140px;padding-right: 0;">
                        </div>
                        <div class="col-xs-2">
                            <input type="button" value="增加" style="margin-top:0.5%;margin-left: 2%;"
                                   onclick="ReguConfig.addRelatedCondition()"
                                   class="btn btn-sm btn-primary">
                        </div>
                    </form>
                </div>

                <table class="table table-bordered table-hover" style="width: 100%;margin-top: 10px;">
                    <thead>
                    <tr>
                        <th>状态</th><th>情感</th><th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>

            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<#--选择语料弹窗-->
<#--<div class="modal fade" id="chooseCorpusModel" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" >选择语料</h4>
            </div>
            <div class="modal-body">
                <input type="hidden" name="xid"/>
                <input type="hidden" name="type"/>
                <div style="margin-bottom: 5px;" id="clusterIdsDiv">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content &ndash;&gt;
    </div><!-- /.modal &ndash;&gt;
</div>-->
<#--编辑集合弹框-->
<div class="modal fade" id="chooseCorpusModel" tabindex="-1" role="dialog" aria-labelledby="modalchooseCorpusTitle" aria-hidden="true" >
    <div class="modal-dialog">
        <div class="modal-content" style="width: 272%;margin-left: -85%">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalChooseCorpusTitle">选择语料</h4>
            </div>
            <div class="modal-body">
                <div class="row" style="margin-bottom: 0.5%;">
                    <div class="col-xs-6" style="padding-left: 20px;" id="noChooseSearchDiv">
                        <input type="hidden" name="xid"/>
                        <input type="hidden" name="type"/>
                        <div class="col-xs-1 no-padding " style="width:30px;margin-top: 7px;">
                            <label class="col-sm-1 control-label no-padding" style=" width:30px;">文本</label>
                        </div>
                        <div class="col-xs-2 no-margins" >
                            <input type="text" class="form-control" name="text"/>
                        </div>
                        <div class="col-xs-1 no-padding" style="width:30px;margin-top: 7px;">
                            <label class="col-sm-1 control-label no-padding" style="width:30px;">方式</label>
                        </div>
                        <div class="col-xs-2 no-margins">
                            <select name="textopt" class="form-control" >
                                <option value="0">包含</option>
                                <option value="1">不包含</option>
                            </select>
                        </div>
                        <div class="col-xs-1 no-padding" style="width:30px;margin-top: 7px;">
                            <label class="col-sm-1 control-label no-padding" style="width:30px;">情感</label>
                        </div>
                        <div class="col-xs-2 no-margins">
                            <select name="sentiment" class="form-control" onchange="Sentiment.changeSentiment(this,'#noChooseSearchDiv')" ></select>
                        </div>
                        <div class="col-xs-1 no-padding" style="width:30px;margin-top: 7px;">
                            <label class="col-sm-1 control-label no-padding" style="width:30px;">聚类</label>
                        </div>
                        <div class="col-xs-2">
                            <select name="clusterid" class="form-control" ></select>
                        </div>
                        <div class="col-xs-2 no-padding">
                            <input type="button" value="搜索"
                                   style="margin-top:0.5%;"
                                   onclick="CorpusNoChoose.search()"
                                   class="btn btn-sm btn-primary">
                            <input type="button" value="选择"
                                   style="margin-top:0.5%;margin-left: 2%;"
                                   onclick="CorpusNoChoose.batchChooseCorpus()"
                                   class="btn btn-sm btn-success">
                        </div>
                    </div>
                    <div class="col-xs-6" style="padding-left: 20px;" id="chooseSearchDiv">
                        <input type="hidden" name="xid"/>
                        <input type="hidden" name="type"/>
                        <div class="col-xs-1 no-padding " style="width:30px;margin-top: 7px;">
                            <label class="col-sm-1 control-label no-padding" style=" width:30px;">文本</label>
                        </div>
                        <div class="col-xs-2 no-margins" >
                            <input type="text" class="form-control" name="text"/>
                        </div>
                        <div class="col-xs-1 no-padding" style="width:30px;margin-top: 7px;">
                            <label class="col-sm-1 control-label no-padding" style="width:30px;">方式</label>
                        </div>
                        <div class="col-xs-2 no-margins">
                            <select name="textopt" class="form-control" >
                                <option value="0">包含</option>
                                <option value="1">不包含</option>
                            </select>
                        </div>
                        <div class="col-xs-1 no-padding" style="width:30px;margin-top: 7px;">
                            <label class="col-sm-1 control-label no-padding" style="width:30px;">情感</label>
                        </div>
                        <div class="col-xs-2 no-margins">
                            <select name="sentiment" class="form-control" onchange="Sentiment.changeSentiment(this,'#chooseSearchDiv')"></select>
                        </div>
                        <div class="col-xs-1 no-padding" style="width:30px;margin-top: 7px;">
                            <label class="col-sm-1 control-label no-padding" style="width:30px;">聚类</label>
                        </div>
                        <div class="col-xs-2">
                            <select name="clusterid" class="form-control"   ></select>
                        </div>
                        <div class="col-xs-2 no-padding">
                            <input type="button" value="搜索"
                                   style="margin-top:0.5%;"
                                   onclick="CorpusChoose.search()"
                                   class="btn btn-sm btn-primary">
                            <input type="button" value="恢复"
                                   style="margin-top:0.5%;margin-left: 2%;"
                                   onclick="CorpusChoose.batchReChooseCorpus()"
                                   class="btn btn-sm btn-warning">
                        </div>
                    </div>
                </div>
                <div class="row" style="margin-bottom: 0.5%;">
                    <div class="col-xs-6">
                        <table id="grid-table-cnc"></table>

                        <div id="grid-pager-cnc"></div>
                    </div>
                    <div class="col-xs-6">
                        <table id="grid-table-cc"></table>

                        <div id="grid-pager-cc"></div>
                    </div>
                </div>


            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>

            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#--模型训练情况弹窗-->
<div class="modal fade" id="errorEvalLogModel" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" >选择语料</h4>
            </div>
            <div class="modal-body ">
                <table id="grid-table-e"></table>
                <div id="grid-pager-e"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#--模型错误日志弹窗-->
<div class="modal fade" id="errorTrainLogModel" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" >选择语料</h4>
            </div>
            <div class="modal-body ">
                <div class="row" style="margin-left:1%;margin-bottom: 0.5%;">
                        <div class="col-xs-1 no-padding" style="margin-top: 7px;">
                            <label class="control-label" >状态</label>
                        </div>
                        <div class="col-xs-3 " style=" width:140px;padding: 0;">
                            <input type="text" class="form-control" name="fromstatus"/>
                        </div>
                        <div class="col-xs-2">
                            <input type="button" value="查询" class="btn btn-sm btn-primary" onclick="ErrorTrainLog.search()">
                        </div>
                </div>

                <table id="grid-table-et"></table>
                <div id="grid-pager-et"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>