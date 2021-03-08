var API = "https://nspyf.top:778";

var artBorder = document.getElementById("artBorder");

function main() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    fetch(API + "/articles", requestOptions)
        .then(response => response.json())
        .then((response) => {
            if (response.status == "1") {
                artBorder.innerText = "";
                articleLen = response.data.length;

                for (i = articleLen - 1; i >= 0; i--) {
                    newA = document.createElement("a");
                    newA.href = "./article?article=" + response.data[i].id;
                    newA.className = "yellowBlock";
                    newA.innerText = response.data[i].title;
                    artBorder.appendChild(newA);

                    newBr = document.createElement("br");
                    artBorder.appendChild(newBr);
                }

            } else {
                alert("请求错误:" + response.message);
            }
        })
        .catch(error => console.log('error', error));
    return;
}

main();