<div class="row wrapper border-bottom white-bg page-heading" style="background: #CCDDFF">
    <div style="text-align: left; color: black;padding-left: 20px;padding-top: 12px">
        <span style="font-size: 26px;">${nowTime}平台总览</span>
    </div>
</div>
  <div class="wrapper wrapper-content">
      <div class="row">
          <div class="col-lg-12">
              <div class="ibox ">
                  <div class="ibox-content" style="background: #DDDDDD">
                      <div class="bar search-bar" style="font-size: 15px;">
                          当前数据除余额外均为实时数据，余额数据请在当日24点过后再行查看。<br>
                      </div>
                  </div><br>
                  <div class="row">
                      <div class="col-lg-2">
                          <div class="ibox float-e-margins">
                              <div class="ibox-title">
                                  <#--<span class="label label-success pull-right">TotalDial-out</span>-->
                                  <h5>总呼出量</h5>
                              </div>
                              <div class="ibox-content">
                                  <h1 class="no-margins">${totalNum}</h1>
                              </div>
                          </div>
                      </div>
                      <div class="col-lg-2">
                          <div class="ibox float-e-margins">
                              <div class="ibox-title">
                                  <#--<span class="label label-success pull-right">TotalConnected</span>-->
                                  <h5>总接通数</h5>
                              </div>
                              <div class="ibox-content">
                                  <h1 class="no-margins">${sumaiNum}</h1>
                              </div>
                          </div>
                      </div>
                      <div class="col-lg-2">
                          <div class="ibox float-e-margins">
                              <div class="ibox-title">
                                  <#--<span class="label label-primary pull-right">PlatformSubsidies</span>-->
                                  <h5>平台补助</h5>
                              </div>
                              <div class="ibox-content">
                                  <h1 class="no-margins">${moneySubsidy}</h1>
                              </div>
                          </div>
                      </div>
                      <div class="col-lg-2">
                          <div class="ibox float-e-margins">
                              <div class="ibox-title">
                                  <#--<span class="label label-primary pull-right">TopUp</span>-->
                                  <h5>充值金额</h5>
                              </div>
                              <div class="ibox-content">
                                  <h1 class="no-margins">${dayTotalRecharge}</h1>
                              </div>
                          </div>
                      </div>
                      <div class="col-lg-2">
                          <div class="ibox float-e-margins">
                              <div class="ibox-title">
                                  <#--<span class="label label-danger pull-right">OtherDeductions</span>-->
                                  <h5>其他扣款</h5>
                              </div>
                              <div class="ibox-content">
                                  <h1 class="no-margins">${moneyOther}</h1>
                              </div>
                          </div>
                      </div>
                      <div class="col-lg-2">
                          <div class="ibox float-e-margins">
                              <div class="ibox-title">
                                  <#--<span class="label label-danger pull-right">Daily Cost</span>-->
                                  <h5>总消费金额</h5>
                              </div>
                              <div class="ibox-content">
                                  <h1 class="no-margins">${dailyConsumption}</h1>
                              </div>
                          </div>
                      </div>
              </div>
              <div class="jqGrid_wrapper">
              <#--jqgrid 表格栏-->
                  <table id="grid-table"></table>
              <#--jqgrid 分页栏-->
                  <div id="grid-pager"></div>
              </div>
          </div>
      </div>
  </div>
