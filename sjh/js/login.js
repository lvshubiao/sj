$(function() {
    var login = {
        init: function() {
            this.userLogin();
        },
        userLogin: function() {
            $('.login').click(function(e) {
                e.preventDefault();
                var username = $('.number > input').val();
                var password = $('.password > input').val();
                if (username == "" || password == "") { //判断两个均不为空（其他判断规则在其输入时已经判断） 
                    alert("用户名密码均不能为空！")
                    return false;
                } else {
                    $.ajax({
                        url: "/h5/login_login.action",
                        data: {
                            username: username,
                            password: password
                        },
                        type: 'post',
                        success: function(res) {
                            console.log(res);
                            var a = JSON.parse(res);
                            var code = JSON.parse(res).code_;
                            if (code == '0') {
                                sessionStorage.setItem('leftMenu', res);
                                sessionStorage.setItem('username', username);
                                location.href = '../index.html';
                         
                            }
                        }
                    })
                }
            });
            $(document).keyup(function(event) {
                if (event.keyCode == 13) {
                    $(".login").trigger("click");
                }
            });
        }
    }
    login.init();
})
