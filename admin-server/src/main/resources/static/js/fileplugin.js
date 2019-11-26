var fileplugin = function () {
    if (isIE9()) {
        return {
            change: function (fileid, imgid, size, oldsrc) {
                $(fileid).change(function (evt) {
                    var src = getFileURL(this);
                    $(imgid).attr('src', src).css('display', 'block')
                }).trigger('change');
            }
        }
    }
    else {
        return {
            change: function (fileid, imgid, size, oldsrc, fn) {
                $(fileid).bind('change', function (evt) {
                    var files = evt.target.files; // 获得文件对象
                    if (files.length < 1) {
                        $(imgid).attr('src', oldsrc);
                        return;
                    }
                    var f = files[0];
                    var src = getFileURL(this);
                    var file = $(fileid);
                    var mimes;
                    if (typeof file.attr('data-file_type') == 'string') {
                        mimes = file.attr('data-file_type').split('|');
                    }
                    //文件要求的指定大小
                    var size_unit = 'KB';
                    var max_size = parseFloat(file.attr('data-max_size')) / 1024;
                    if (max_size >= 1024) {
                        max_size = max_size / 1024;
                        size_unit = 'MB';
                    }
                    //检查文件的类型是否符合指定要求
                    if (jQuery.inArray(f.type, mimes) == -1) {
                        info('错误', '请上传jpg,png或jpeg文件');
                        $(fileid).val('');
                        return;
                    }
                    //检查文件大小
                    if (f.size > parseFloat(file.attr('data-max_size'))) {
                        info('错误', '上传图片大小不得超过' + max_size + size_unit);
                        $(fileid).val('');
                        return;
                    }
                    if (null != size) {
                        var img = document.createElement("img");
                        img.file = f;
                        img.onload = function () {
                            if (size[0] == size[1] && size[0] != null) {
                                if (this.width != this.height) {
                                    info('错误', "上传图片必须为正方形");
                                    src != '' ? $(imgid).attr('src', oldsrc).css('display', 'block') : false;
                                    $(fileid).val('');
                                    return;
                                }
                            } else if ((size[0] != null && this.width != size[0]) || (size[1] != null && this.height != size[1])) {
                                info('错误', "上传图片尺寸必须为" + size[0] + "*" + size[1]);
                                src != '' ? $(imgid).attr('src', oldsrc).css('display', 'block') : false;
                                $(fileid).val('');
                                return;
                            }
                        }
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            img.src = e.target.result;
                        };
                        reader.readAsDataURL(f);
                    }
                    if (src != '') {
                        $(imgid).attr('src', src).css('display', 'block');
                        if (null != fn) {
                            fn(fileid);
                        }
                    } else {
                        false;
                    }
                });
            },
            //上传文件的时候获取fileid里面的文件对象传入fn方法中
            upchange: function(fileid,fn){
                $(fileid).bind('change', function (evt) {
                    var files = evt.target.files; // 获得文件对象
                    var f = files[0];
                    var src = getFileURL(this);
                    var file = $(fileid);
                    var mimes;
                    if (typeof file.attr('data-file_type') == 'string') {
                        mimes = file.attr('data-file_type').split('|');
                    }
                    //文件要求的指定大小
                    var size_unit = 'KB';
                    var max_size = parseFloat(file.attr('data-max_size')) / 1024;
                    if (max_size >= 1024) {
                        max_size = max_size / 1024;
                        size_unit = 'MB';
                    }
                    //检查文件的类型是否符合指定要求
                    if (jQuery.inArray(f.type, mimes) == -1&&f.name.indexOf(".xls")==-1) {
                        info('提示','请上传Excel文件');
                        $(fileid).val('');
                        return;
                    }
                    //检查文件大小
                    if (f.size > parseFloat(file.attr('data-max_size'))) {
                        info('错误', '上传图片大小不得超过' + max_size + size_unit);
                        $(fileid).val('');
                        return;
                    }
                    if (null != fn) {
                        fn(f);
                    }
                });
            }
        }
    }
}();

function isIE9() {
    if (navigator.userAgent.indexOf("MSIE") > 0) {
        if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
            return true;
        }
        if (navigator.userAgent.indexOf("MSIE 7.0") > 0) {
            return true;
        }
        if (navigator.userAgent.indexOf("MSIE 9.0") > 0 && !window.innerWidth) {//这里是重点，你懂的
            return true;
        }
        if (navigator.userAgent.indexOf("MSIE 9.0") > 0) {
            return true;
        }
    }
    return false;
}


function getFileURL(input) {
    var url;
    if (input.value == '') {
        return url;
    }
    if (isIE9()) { // IE 10 以下
        url = input.value;
    } else {
        url = window.URL.createObjectURL(input.files.item(0));
    }
    return url;
}