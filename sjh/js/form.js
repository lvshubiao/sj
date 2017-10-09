$(function() {
    /*用户名*/
    $('.username').on('focus', function() {
        var tishi = $(this).parent().parent().find(".tishi");
        tishi.addClass('onfocus');
        tishi.html("用户名可由英文数字组成，长度为3-40个字符");
    });
    $('.username').on('blur', function() {
        var tishi = $(this).parent().parent().find(".tishi");
        var val = tishi.html();
        if (val.trim().length == 0) {
            tishi.html("用户名为必填，请输入你的用户名");
            tishi.addClass('onerror');
        }
        if (val.trim().length > 3 && val.trim().length < 40) {
            tishi.html("该用户名可用");
            tishi.addClass('onCurrect');
        }
    });
    /*密码*/
    $('.password').on('focus', function() {
        var tishi = $(this).parent().parent().find(".tishi");
        tishi.addClass('onfocus');
        tishi.html("密码可由大小写英文字母，数字组成，长度为6-20");
    });
    $('.password').on('blur', function() {
        var re = /^[\w.]{6,20}$/;
        var tishi = $(this).parent().parent().find(".tishi");
        var val = tishi.html();
        if (re.test(val) == false) {
            tishi.html("输入的密码不正确");
            tishi.addClass('onerror');
        } else {
            tishi.html("该密码可用");
            tishi.addClass('onCurrect');
        }

    });
    /*手机号*/
    $('.phone').on('focus', function() {
        var tishi = $(this).parent().parent().find(".tishi");
        tishi.addClass('onfocus');
        tishi.html("请输入你的手机号");
    });
    $('.phone').on('blur', function() {
        var re = /^1[34578]\d{9}$/;
        var tishi = $(this).parent().parent().find(".tishi");
        var val = tishi.html();
        if (re.test(val) == false) {
            tishi.html("输入的手机号不正确");
            tishi.addClass('onerror');
        } else {
            tishi.html("该手机号可用");
            tishi.addClass('onCurrect');
        }

    });
    /*邮箱*/
    $('.email').on('focus', function() {
        var tishi = $(this).parent().parent().find(".tishi");
        tishi.addClass('onfocus');
        tishi.html("请输入你的邮箱");
    });
    $('.email').on('blur', function() {
        var re = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        var tishi = $(this).parent().parent().find(".tishi");
        var val = tishi.html();
        if (re.test(val) == false) {
            tishi.html("输入的邮箱格式不正确");
            tishi.addClass('onerror');
        } else {
            tishi.html("该邮箱可用");
            tishi.addClass('onCurrect');
        }

    });
    /*昵称*/
    $('.nike').on('focus', function() {
        var tishi = $(this).parent().parent().find(".tishi");
        tishi.addClass('onfocus');
        tishi.html("昵称可有英文数字组成，长度最少1个字符");
    });
    $('.nike').on('blur', function() {

        var tishi = $(this).parent().parent().find(".tishi");
        var val = tishi.html();
        if (val.trim().length == 0) {
            tishi.html("昵称为必填，请输入你的昵称");
            tishi.addClass('onerror');
        }
        if (val.trim().length > 0) {
            tishi.html("该昵称可用");
            tishi.addClass('onCurrect');
        }
    });
})
