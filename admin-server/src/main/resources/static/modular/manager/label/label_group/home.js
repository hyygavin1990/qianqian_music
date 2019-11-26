var websocket = null;
//var is_submit = 0;
var callid;
//var ishangup=0;
var ids = [];

var tabContainer;


$(function () {
    tabContainer = $("#tabContainer");
    tabContainer.tabs({
        data: [
            {
                id: "model",
                text: "model",
                url: "/label_group/relation/home/tab?groupId="+$("#groupId").val()+"&batch="+$("#batch").val(),
                closeable: true
            },
            {
                id: "model2",
                text: "model2",
                url: "/label_group/relation/home/tab?groupId="+$("#groupId").val()+"&batch="+$("#batch").val(),
                closeable: true
            }],
        showIndex: 0,
        loadAll: false
    });

    $("#effect").click(function (){
            $.ajax({
                url: '/label_group/relation/effect?groupId=' + $("#groupId").val()+"&batch="+$("#batch").val(),
                type: "GET",
                dataType: "json",
                success: function (r) {
                    if(r.code==0){
                        window.location.href = "/label_group/relation/list?labelGroupId="+$("#groupId").val();
                    }
                }
            })
    });

    $("body").on("click", "#sub", function () {
        var tabid = $("#tabContainer").data("tabs").getCurrentTabId();

        //判断是否选中质检成功radio
        var  radioFlgs = $("input[name=flg]");
        if(radioFlgs.length >0 ){
            if($("input[name=flg]:checked").length ==0){
                $("input[name=flg]").each(function(){
                    if($(this).val() == "否"){
                        $(this).attr("checked",true);
                    }
                })
            }
        }
        var  keys = "";
        var values = "";
        var  tempIndex = 0;
        $("#"+tabid).find(".form-group").each(function(){
            var value = "";
            //判断是否存在文本框，并且获取值
            var textDom = $(this).find("input[type=text]")
            if(textDom.length>0){
                var key = textDom.attr("name");
                if(notContains(keys,key)){
                    if(keys==""){
                        keys = key;
                    }else{
                        keys+=","+key;
                    }
                }

                if(textDom.val()!=""){
                    value = textDom.val();
                }
            }

            if(value ==""){
                //判断存不存在日期选择框（年月日），并且获取值
                var dateDom = $(this).find("input[type=date]")
                if(dateDom.length>0){
                    value = dateDom.val();
                    var key = dateDom.attr("name");
                    if(notContains(keys,key)){
                        if(keys==""){
                            keys = key;
                        }else{
                            keys+=","+key;
                        }
                    }
                }
            }

            if(value ==""){
                //判断存不存在复选框，并且获取值
                var checkBoxDom = $(this).find("input[type=checkbox]")
                if(checkBoxDom.length>0){
                    var key = checkBoxDom.eq(0).attr("name");
                    if(notContains(keys,key)){
                        if(keys==""){
                            keys = key;
                        }else{
                            keys+=","+key;
                        }
                    }
                    $(this).find("input[type=checkbox]:checked").each(function(){
                        if(value ==""){
                            value = $(this).val();
                        }else{
                            value += "|"+$(this).val();
                        }
                    })
                }
            }

            if(value ==""){
                //判断存不存在单选框，并且获取值
                var radioDom = $(this).find("input[type=radio]")
                if(radioDom.length>0){
                    var key = radioDom.eq(0).attr("name");
                    if(notContains(keys,key)){
                        if(keys==""){
                            keys = key;
                        }else{
                            keys+=","+key;
                        }
                    }

                    $(this).find("input[type=radio]:checked").each(function(){
                        value = $(this).val();
                    })

                }
            }

            if(value ==""){
                //判断存不存在datetime-local，并且获取值
                var dateDom = $(this).find("input[type=datetime-local]")
                if(dateDom.length>0){
                    value = dateDom.val();
                    var key = dateDom.attr("name");
                    if(notContains(keys,key)){
                        if(keys==""){
                            keys = key;
                        }else{
                            keys+=","+key;
                        }
                    }

                }
            }
            //判断是否存在二级联动框
            var bool = true;

            if(value ==""){
                var selectDom = $(this).find("select");
                if(selectDom.length>0){
                    bool = false;
                    //判断存不存在二级联动下拉框，并且获取值
                    $(this).find(".selectpicker").each(function(){
                        var selectVal = $(this).val();
                        var key = $(this).attr("name");
                        if(key!=''){
                            if(keys==""){
                                keys = key;
                            }else{
                                keys+=","+key;
                            }
                        }

                        if(selectVal==""||selectVal==null){
                            values=values+"||"+"未填写";
                        }else{
                            values=values+"||"+selectVal;
                        }
                    });
                }
            }

            if(value==""){
                value ="未填写";
            }
            if(tempIndex==0){
                values= value;
            }else{
                if(bool){
                    values=values+"||"+value;
                }else{
                }
            }
            tempIndex++;

        });
        // alert(keys)
        console.log(keys);
        console.log(values);
    })
    


});

