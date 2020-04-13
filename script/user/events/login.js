let login_name;
let login_password;

const Login = () => {
    inputFocus();
    loginJudge();
}


function inputFocus() {
    $("input").focus(function() {
        $(this).siblings("span").addClass("span-focus")
    });
    $("input").blur(function(e) {
        if(e.target.value === "") $(this).siblings("span").removeClass("span-focus")
    })
}

function loginJudge() {
    $(".login_btn").click(function () {
        login_name = $('#login_name').val();
        login_password = $('#login_password').val();
        if(login_name === ""){
            alert("未输入用户名");
            return false;
        }
        if(login_password === ""){
            alert("未输入密码");
            return false;
        }else{
            let login_data={
                "phone_number":login_name,
                "password":login_password
            }
            console.log(login_name+"和"+login_password);
            axios.post('https://app.isleslie.com/v1/user/login', login_data)
            .then(res => {
                window.localStorage.setItem("token", res.data.data.token);
                console.log(res.data)
            })
            .catch()
        }
    })

}



export default Login;