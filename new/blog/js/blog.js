var API = "https://nspyf.top:10001";

var artBorder = document.getElementById("artBorder");
var nicknameSpan = document.getElementById("nickname");
var profileP = document.getElementById("profile");
var id;

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

function CheckID() {
    id = FirstParam(id)
    if(id == "") {
        id = localStorage.getItem("user_id");
        if (id == null) {
            return
        }
    }
}

function GetUser() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    fetch(API + "/user?id=" + id, requestOptions)
        .then(response => response.json())
        .then((response) => {
            if (response.code == 0) {
                nicknameSpan.innerText = response.data.nickname;
                profileP.innerText = response.data.profile;
            } else {
                alert(response.message);
            }
        })
        .catch(error => console.log('error', error));
}

function GetArtArr() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    fetch(API + "/article/user?id=" + id, requestOptions)
        .then(response => response.json())
        .then((response) => {
            if (response.code == 0) {
                artBorder.innerText = "";
                articleLen = response.data.length;

                for (i = articleLen - 1; i >= 0; i--) {
                    newA = document.createElement("a");
                    newA.href = "./article?id=" + response.data[i].id;
                    newA.className = "yellowBlock center";
                    title = document.createElement("p");
                    title.innerText = response.data[i].title;
                    newA.appendChild(title)
                    ab = document.createElement("p");
                    ab.innerText = response.data[i].abstract;
                    newA.appendChild(ab)
                    artBorder.appendChild(newA);

                    newBr = document.createElement("br");
                    artBorder.appendChild(newBr);
                }

            } else {
                alert(response.message);
            }
        })
        .catch(error => console.log('error', error));
    return;
}

function main() {
    CheckID();
    GetUser();
    GetArtArr();
}

main();