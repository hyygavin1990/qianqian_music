<span style="position:absolute;right:40px;top:30px;color: red;font-size:10px;display: none;"   name="pointMessage"><b name="s2">5</b><span>秒后将接入</span></span>
<input type="hidden" name="callid">
<input type="hidden" name="isSubmit" value="0">
<input type="hidden" name="ishangup" value="0">
<!--翻译框-->
<div class="col-lg-6">
    <div name="messageDiv"></div>
</div>
<!--leads填写框-->
<div class="col-lg-6">
    <!--<div class="row" name="pointDiv" style="display: none;">
        <div class="col-md-12">
            <div class="firstTitle" style="height: 50px">
                <div class="userscore">
                    <span class="labelTxt" id="score"><label>用户项目打分:&nbsp&nbsp</label><span name="point1"></span>/100</span>
                </div>
                <div class="marking">
                    <span class="labelTxt">营销标签</span>
                    <span class="labelTxt" id="havebaby"> <label>有宝宝:&nbsp&nbsp</label><span name="point2"></span>%</span>
                    <span class="labelTxt" id="english"><label>英语教育:&nbsp&nbsp</label><span name="point3"></span>%</span>
                </div>
            </div>

        </div>
    </div>-->
    <div class="row">

        <form method="get" class="form-horizontal">

            <div class="col-md-6" name="leftDiv">
                <div class="label-box pretty-border">
                    <h4 class="titleBox">leads信息完善</h4>
                    <div class="form-group1"><label class="col-lg-4 control-label">转接类型</label>
                        <div class="col-lg-6"><p class="form-control-static" name="transferid"></p></div>
                    </div>
                    <div class="form-group1"><label class="col-lg-4 control-label">手机号</label>
                        <div class="col-lg-6"><p class="form-control-static" name="tel"></p></div>
                    </div>
                    ${projectHtml}

                </div>

            </div>
            <div class="col-md-6" name="rightDiv">
                <div class="label-box pretty-border">
                    <h4 class="titleBox">你还能听到其他用户的信息</h4>
                    ${otherHtml}
                </div>

            </div>
        </form>

    </div>

    <br>
    <div class="row">
        <div class="col-lg-12" style="text-align: center">
            <!--<button  class="btn btn-primary" style="width: 150px;" onclick="home.hangup()">挂断电话</button>-->
            <button id="sub" class="btn btn-danger" style="width: 150px;" onclick="">提交</button>

        </div>
    </div>
</div>