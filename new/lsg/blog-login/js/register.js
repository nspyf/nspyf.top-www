/*
    //判断用户是否注册成功，注册成功后解除对登录按钮的限制
        var username=document.getElementById("username");
        var code=document.getElementsByClassName("password");
        var register=document.getElementById("register");
        var login=document.getElementById("login");
        var span=document.getElementsByTagName("span");
        //正则表达式判断用户输入是否符合语法
        
        *1、用户名至少三位。
        *2、密码至少六位，只能且必须是数字和字母的组合，且不忽视大小写
        *
        
    //提示用户输入
    console.log(span)
        username.oninput=function(){
            if(username.value.length<3){
                span[0].innerText="用户名长度至少3位";
                
            }
            else{
                span[0].innerText="";
            };
        };
        var reg= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$/
        code[0].oninput=function(){
            
            if(!reg.test(code[0].value)){
                span[1].innerText="必须包含大小写字母和数字的组合，不能使用特殊字符,且密码至少6位"
                
                
            }
            else{ 
                span[1].innerText=""
            }
    
        };
    console.log(username.value.length)
    
    //判断用户输入，并决定是否允许用户注册
    
        flag=true;
    
        register.onclick=function(){
            //不能用null
            if(username.value.length<3){
                alert("用户名的长度至少位三位");
            }
            else if(!reg.test(code[0].value)){
                alert("请输入正确密码");
    
            }
            else if(code[1].value==""){
                alert("请确认密码");
            }
            else if(code[0].value !== code[1].value){
                alert("两次输入密码不相同，请重新输入");
            }
            
            else{
                alert("注册成功，请登录");
                flag=false;
            }
           
             
        }  

*/

//注册

//提示用户正确输入

    var usr=document.getElementById("username")
    var pad=document.getElementsByClassName("password")
    var span=document.getElementsByTagName("span")


var usrRexp=/[A-z0-9]{2,}/
usr.oninput=function(){
    if(usrRexp.test(usr.value)){
        span[0].innerText=""

    }
    else{
    
        span[0].innerText="用户名至少两位，可以是字母或数字"
    }
}
pad[0].oninput=function(){
    if(pad[0].value.length<8|pad[0].value.length>32){
        span[1].innerText="密码至少为8位，至多为32位"
    }
    else{
        span[1].innerText=""
    }

}
pad[1].oninput=function(){
    if(pad[0].value==pad[1].value){
        span[2].innerText=""

    }
    else{
        span[2].innerText="两次输入密码不相同"
    }
    
}
    
var API="https://nspyf.top:10000"
document.getElementById("register").onclick=function(){
    username=document.getElementById("username").value;
    password=document.getElementsByClassName("password")[0].value;
    
    

  var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    var raw = JSON.stringify({
        "username": username,
        "password": password,
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    fetch(API + "/register", requestOptions)
        .then(response => response.json())
        .then((response) => {
            if (response.code == 0) {
                alert("注册成功");
                window.location.href = "../";
            } else {
                alert("请求错误:" + response.message);
            }
        })
        .catch(error => console.log('error', error));
}


    