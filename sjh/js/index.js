define(function(require, exports, module) {
    var index = {
        init: function() {
            this.addData();
            this.events();
            this.dealLeftMenu();
            this.dealUserTable();
            this.deleteUser();
            this.upData();

        },
        dealTemplate: function(child, parent, data) {
            var _html = $(child).html();
            var _htmlfn = _.template(_html);
            var _html2 = _htmlfn({
                list: data
            });
            $(parent).html(_html2);
        },
        dealLeftMenu: function(leftMenuData) {            
            /*处理左侧菜单*/
            var leftMenu = JSON.parse(sessionStorage.getItem('leftMenu')).data.menus;
            console.log(leftMenu);
            console.log(username);
            this.dealTemplate('#left-menu-list', '#left-menu', leftMenu);
            $('.outer-li').on('click',
                function() {
                    if ($(this).find('.inner-ul').is(':hidden')) {
                        $(this).find('.inner-ul').show();
                        $(this).siblings().find('.inner-ul').hide();
                    } else {
                        $(this).find('.inner-ul').hide();
                    }
                });
            /*阻止事件冒泡*/
            $('.inner-ul').click(function(ev) {
                var e = ev || event;
                e.stopPropagation();
            });
            var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
            var currentHeight = parseInt(clientHeight) - 86 + 'px';
            console.log(currentHeight);
            $('#left-menu').css({
                'height': currentHeight
            });
        },
        dealInput: function() {   
            /*选中所有*/
            $('#selectAll-usertable').on('click', function() {
                if ($(this).prop('checked')) {
                    $('.selectRow').prop('checked', true);
                    $('.selectRow').parent().parent().css({ 'backgroundColor': '#eee' });
                    $('.toolbar li').not(':first').find('input').attr('disabled', false);
                } else {
                    $('.selectRow').prop('checked', false);
                    $('.selectRow').parent().parent().css({ 'backgroundColor': '#fff' });
                    $('.toolbar li').not(':first').find('input').attr('disabled', true);
                }
            });
            /*选中一个*/
            $('#userTable').on('click', '.selectRow', function() {
                $('.selectRow').parent().parent().css({ 'backgroundColor': '#fff' });
                $('.selectRow:checked').parent().parent().css({ 'backgroundColor': '#eee' });
                if ($('.selectRow').is(':checked')) {
                    $('.toolbar li').not(':first').find('input').attr('disabled', false);
                } else {  
                    $('.toolbar li').not(':first').find('input').attr('disabled', true);
                }

            });
        },
        addData: function() {
             
            /*增加用户界面*/

            $('.add').click(function() {
                var addData = require('../views/addData.html');
                $('.box').html(addData);
                $('.box').css({
                    'display': 'block'
                });
            });
            /*关闭弹出层*/
            $('.box').on('click', '.closeWindow', function() {

                $('.box').css({
                    'display': 'none'
                });
            });
            /*保存关闭*/
            $('.box').on('click', '#save_close', function() {
                addUser();
                $('.box').css({
                    'display': 'none'
                });
            });
            /*保存并继续*/
            $('.box').on('click', '#save_continue', function() {
                addUser();

            });
            /*关闭*/
            $('.box').on('click', '#close', function() {
                $('.box').css({
                    'display': 'none'
                });
            });

            function addUser() {
                var username = $('.username').val();
                var password = $('.password').val();
                var phone = $('.phone').val();
                var sex = '';
                var email = $('.email').val();
                var nike = $('.nike').val();
                var flag = null;
                if ($('.boy').is(':checked')) {
                    sex = '男';
                    flag = true;
                };
                if ($('.girl').is(':checked')) {
                    sex = '女';
                    flag = false;
                };
                $.post(
                    '/h5/user_add.action', { password: password, userName: username, number: phone, sex: flag, email: email, nike: nike },
                    function(data) {
                           var code = JSON.parse(data).code_;
                        if (code == '0') {
                            location.reload();
                            alert('添加成功');
                        } else {
                            alert('添加失败,请重试!');
                        }
                    })
            }
            this.dealInput();

        },
        upData: function() {
             
            /*更新用户界面*/
            $('.edit').click(function() {
                var upData = require('../views/updata.html');
                $('.box').html(upData);
                $('.box').css({
                    'display': 'block'
                });
                var id = $('.selectRow:checked').parent().parent().attr('data-id');
                console.log(id);
                $.post('/h5/user_findById.action', { id: id }, function(data) {
                    var obj = JSON.parse(data).data;
                    console.log(obj);
                    var username = $('.username').val(obj.userName);
                    var password = $('.password').val(obj.password);
                    var phone = $('.phone').val(obj.number);
                    var sex = '';
                    var email = $('.email').val(obj.email);
                    var nike = $('.nike').val(obj.nike);
                    if (obj.sex == true) { 
                        $('.boy').attr('checked', true);
                    } else {
                        $('.girl').attr('checked', true);
                    }

                })
            });
            /*-----------------------------------更新---------------------------------------------------*/
            /*保存关闭*/
            $('.box').on('click', '#keep', function() {
                var id = $('.selectRow:checked').parent().parent().attr('data-id');
                var username = $('.username').val();
                var password = $('.box .password').val();
                var phone = $('.box .phone').val();
                var sex = '';
                var email = $('.box .email').val();
                var nike = $('.box .nike').val();
                var flag = null;
                if ($('.box .boy').is(':checked')) {
                    sex = '男';
                    flag = true;
                };
                if ($('.box .girl').is(':checked')) {
                    sex = '女';
                    flag = false;

                };
                $.post('/h5/user_update.action', {id:id,password: password, userName: username, number: phone, sex: flag, email: email, nike: nike },
                    function(data) {
                        console.log(data);
                        var code = JSON.parse(data).code_;
                        if (code == '0') {
                            location.reload();
                            alert('更新成功');
                        } else {
                            alert('更新失败,请重试!');
                        }
                    })

            });
            /*关闭*/
            $('.box').on('click', '#shut', function() {
                $('.box').css({
                    'display': 'none'
                });
            });
        },
        events: function() {
             
            var that = this;
            /*显示用户名*/
            var username = sessionStorage.getItem('username');
            this.dealTemplate('#username', '#user', username);
            /*用户退出修改密码菜单*/
            $('.nav-right').click(function() {
                $('.drop-downmenu').toggle();
            });
            /*修改密码*/
            $('.alterPassword').click(function(ev) {
                $('.drop-downmenu').hide();
                var e = ev || event;
                e.preventDefault();
                var alterHtml = require('../views/alterpassword.html');
                $('.box').html(alterHtml);
                $('.box').css({
                    'display': 'block'
                });
                $('.closeWindow').click(function(){
                     $('.box').css({
                    'display': 'none'
                });
                })
            });
            /*退出*/
            $('.logout').click(function(ev) {
                var e = ev || event;
                e.preventDefault();
                $.ajax({
                    url: '/h5/logout',
                    data: {},
                    type: 'post',
                    success: function() {
                        location.href = 'views/login.html';
                    }
                })
            });
        },
        dealUserTable: function() {
             
            var that = this;
            var page = 1;
            var rows = $('#Select option:selected').val();
            $.ajax({
                url: '/h5/user_findAll.action',
                type: 'post',
                data:{
                    page:page,
                    rows:rows
                },
                success: function(res) {
                    /* console.log(res);*/
                    var userList = JSON.parse(res).data.objets;
                    /*console.log(userList);*/
                    that.dealTemplate('#userList', '#userTable', userList);
                    /*处理性别*/
                    var user_sex = $('#userTable').find('.user_sex');
                    for (var i = 0; i < user_sex.length; i++) {

                        if ($(user_sex[i]).html() == 'true') {

                            $(user_sex[i]).html('男');
                        } else {
                            $(user_sex[i]).html('女');
                        }
                    }

                }
            });

        },
        deleteUser: function() {

            /*删除用户*/ 
            $('.del').on('click', function(event) {
                var selectInput = $('.selectRow:checked');
                var deleteTr = selectInput.parent().parent();
                var con;
                con = confirm('确定删除该用户？');
                if (con == true) {
                    for (var i = 0; i < deleteTr.length; i++) {
                        var userId = $(deleteTr[i]).attr('data-id');
                        $.post('/h5/user_delete.action', { id: userId });
                        console.log(userId);
                    }
                    location.reload();
                    
                    alert('删除成功');
                } else {
                    alert('删除失败')
                }
            });
        }
    }
    module.exports = index;
})
