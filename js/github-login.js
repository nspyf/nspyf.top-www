var API = "https://nspyf.top:10000";
var code;

function FirstParam(name) {
    var url = document.location.toString();
    var arr = url.split("?");
    if (arr.length > 1) {
        var a = arr[1].split("&");
        for (var i = 0; i < a.length; i++) {
            p = a[i].split("=");
            if (p != null && p[0] == name) {
                return p[1];
            }
        }
        return "";
    } else {
        return "";
    }
}

function githubLogin() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "code": code
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
    };

    fetch(API + "/github-login", requestOptions)
        .then(response => response.json())
        .then((response) => {
            if (response.code == 0) {
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("username", response.data.username)
                localStorage.setItem("user_id", response.data.id)
                window.location.href = "../"
            } else if(response.code == 30001){
                githubRegister();
            } else {
                alert(response.message);
            }
        })
        .catch(error => console.log('error', error));
}

function githubRegister() {
    username = prompt("首次第三方登录需要输入用户名\n仅含大小写字母和数字\n长度大于等于2，小于等于16","");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "code": code,
        "username": username
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
    };

    fetch(API + "/github-register", requestOptions)
        .then(response => response.json())
        .then((response) => {
            if (response.code == 0) {
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("username", response.data.username)
                localStorage.setItem("user_id", response.data.id)
                window.location.href = "../"
            } else {
                alert(response.message);
            }
        })
        .catch(error => console.log('error', error));
}

function main() {
    code = FirstParam("code");
    githubLogin();
}

main();