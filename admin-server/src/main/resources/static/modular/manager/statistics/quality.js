var QualityStatistics = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null ,
    domain: "counts_manager"
};


/**
 * 改变项目  更新批次下拉框
 */
QualityStatistics.changeCompany = function () {
    //改变工程  更新项目下拉框
    var companyId =$("#companyId").val() || '';
    if(companyId==""){
        $("#projectId").html('<option value="">不限</option>');
    }else{
        var html = '<option value="">不限</option>';
        $.ajax({
            url: "/quality/getProjectData?companyId=" + companyId,
            type: 'GET',
            dataType: "json",
            success: function (r) {
                var projects = r.obj;
                if(projects.length>0){
                    for(var i=0;i<projects.length;i++){
                        html+='<option value="'+projects[i].id+'">'+projects[i].name+'</option>';
                    }
                }
                $("#projectId").html(html);
            }
        })
    }

}


//改变项目状态
QualityStatistics.changeProject = function () {
    //改变项目  加载iframe框

    var projectId =$("#projectId").val() || '';
    $.ajax({
        url: "/quality_statistics/url?projectId=" + projectId,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            var project = r.obj;
            var src = project.iframeurl;
            $("iframe").attr('src',src);
        }
    })

}


$(function() {
    QualityStatistics.changeCompany();
});