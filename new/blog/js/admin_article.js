var API = "https://nspyf.top:10001";

var contentElmt = document.getElementById("content");
var viewElmt = document.getElementById("view");
var artTitleElmt = document.getElementById("artTitle");
var artClassElmt = document.getElementById("artClass");
var detailElmt = document.getElementById("detail");
var thisTitleElmt = document.getElementById("thisTitle");
var thisIDElmt = document.getElementById("thisID");

var interval = 1000;

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

function load() {
    artID = FirstParam("id");
    if (artID == "") {
        thisTitleElmt.innerText = "新文章";
        thisIDElmt.innerText = "undefined";
        return ;
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    fetch(API + "/article?id=" + artID, requestOptions)
        .then(response => response.json())
        .then((response) => {
            if (response.code == 0) {
                thisTitleElmt.innerText = response.data.title;
                thisIDElmt.innerText = artID;

                artTitleElmt.value = response.data.title;
                detailElmt.innerHTML = "create_time:" + response.data.create_time + "<br>update_time:" + response.data.update_time;

                contentElmt.value = response.data.content;
                viewElmt.innerHTML = marked(response.data.content, { breaks: true });
            } else {
                alert(response.message);
            }
        })
        .catch(error => console.log('error', error));
    return;
}

document.getElementById("commit").onclick = function() {
    token = localStorage.getItem("token");
    if (token == null) {
        alert("未登陆，无权限操作");
        return
    }

    artTitle = artTitleElmt.value;
    artClass = artClassElmt.value;

    if (artTitle == "") {
        alert("标题不能为空");
        return
    }

    artID = FirstParam("id");
    if (artID == "") {

        choose = confirm("确认创建文章");
        if (choose == false) {
            return
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Token", token);

        var raw = JSON.stringify({
            "title": artTitle,
            "content": contentElmt.value,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw
        };

        fetch(API + "/auth/article", requestOptions)
            .then(response => response.json())
            .then((response) => {
                if (response.code == 0) {
                    alert("提交成功，新建文章：" + artTitle);
                    window.location.href = "./?id=" + response.data.id;
                } else {
                    alert(response.message);
                }
            })
            .catch(error => console.log('error', error));
    }
    if (artID != "") {

        choose = confirm("确认修改文章");
        if (choose == false) {
            return
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Token", token);

        var raw = JSON.stringify({
            "title": artTitle,
            "content": contentElmt.value,
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw
        };

        fetch(API + "/auth/article?id=" + artID, requestOptions)
            .then(response => response.json())
            .then((response) => {
                if (response.code == 0) {
                    alert("提交成功，文章已修改");
                    load();
                } else {
                    alert(response.message);
                }
            })
            .catch(error => console.log('error', error));
    }
}

document.getElementById("toView").onclick = function() {
    viewElmt.innerHTML = marked(contentElmt.value, { breaks: true });
}

window.onbeforeunload = function() {
    return "";
}

function setTime() {
    setTimeout("setTime()", interval);
    viewElmt.innerHTML = marked(contentElmt.value, { breaks: true });
}

function main() {
    load();
    setTime();
}

main();