<html dir="ltr" lang="zh-CN"><head>

    <title>
        HTML5 音乐播放器
    </title>

</head>
<body>

<link rel="shortcut icon" href="/static/images/music.ico" type="image/vnd.microsoft.icon">
<link rel="stylesheet" type="text/css" href="/static/css/style.css" >
<link rel="stylesheet" type="text/css" href="/static/css/plugins/sweetalert/sweetalert2.min.css" >
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<#--sweet alert-->
<script type="text/javascript" src="/static/js/plugins/sweetalert/sweetalert2.js"></script>
<script type="text/javascript" src="/static/js/plugins/sweetalert/core.js"></script>
<#--<script type="text/javascript" src="/static/js/script/jquery-1.7.1.min.js">
</script>
<script type="text/javascript" src="/static/js/script/ajaxfileupload.js">
</script>
<script type="text/javascript" src="/static/js/script/jqcontextmenu.js">
</script>
<script type="text/javascript" src="/static/js/script/jquery.jBox-2.3.min.js">
</script>
<script type="text/javascript" src="/static/js/script/jquery.jBox-zh-CN.js">
</script>
<script src="/static/js/play/global.js" type="text/javascript">
</script>
<script src="/static/js/play/func.js" type="text/javascript">
</script>
<script src="/static/js/play/player.js" type="text/javascript">
</script>-->


<div class="container">
    <div id="player">
        <audio id="musicbox">
        </audio>
        <div id="musicimg">
        </div>
        <div id="musicinfo" v-cloak>

            <div v-if="playingFile!=null" v-bind:title='playingFile.author'>歌手 : {{playingFile.author}} </div> <div v-if="playingFile!=null" v-bind:title='playingFile.name'>歌曲名 : {{playingFile.name}}</div>

        </div>
        <div id="controls" class="clearfix controls">
            <div id="pre" v-on:click="preMusic()">
            </div>
            <div id="play" v-bind:class="isPlay?'playing':''" @click="pauseOrPlay($event)">
            </div>
            <div id="next" v-on:click="nextMusic()">
            </div>
            <div id="progress" @click="chooseProcess($event)">
                <div v-bind:style="progress_div_style" >
                </div>
                <p id="time">
                    {{progress_time_html}}
                </p>
            </div>
            <div id="volume" @click="volumeClick($event)">
                <div v-bind:style="volume_div_style" @mousedown="volumeMouseDown($event)" >
                </div>
            </div>
        </div>
        <div class="bar">
            <button id="addnewlist" @click="addNewList()">
                新建列表
            </button>
            <button>
                清空列表
            </button>
            <button id="removeListFromMenu">
                删除列表
            </button>
            <button id="uploadsong">
                本地上传
            </button>
        </div>

        <div id="musiclistmemo">
            <ul><li id="list0" class="isplay">临时列表<input type="hidden" value="list"><input type="hidden" value=""><input type="hidden" value="0"><input type="hidden" value="undefined"></li></ul>
        </div>
        <#--<ul id="musiclist">还未加入歌曲</ul>-->
        <ul id="musiclist" v-cloak>
            {{musicFiles.length==0 ? '还未加入歌曲' : ''}}
            <#--<li v-if="musicFiles.length>0" v-for="(music,index) in musicFiles" v-bind:title="music.name" >
                <div v-bind:class="musicIndex==index?'isplay':''">{{ music.name }}</div>
            </li>-->
            <music-item
                    v-for="(item,index) in musicFiles"
                    v-bind:item="item"
                    v-bind:index="index"
                    v-bind:key="item.id"
            ></music-item>
        </ul>
        <div id="lrcbox">
            <div id="lrcheader">&nbsp;歌词<button style="margin:5px; margin-left:70%;">显示</button></div>
            <ul id="lrccon"></ul>
        </div>
        <div class="bar bottom">
				<span>
					播放模式：
				</span>
            <span id="mode">循环</span>
        </div>

    </div>
    <iframe id="rightextra" frameborder="0" src="/index/right">
    </iframe>
</div>
<#--<div id="infobox">
    <input type="hidden" value="" id="rclickid">
    <!-- 记录歌曲的url，便于下载 &ndash;&gt;
    <input type="hidden" value="" id="rclickurl">
    <!-- 记录当前播放曲目的索引号 从0开始 &ndash;&gt;
    <input type="hidden" value="" id="rclickliindex">
    <!-- 记录选择的list的index &ndash;&gt;
    <input type="hidden" value="" id="rclicklistindex">
    <!-- 记录选择的list的index &ndash;&gt;
    <input type="hidden" value="" id="rclicklistid">
</div>-->
<#--<ul class="jqcontextmenu" id="myMenu" style="display: none;">
    <li id="download">
        <a>
            下载
        </a>
    </li>
    <li id="playbymemu">
        <a>
            播放
        </a>
    </li>
    <li id="delsong">
        <a>
            从列表删除
        </a>
    </li>
    <li id="addto">
        <a>
            添加到
        </a>
        <ul id="listmemu" style="display: none;"></ul>
    </li>
</ul>
<ul class="jqcontextmenu" id="myMenu1" style="display: none;">
    <li id="renamelist">
        <a>
            重命名
        </a>
    </li>
    <li id="b">
        <a>
            添加歌曲
        </a>
        <ul id="c" style="display: none;">
            <li id="d">
                <a>
                    本地歌曲
                </a>
            </li>
            <li id="e">
                <a>
                    本地歌曲文件夹
                </a>
            </li>
        </ul>
    </li>
    <li id="removeList">
        <a>
            删除
        </a>
    </li>
</ul>-->
<script src="/static/js/index.js"></script>

<#--<ul class="jqcontextmenu" id="myMenu2" style="display: none; visibility: visible;">
    <li id="b" style="z-index: 1000;">
        <a>
            添加歌曲
            <img src="/static/images/arrow.gif" class="rightarrowclass" style="border:0;"></a>
        <ul id="c" style="display: none; visibility: visible;">
            <li id="d">
                <a>
                    本地歌曲
                </a>
            </li>
            <li id="e">
                <a>
                    本地歌曲文件夹
                </a>
            </li>
        </ul>
    </li>
    <li id="f">
        <a>
            删除重复歌曲
        </a>
    </li>
    <li id="f">
        <a>
            删除错误歌曲
        </a>
    </li>
</ul>-->
</body>
</html>