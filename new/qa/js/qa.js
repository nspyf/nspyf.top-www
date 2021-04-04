var API = "https://nspyf.top:10002";
var optionQ = "-1";
var optionA = "-1";
var optionQData;
var optionAData;

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


function loadView() {
    var viewObj = document.getElementById("view");

    var requestOptions = {
        method: 'GET',
    };

    fetch(API + "/information?id=" + GetUrlParam("id"), requestOptions)
        .then(response => response.json())
        .then((response) => {
            if (response.code == 0) {
                if (response.data[0] == undefined) {
                    viewObj.innerText = "还没有人给TA提问";
                } else {
                    //viewObj.innerText = JSON.stringify(response.data, null, 2);
                    viewObj.innerText = ""; //内存泄露？

                    questionLen = response.data.length;
                    for (i = 0; i < questionLen; i++) {
                        newA = document.createElement("a");
                        newA.href = "javascript:chooseQ(\"" + response.data[i].id + "\",\"" + response.data[i].data + "\");";
                        newA.className = "yellowBlock";
                        newA.innerText = response.data[i].data;
                        viewObj.appendChild(newA);

                        answerLen = response.data[i].answer.length;
                        for (j = 0; j < answerLen; j++) {
                            newA = document.createElement("a");
                            newA.href = "javascript:chooseA(\"" + response.data[i].answer[j].id + "\",\"" + response.data[i].answer[j].data + "\");";
                            newA.className = "blueBlock";
                            newA.innerText = response.data[i].answer[j].data;
                            viewObj.appendChild(newA);
                        }

                        newBr = document.createElement("br");
                        viewObj.appendChild(newBr);
                    }
                }
            } else {
                alert(response.message);
            }
        })
        .catch(error => console.log('error', error));
}

document.getElementById("ask").onclick = function() {
    content = document.getElementById("content").value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "user_id": GetUrlParam("id"),
        "data": content
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
    };

    fetch(API + "/question", requestOptions)
        .then(response => response.json())
        .then((response) => {
            if (response.code == 0) {
                loadView();
                alert("提问成功");
            } else {
                alert(response.message);
            }
        })
        .catch(error => console.log('error', error));
}

document.getElementById("respond").onclick = function() {
    token = localStorage.getItem("nspyfToken");
    if (token == null) {
        alert("未登陆，无权限操作");
        return
    }

    if (optionQ == "-1") {
        alert("未选择问题");
        return;
    }

    content = document.getElementById("content").value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Token", token);

    var raw = JSON.stringify({
        "question_id": optionQ,
        "data": content
    });

    optionQ = "-1";
    optionA = "-1";

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
    };

    fetch(API + "/auth/answer", requestOptions)
        .then(response => response.json())
        .then((response) => {
            if (response.code == 0) {
                loadView();
                alert("回复成功")
            } else {
                alert(response.message);
            }
        })
        .catch(error => console.log('error', error));
}

document.getElementById("delete").onclick = function() {
    token = localStorage.getItem("nspyfToken");
    if (token == null) {
        alert("未登陆，无权限操作");
        return
    }

    if (optionQ == "-1" && optionA == "-1") {
        alert("未选择问题");
        return;
    }

    var id;
    var router;

    if (optionQ != "-1") {
        choose = confirm("删除问题：" + optionQData);
        if (choose == false) {
            return;
        }
        id = optionQ;
        router = "question";
    } else if (optionA != "-1") {
        choose = confirm("删除答案：" + optionAData);
        if (choose == false) {
            return;
        }
        id = optionA;
        router = "answer";
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Token", token);

    var raw = JSON.stringify({
        "id": id
    });

    optionQ = "-1";
    optionA = "-1";

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw
    };

    fetch(API + "/auth/" + router, requestOptions)
        .then(response => response.json())
        .then((response) => {
            if (response.code == 0) {
                loadView();
                alert("删除成功")
            } else {
                alert(response.message);
            }
        })
        .catch(error => console.log('error', error));
}

function chooseQ(id, question) {
    optionQ = id;
    optionA = "-1";
    optionQData = question;
    alert("已选择问题：" + question)
}

function chooseA(id, answer) {
    optionQ = "-1";
    optionA = id;
    optionAData = answer;
    alert("已选择答案：" + answer)
}

document.getElementById("copy").onclick = function() {
    shareObj = document.getElementById("shareCopy");
    shareObj.select();
    document.execCommand("Copy");
    alert("复制成功");
}

function main() {
    id = GetUrlParam("id");
    user_id = localStorage.getItem("user_id");
    if (id == "") {
        if (user_id != null) {
            window.location.href = "./?id=" + user_id;
        } else {
            window.location.href = "./?id=1";
        }
        return 
    }
    if (user_id == id) {
        document.getElementById("respond").style.display = "flex";
        document.getElementById("delete").style.display = "flex";
    }
    loadView();
    shareTextObj = document.getElementById("shareText");
    shareTextObj.innerText = window.location.toString();
    shareCopyObj = document.getElementById("shareCopy");
    shareCopyObj.innerText = window.location.toString();
    hostObj = document.getElementById("host");
    hostObj.innerText = GetUrlParam(id);
}

main();