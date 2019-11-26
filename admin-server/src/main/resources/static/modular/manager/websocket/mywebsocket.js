

//---------------------------以下部分为websocket代码---------------------------------------

var websocket = null;

var home = function () {
    //判断当前浏览器是否支持WebSocket
    if ('WebSocket' in window) {
        var host = window.location.host;
        var userId = $("#passwordEdit-form").find("input[name=userId]").val();
        websocket = new WebSocket("ws://" + host + "/websocket?userid=" + userId);

    }

    //连接发生错误的回调方法
    websocket.onerror = function () {
        //alert("WebSocket连接发生错误");
    };

    //连接成功建立的回调方法
    websocket.onopen = function () {
        //  alert("WebSocket连接成功");
    }

    //接收到消息的回调方法
    websocket.onmessage = function (event) {
        var data = JSON.parse(event.data);
        console.log(data);
        // var action = data.action;
        gopop(data.title, data.msg, data.color)
    }

    //连接关闭的回调方法
    websocket.onclose = function () {
    };

    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = function () {
        closeWebSocket();
    };

    //关闭WebSocket连接
    var closeWebSocket = function () {
        websocket.close();
    };
}
