$(function(){
    searchsongs_event_ini();
    $("#baidusearch").click(function(){
        var con = $("#searchsongs").val();
        if (con != "" && con != null) {
            location.href = "/song/searchSongsForList?p=1&searchcontext=" + con;
        }
        
    });
    $("#loginspan").click(function(){
    	location.href="/login";
    });
    $("#regspan").click(function(){
       location.href="/user/register";
    });
    $("#logoutspan").click(function(){
        $.ajax({
			url:'/logout',
			type:'post',
			success:function(d){
                // parent.leftarea_ini(0);
                // parent.musicSelectedIndex = -1;
                //parent.playMusic(parent.musicIndex);
                location.href="/login";
			}
		})

    })
    
    
    
    
});
