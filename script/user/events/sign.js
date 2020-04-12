let sign_name;
let sign_phoneNumber;
let sign_club;
let sign_password;

const Sign = () =>{
    signJudge();
}

function signJudge() {
    let rightPhoneNumber ;
    let rightPassword ;
    $('#sign_phoneNumber').blur(function () {
        let phoneNumber = $('#sign_phoneNumber').val();
        let str = /^[1]([3-9])[0-9]{9}$/;
    if (!str.test(phoneNumber)) {
        console.log("请输入正确的11位手机号码");
        rightPhoneNumber = false;
    }else{
        rightPhoneNumber = true;
    }
})
    $('#sign_password').blur(function () {
        let password = $('#sign_password').val();
        let str = /.{4,}$/;
        if (!str.test(password)) {
            console.log("密码应该设置在4位字符以上");
            rightPassword = false;
        }else{
            rightPassword = true;
        }
    })
    $('.sign_btn').click(function () {
        sign_name = $('#sign_name').val();
        sign_password = $('#sign_phoneNumber').val();
        sign_club = $('#sign_club').val();
        sign_phoneNumber = $('#sign_password').val();
        if (sign_name === "") {
            alert("用户名不能空着哦");
            return false;
        }
        if(sign_password === "" || !rightPhoneNumber){
            alert("请输入正确的11位手机号码");
            return false;
        }
        if(sign_club === ""){
            alert("组织名称不能空着哦");
            return false;
        }
        if(sign_password === "" || !rightPassword){
            console.log(!rightPassword);
            alert("请设置4位字符以上的密码");
            return false;
        }else{
            let sign_data={
                "sign_name":sign_name,
                "sign_password":sign_password,
                "sign_club":sign_club,
                "sign_phoneNumber":sign_phoneNumber
            }
            console.log(sign_name+"和"+sign_phoneNumber+"和"+sign_club+"和"+sign_password);
            axios.post('http://127.0.0.1:5000/sign_data.json', sign_data ).then(res => {})
        }
    })
}

export default Sign;