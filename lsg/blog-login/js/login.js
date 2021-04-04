var API="https://nspyf.top:10000"



document.getElementById("login").onclick=function(){
    username=document.getElementById("username").value;
    password=document.getElementById("password").value;
    
    
    

  var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    var raw = JSON.stringify({
        "user": username,
        "password": password,
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    fetch(API + "/login", requestOptions)
        .then(response => response.json())
        .then((response) => {
            if (response.code == 0) {
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("username", response.data.username)
                localStorage.setItem("user_id", response.data.id)
                alert("登录成功");
                window.location.href = "../blog";//例外：地址是根据上一层index.html的地址的
            } else {
                alert("请求错误:" + response.message);
            }
        })
        .catch(error => console.log('error', error));
       
}
document.getElementById("exit").onclick = function() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("user_id");
    alert("登录状态已清空");
}