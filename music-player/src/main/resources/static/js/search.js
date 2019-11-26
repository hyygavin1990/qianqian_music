$(function(){
    searchsongs_event_ini();
    checkbox_play_ini();
    $("#baidusearch").click(function(){
        var con = $("#searchsongs").val();
        if (con != "" && con != null) {
            location.href = "/song/searchSongsForList?p=1&searchcontext=" + con;
        }
    })
    
     $("#loginspan").click(function(){
    	location.href=APP+"/Index/login";
    })
    $("#regspan").click(function(){
       location.href=APP+"/Index/register";
    })
})
