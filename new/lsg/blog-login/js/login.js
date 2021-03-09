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
                alert("登录成功");
                window.location.href = "../../blog";
            } else {
                alert("请求错误:" + response.message);
            }
        })
        .catch(error => console.log('error', error));
}