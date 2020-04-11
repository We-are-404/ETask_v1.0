const Login = () => {
    inputFocus();
}


function inputFocus() {
    $("input").focus(function() {
        $(this).siblings("span").addClass("span-focus")
    });
    $("input").blur(function(e) {
        if(e.target.value === "") $(this).siblings("span").removeClass("span-focus")
    })
}

export default Login;