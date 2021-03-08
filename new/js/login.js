var API = "https://nspyf.top:10000";

document.getElementById("login").onclick = function() {
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "user": username,
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
            if (response.code == 0) {
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("username", response.data.username)
                localStorage.setItem("user_id", response.data.id)
                alert("登录成功");
                window.location.href = "../"
            } else {
                alert(response.message);
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

function tokenVerify() {
    token = localStorage.getItem("token");
    username = localStorage.getItem("username");
    id = localStorage.getItem("user_id");
    if (token == null || username == null || id == null) {
        return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Token", token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    fetch(API + "/auth/token", requestOptions)
        .then(response => response.json())
        .then((response) => {
            if (response.code == 0) {
                alert(username + "欢迎回来！");
            } else {
                alert(response.message);
                return;
            }
        })
        .catch(error => console.log('error', error));
}

function main() {
    tokenVerify();
}

main();