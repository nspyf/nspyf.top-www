var API = "https://nspyf.top:778";

var titleElmt = document.getElementById("title");
var detailElmt = document.getElementById("detail");
var viewElmt = document.getElementById("view");

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
        alert("未指定文章")
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
                    titleElmt.innerHTML = response.data.title;
                    detailElmt.innerHTML = "create_time:" + response.data.create_time + "<br>update_time:" + response.data.update_time;
                    viewElmt.innerHTML = marked(response.data.md, { breaks: true });
                } else {
                    alert("请求错误:" + response.message);
                }
            })
            .catch(error => console.log('error', error));
    }
    return;
}

function main() {
    load();
}

main();