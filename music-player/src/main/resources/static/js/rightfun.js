
var arr = new Array();
var listTime;
var timeoutId;
var highlightindex = -1;
var cuval = "";
$(function(){
    var offset = $("#searchsongs").offset();
    $("#sea").offset({
        top: offset.top + $("#searchsongs").height() + 8,
        left: offset.left
    });
    $("#sea").css("width", $("#searchsongs").width() + 6);
})

//通过ajax方式获取符合搜索条件的歌曲集合
function ajax_searchsongs(text){
    return setTimeout(function(){
        if (text.trim() != "" &&
        (text.indexOf("%") == -1)) {
        
            var html = "";
            
            $.ajax({
                type: 'get',
                data: {
                    searchText: text
                },
                url: APP+'/Song/searchSongsForSuggestion',
                success: function(data){
                    //alert(data);
                    $("#sea").css("display", "none");
                    if (data != null) {
                        $("#sea").css("display", "block");
                        $("#sea").html("");
                        //alert(data);
                        $(data).each(function(index){
                            //alert($(data)[index].pname);
                            html += "<li class='searchlist' onclick='clickli();' id='" +
                            index +
                            "'>" +
                            data[index].name +
                            "-&nbsp;" +
                            data[index].author +
                            "</li>";
                            
                        })
                        
                        $("#sea").html(html);
                        $("#sea .searchlist").click(function(){
                            $("#sea").css("display", "none");
                            highlightindex = -1;
                            $("#input1").val($(this).html());
                            var v = $("#input1").val();
                            //location.href = "${basePath}search.action?searchkey=" +v;
                        })
                        $(".searchlist").mouseover(function(){
                            $(".searchlist").css("background-color", "white");
                            $(this).css("background-color", "#cccccc");
                            highlightindex = $(this).attr("id");
                        });
                        $(".searchlist").mouseout(function(){
                            $(this).css("background-color", "white");
                            //highlightindex=$(this).attr("id");
                        });
                        
                    }
                },
                error: function(){
                    console.log("解析错误，请检查源代码！");
                },
                dataType: 'json'
            });
            
        }
    }, 500);
}


//实现搜索框的suggestion功能
function searchsongs_event_ini(){
    $("#searchsongs").keyup(function(event){
        var myEvent = event || window.event;
        var keyCode = myEvent.keyCode;
        var v1 = $(this).val();
        if (v1 == "") {
            $("#sea").css("display", "none");
            highlightindex = -1;
        }
        if (keyCode >= 65 && keyCode <= 90 || keyCode == 8 ||
        keyCode == 46 ||
        keyCode == 32 ||
        keyCode == 13 ||
        keyCode == 16) {
            clearTimeout(timeoutId);
            timeoutId = ajax_searchsongs(v1);
            if (keyCode == 13) {
                //如果输入的是回车
                var v2 = $(this).val();
                //alert(v1);
                //alert(highlightindex);
                //下拉框有高亮内容
                
                if (highlightindex != -1) {
                    //取出高亮节点的文本内容
                    var v = $("#" + highlightindex).text().trim();
                    $("#baidusearch").click();
                }
                else {
                    if (cuval == v2) 
                        $("#baidusearch").click();
                }
                
                
            }
            cuval = $(this).val();
        }
        else 
            if (keyCode == 38 || keyCode == 40) {
                //如果输入的是向上38向下40按键
                if (keyCode == 38) {
                    //向上
                    var ulNodes = $("#sea li");
                    if (highlightindex != -1) {
                        //如果原来存在高亮节点，则将背景色改称白色
                        ulNodes.eq(highlightindex).css("background-color", "white");
                        highlightindex--;
                    }
                    else {
                        highlightindex = ulNodes.length - 1;
                    }
                    if (highlightindex == -1) {
                        //如果修改索引值以后index变成-1，则将索引值指向最后一个元素
                        highlightindex = ulNodes.length - 1;
                    }
                    //让现在高亮的内容变成红色
                    ulNodes.eq(highlightindex).css("background-color", "#CCCCCC");
                    $("#searchsongs").val(ulNodes.eq(highlightindex).text().trim());
                }
                if (keyCode == 40) {
                    //向下
                    var ulNodes = $("#sea li");
                    if (highlightindex != -1) {
                        //如果原来存在高亮节点，则将背景色改称白色
                        ulNodes.eq(highlightindex).css("background-color", "white");
                    }
                    highlightindex++;
                    if (highlightindex == ulNodes.length) {
                        //如果修改索引值以后index变成-1，则将索引值指向最后一个元素
                        highlightindex = 0;
                    }
                    //让现在高亮的内容变成红色
                    ulNodes.eq(highlightindex).css("background-color", "#CCCCCC");
                    $("#searchsongs").val(ulNodes.eq(highlightindex).text().trim());
                }
            }
        
        
    })
    $("#searchsongs").focus(function(event){
        var v1 = $(this).val();
        clearTimeout(timeoutId);
        timeoutId = ajax_searchsongs(v1);
    })
    $("#searchsongs").blur(function(){
        listtime = window.setTimeout(function(){
            highlightindex = -1;
            $("#sea").css("display", "none");
        }, 1000);
    })
}



//实现歌曲列表的搜索播放功能
function checkbox_play_ini(){
    //实现全选和单选的功能
    $(".searchlistonpage input[type='checkbox']:gt(0)").click(function(){
        $(".searchlistonpage input:eq(0)").attr("checked", $(".searchlistonpage input[type='checkbox']:gt(0)").length ==
        $(".searchlistonpage input:gt(0)[type='checkbox']:checked").length);
    })
    $(".searchlistonpage input:eq(0)").click(function(){
        if ($(this).attr("checked") == "checked") {
            $(".searchlistonpage input:gt(0)").attr("checked", "checked");
        }
        else {
            $(".searchlistonpage input:gt(0)").removeAttr("checked");
        }
    })
    
    //实现播放功能
    $(".searchlistonpage input[type='button']:eq(0)").click(function(){
        var ids = "";
        $(".searchlistonpage:gt(0) span:last-child").each(function(n){
            if ($(".searchlistonpage input[type='checkbox']:eq(" + (n + 1) + ")").attr("checked") == "checked") {
                ids += $(this).html() + ",";
            }
        })
        ids = ids.substring(0, ids.length - 1);
		if(ids!=null&&ids!=""){
			$.ajax({
            type: 'post',
            data: {
                songids: ids
            },
            url: APP+'/Song/addSongsFromSearch',
            success: function(){
                parent.leftarea_ini(0);
                parent.musicIndex = parent.musicFiles.length - 1;
                parent.musicSelectedIndex = -1;
                parent.playMusic(parent.musicIndex);
            },
            dataType: 'text'
        })
		}
        
    })

    //实现收藏到我喜欢听列表中
    $(".searchlistonpage input[type='button']:eq(2)").click(function(){
        var ids = "";
        $(".searchlistonpage:gt(0) span:last-child").each(function(n){
            if ($(".searchlistonpage input[type='checkbox']:eq(" + (n + 1) + ")").attr("checked") == "checked") {
                ids += $(this).html() + ",";
            }
        })
        ids = ids.substring(0, ids.length - 1);
        if(ids!=null&&ids!=""){
            $.ajax({
            type: 'post',
            data: {
                songids: ids
            },
            url: APP+'/Song/addSongsToMylove',
            success: function(){
                parent.leftarea_ini(1);
                parent.musicIndex = parent.musicFiles.length - 1;
                parent.musicSelectedIndex = -1;
                parent.playMusic(parent.musicIndex);
            },
            dataType: 'text'
        })
        }
        
    })
}



