Vue.component('music-item', {
    // music-item 组件现在接受一个
    // "prop"，类似于一个自定义特性。
    // 这个 prop 名为 todo。
    props: ['item','index'],
    template: '<li v-bind:title="item.name" v-bind:class="item.isplay==1?\'isplay\':\'\'" ><span>{{ item.name }}</span>' +
    '<span class="icn icn-del" title="删除">删除</span>'+
    '<span class="icn icn-dl" title="下载"></span>'+
    '<span class="icn icn-fav" title="收藏"></span>'+
    '<a class="u-icn u-icn-81 icn-add"  title="添加到播放列表"></a>' +
    '</li>'
    // '<span class="icn icn-share" title="分享">分享</span>'+


});
Vue.component('music-list-item', {
    // music-item 组件现在接受一个
    // "prop"，类似于一个自定义特性。
    // 这个 prop 名为 todo。
    props: ['item','index'],
    template: '<li v-bind:title="item.name"  ><span>{{ item.name }}</span>' +
    '</li>'
    // '<span class="icn icn-share" title="分享">分享</span>'+


});
/**
 var musicFiles = [];//存放音乐文件变量
 var $media;//audio标签
 var musicIndex = -1; // 当前正在播放的歌曲的索引
 var musicSelectedIndex = -1; // 当前被选中的歌曲的索引
 var playingFile = null; // 当前正在播放的歌曲
 var playMode = 1; // 播放模式
 var scrollTopHeight = 0;//滚动条下滑的长度
 var randomPre = new Array();//记录随机模式下的播放歌曲的记录
 var randomPreMax = -1;//随机模式下的播放歌曲的索引
 var currentlistid = "";//当前播放的列表的ID
 var currentlistindex = 0;//当前播放列表的索引号
 var currentselectedlistindex = 0;//当前被选择列表的索引号
 var serverIP =  "http://" +window.location.href.split("//")[1].
 substring(0, window.location.href.split("//")[1].indexOf("/"));//服务器的IP地址
 var lrctext = "";
 var lrcarr = null;
 var lrcindex =0;
 var volume=0;
 */


var player = new Vue({
    el: '#player',
    data: {
        serverIP:'http://localhost',
        musicLists: [],
        musicFiles: [],
        media:null,
        musicIndex:-1,
        playingFile:null,
        isPlay:true,
        progress_div_style:'',
        progress_time_html:'00:00 / 00:00',
        isdown:false,
        volume:0,
        volume_div_style:'',
        autoTimeout:null,
        playMode:0,
        currentlistid:"",
        currentlistindex:0,
        lrctext:'',
        lrcarr:[],
        lrcindex:0

    },
    created: function () {
        document.onmousemove=function (e) {
            if (player.isdown&&player.volume<34) {
                var volumeDiv= document.getElementById('volume');
                var offsetLeft = volumeDiv.offsetLeft;
                var left = e.pageX - offsetLeft - 8;
                left = left > 34 ? 34 : left;
                left = left < 0 ? 0 : left;
                player.volume = left;
                player.volume_div_style = "left:"+left+"px;";
                player.media.volume = Math.round(left / 34 * 10) / 10;
            }
        };

        document.onmouseup=function(){
            player.isdown = false;
        };
        var _this= this;
        _this.media = document.getElementById("musicbox");
        _this.$options.methods.loadLists();
    },
    methods:{
        loadLists:function () {
            axios({
                method:'post',
                url:'/list/loadlists'
            }).then(function(res){
                player.musicLists =res.data;
                if(player.musicLists.length>0){
                    player.$options.methods.loadSongsByIds(res.data[0].value);
                }
            });
        },
        loadSongsByIds:function (ids) {
            if(ids=="") return;
            axios({
                headers: {
                    'Content-Type': 'application/json'
                },
                method:'post',
                url:'/song/loadSongsByIds',
                data:ids.split(",")
            }).then(function(res){
                player.musicFiles =res.data;
                // player.$options.methods.playMusic(0);

            });
        },
        playMusic:function (index) {
            clearTimeout(player.autoTimeout);
            player.playingFile = player.musicFiles[index];
            player.musicIndex=index;
            player.media.src= player.serverIP + "/music/song/" +player.playingFile.url;
            player.media.play();
            var list =  player.musicFiles;
            for (var i = 0; i < list.length; i++) {
                var obj = list[i];
                obj.isplay = i==index?1:0;
            }
            player.musicFiles =list;
            player.$options.methods.auto();
        },
        nextMusic:function () {
            if(player.musicFiles.length==0) return;
            if(player.musicIndex==player.musicFiles.length-1){
                player.musicIndex=0;
            }else{
                player.musicIndex++;
            }
            player.$options.methods.playMusic(player.musicIndex);
        },
        preMusic:function () {
            if(player.musicFiles.length==0) return;
            if(player.musicIndex==0){
                player.musicIndex=player.musicFiles.length-1;
            }else{
                player.musicIndex--;
            }
            player.$options.methods.playMusic(player.musicIndex);
        },
        auto:function (){
            var allTime = player.media.duration;
            var currentTime = player.media.currentTime;
            var percent = Math.floor(currentTime * 100 / allTime);
            if (isNaN(allTime)) {
                player.progress_div_style='background:url(__IMG__/load.png repeat-x);width:100px;';
            }else {
                player.progress_div_style = 'background:#374D62;width:'+percent+'px;';
                player.progress_time_html = player.$options.methods.timeformat(currentTime) + " / " + player.$options.methods.timeformat(allTime);
            }
            if (player.media.ended == true) {
                player.$options.methods.nextMusic();
            }
            player.autoTimeout = setTimeout(player.$options.methods.auto, 1000);

        },
        timeformat:function(time){
            var t = Math.round(time);
            var h = Math.floor(t / 3600);
            var m = Math.floor(t / 60);
            var s = t - h * 3600 - m * 60;
            if (h == 0) {
                str = m > 9 ? m : ("0" + m) + ":" + (s > 9 ? s : ("0" + s));
            }
            else {
                str = h > 9 ? h : ("0" + h) + ":" + (m > 9 ? m : ("0" + m)) + ":" + (s > 9 ? s : ("0" + s));
            }
            return str;
        },
        pauseOrPlay:function () {
            if (player.isPlay ) {
                player.isPlay = false;
                player.media.pause();
            }else {
                player.isPlay = true;
                player.media.play();
            }
        },
        chooseProcess:function (e){
            var processDiv = document.getElementById('progress');
            var width = e.pageX - processDiv.offsetLeft;
            var allTime = player.media.duration;
            player.media.currentTime = allTime * width / 100;
            player.progress_div_style = 'background:#374D62;width:'+width+'px;';
        },
        volumeMouseDown:function (e) {
            var volumeDiv= document.getElementById('volume');
            var left = e.pageX - volumeDiv.offsetLeft - 8;
            left = left > 34 ? 34 : left;
            left = left < 0 ? 0 : left;
            player.volume = left;
            player.volume_div_style = "left:"+left+"px;";
            player.isdown = true;
        },
        volumeClick:function (e) {
            var volumeDiv= document.getElementById('volume');
            var left = e.pageX - volumeDiv.offsetLeft - 8;
            left = left > 34 ? 34 : left;
            left = left < 0 ? 0 : left;
            player.volume = left;
            player.volume_div_style = "left:"+left+"px;";
            player.media.volume = Math.round(left / 34 * 10) / 10;
        },
        addNewList:function () {
            swal({
                title: '错误！',
                text: '是否继续',
                type: 'error',
                confirmButtonText: '酷'
            })
        }

    }
});


