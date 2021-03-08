var API = "https://nspyf.top:778";

var contentElmt = document.getElementById("content");
var viewElmt = document.getElementById("view");
var artTitleElmt = document.getElementById("artTitle");
var artClassElmt = document.getElementById("artClass");
var detailElmt = document.getElementById("detail");
var thisTitleElmt = document.getElementById("thisTitle");
var thisIDElmt = document.getElementById("thisID");

var interval = 1000;

function GetUrlParam(paraName) {
    var url = document.location.toString();
    var arrObj = url.split("?");
    if (arrObj.length > 1) {
        var arrPara = arrObj[1].split("&");
        var arr;
        for (var i = 0; i < arrPara.length; i++) {
            arr = arrPara[i].split("=");
            if (arr != null && arr[0] == paraName) {
                return arr[1];
            }
        }
        return "";
    } else {
        return "";
    }
}

function load() {
    articleID = GetUrlParam("article");
    if (articleID == "") {
        thisTitleElmt.innerText = "新文章";
        thisIDElmt.innerText = "undefined";
    } else {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        fetch(API + "/article?article=" + articleID, requestOptions)
            .then(response => response.json())
            .then((response) => {
                if (response.status == "1") {
                    thisTitleElmt.innerText = response.data.title;
                    thisIDElmt.innerText = articleID;

                    artTitleElmt.value = response.data.title;
                    artClassElmt.value = response.data.class;
                    detailElmt.innerHTML = "create_time:" + response.data.create_time + "<br>update_time:" + response.data.update_time;

                    contentElmt.value = response.data.md;
                    viewElmt.innerHTML = marked(response.data.md, { breaks: true });
                } else {
                    alert("请求错误:" + response.message);
                }
            })
            .catch(error => console.log('error', error));
    }
    return;
}

document.getElementById("commit").onclick = function() {
    token = localStorage.getItem("nspyfToken");
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

    articleID = GetUrlParam("article");
    if (articleID == "") {

        choose = confirm("确认创建文章");
        if (choose == false) {
            return
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Token", token);

        var raw = JSON.stringify({
            "title": artTitle,
            "class": artClass,
            "md": contentElmt.value,
            "html": marked(contentElmt.value, { breaks: true })
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw
        };

        fetch(API + "/admin/article", requestOptions)
            .then(response => response.json())
            .then((response) => {
                if (response.status == "1") {
                    alert("提交成功，新建文章：" + artTitle);
                    window.location.href = "./?article=" + response.data.id;
                } else {
                    alert("请求错误:" + response.message);
                }
            })
            .catch(error => console.log('error', error));
    }
    if (articleID != "") {

        choose = confirm("确认修改文章");
        if (choose == false) {
            return
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Token", token);

        var raw = JSON.stringify({
            "id": articleID,
            "title": artTitle,
            "class": artClass,
            "md": contentElmt.value,
            "html": marked(contentElmt.value, { breaks: true })
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw
        };

        fetch(API + "/admin/article", requestOptions)
            .then(response => response.json())
            .then((response) => {
                if (response.status == "1") {
                    alert("提交成功，文章已修改");
                    load();
                } else {
                    alert("请求错误:" + response.message);
                }
            })
            .catch(error => console.log('error', error));
    }
}

document.getElementById("toView").onclick = function() {
    viewElmt.innerHTML = marked(contentElmt.value, { breaks: true });
}

window.onbeforeunload = function() {
    return "是否要离开编辑页面？请确保想保存数据已提交";
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