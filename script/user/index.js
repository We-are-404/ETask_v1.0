import Login from './events/login.js'
import Sign from './events/sign.js'

var changeStatus = 0;
$(".logo").click(function() {
    if(changeStatus === 0) {
        $(".login").addClass("login-hide")
        $(".sign").addClass("sign-show")
        changeStatus = 1;
    }else {
        $(".login").removeClass("login-hide")
        $(".sign").removeClass("sign-show")
        changeStatus = 0;
    }
})




Login();
Sign();