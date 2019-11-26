function login(){
	$("form").ajaxSubmit({
		success:function(d){
			console.log(d);
            if(d.isSuccess==1){
                // parent.leftarea_ini(1);
                // parent.musicSelectedIndex = -1;
                location.href="/index/right";
            }else{
                alert("登录失败!!");
            }
		}
	});
	// $("form").submit();
}
function gotoIndex(){
	window.location.href="/index/right";
}