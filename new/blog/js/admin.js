var API = "https://nspyf.top:10001";

var artBorder = document.getElementById("artBorder");

function main() {
    id = localStorage.getItem("user_id");
    if (id == null) {
        return
    }

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

main();