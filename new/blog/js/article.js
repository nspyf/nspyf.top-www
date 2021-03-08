var API = "https://nspyf.top:10001";
s
var titleElmt = document.getElementById("title");
var detailElmt = document.getElementById("detail");
var viewElmt = document.getElementById("view");

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
        alert("未指定文章")
        return 
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
                titleElmt.innerHTML = response.data.title;
                detailElmt.innerHTML = "create_time:" + response.data.create_time + "<br>update_time:" + response.data.update_time;
                viewElmt.innerHTML = marked(response.data.md, { breaks: true });
            } else {
                alert(response.message);
            }
        })
        .catch(error => console.log('error', error));
    return;
}

function main() {
    load();
}

main();