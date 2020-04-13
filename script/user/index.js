import Login from './events/login.js'
import Sign from './events/sign.js'

window.onload = tokenStatus;


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

function tokenStatus() {
    const token = window.localStorage.getItem("token")
    axios.get('https://app.isleslie.com/v1/user/testJwt', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(res => {
        console.log(res.data)
    })
}


Login();
Sign();