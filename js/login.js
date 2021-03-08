var API = "https://nspyf.top:777";

document.getElementById("login").onclick = function() {
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "username": username,
        "password": password
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
    };

    fetch(API + "/login", requestOptions)
        .then(response => response.json())
        .then((response) => {
            if (response.status == "1") {
                localStorage.setItem("nspyfToken", response.data.token)
                localStorage.setItem("nspyfUsername", username)
                alert("登录成功");
                window.location.href = "../"
            } else {
                alert("请求错误:" + response.message);
            }
        })
        .catch(error => console.log('error', error));
}

document.getElementById("exit").onclick = function() {
    localStorage.removeItem("nspyfToken");
    localStorage.removeItem("nspyfUsername");
    alert("登录状态已清空");
}

function tokenVerify() {
    token = localStorage.getItem("nspyfToken")
    username = localStorage.getItem("nspyfUsername")
    if (token == null || username == null) {
        return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Token", token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    fetch(API + "/user/token", requestOptions)
        .then(response => response.json())
        .then((response) => {
            if (response.status == "1") {
                alert(username + "欢迎回来！");
            } else {
                alert("令牌错误：" + response.message + ".请重新登录");
                return;
            }
        })
        .catch(error => console.log('error', error));
}

function main() {
    tokenVerify();
}

main();