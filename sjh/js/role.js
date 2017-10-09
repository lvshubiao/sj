define(function(require, exports, module) {
    var role = {
        init: function() {
            var index = require('./index.js');
            index.events();
            index.dealInput();
            index.dealLeftMenu();
            this.addRole();
            this.dealUserTable();
            this.deleteRole();
            this.upRole();
        },
        dealTemplate: function(child, parent, data) {
            var _html = $(child).html();
            var _htmlfn = _.template(_html);
            var _html2 = _htmlfn({
                list: data
            });
            $(parent).html(_html2);
        },
        addRole: function() {
            /*关闭弹出层*/
            $('.box').on('click', '.closeWindow', function() {
                $('.box').css({
                    'display': 'none'
                });
            });
            /*增加用户界面*/
            $('.add').click(function() {
                var addRole = require('../views/addRole.html');
                $('.box').html(addRole);
                $('.box').css({
                    'display': 'block'
                });
            });
            /*保存关闭*/
            $('.box').on('click', '#save_close', function() {
                addRole();
                $('.box').css({
                    'display': 'none'
                });
            });
            /*保存并继续*/
            $('.box').on('click', '#save_continue', function() {
                addRole();
            });
            /*关闭*/
            $('.box').on('click', '#close', function() {
                $('.box').css({
                    'display': 'none'
                });
            });

            function addRole() {
                var username = $('.username').val();
                $.post(
                    '/h5/role_add.action', { name: username },
                    function(data) {
                        console.log(data);
                        var code = JSON.parse(data).code_;
                        if (code == '0') {
                            location.reload();
                            alert('添加成功');
                        } else {
                            alert('添加失败,请重试!');
                        }
                    });
            }
        },
        dealUserTable: function() {
            var page = 1;
            var rows = $('#Select option:selected').val();
            var that = this;
            $.ajax({
                url: '/h5/role_findAll.action',
                type: 'post',
                success: function(res) {
                    console.log(res);
                    var userList = JSON.parse(res).data.roles;
                    that.dealTemplate('#userList', '#userTable', userList);
                }
            });
        },
        upRole: function() {
            /*更新角色*/
            $('.edit').click(function() {
                var addRole = require('../views/updataRole.html');
                $('.box').html(addRole);
                $('.box').css({
                    'display': 'block'
                });
                var id = $('.selectRow:checked').parent().parent().attr('data-id');
                console.log(id);
                $.post('/h5/role_findById.action', { id: id }, function(data) {
                    console.log(data);
                    var obj = JSON.parse(data).data;
                    console.log(obj);
                    var username = $('.username').val(obj.name);

                });
            });
            /*-----------------------------------更新----------------------------------------*/
            /*保存*/
            $('.box').on('click', '#keep', function() {
                var id = $('.selectRow:checked').parent().parent().attr('data-id');
                var username = $('.username').val();
                $.post('/h5/role_update.action', { id: id, name: username },
                    function(data) {
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
        deleteRole: function() {
            /*删除角色*/
            $('.del').on('click', function(event) {
                var selectInput = $('.selectRow:checked');
                var deleteTr = selectInput.parent().parent();
                var con;
                con = confirm('确定删除该用户');
                if (con == true) {
                    for (var i = 0; i < deleteTr.length; i++) {
                        var userId = $(deleteTr[i]).attr('data-id');
                        $.post('/h5/role_delete.action', { id: userId });
                    }
                    location.reload();
                    alert('删除成功');
                } else {
                    alert('删除失败');
                }
            });
        },
        dealFoleder:function(){
            $('.set').click(function(){
                
            })
        }
    }
    module.exports = role;
})
