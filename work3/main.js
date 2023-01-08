let thisButton = document.getElementsByTagName("button")[0]; //因為是Elements所以要指定
let showData = document.getElementById("showData");

thisButton.addEventListener("click", loadServerData);

function loadServerData() {
    console.log("Load Server Data!");
    let xmlHttpRequest;
    if (window.XMLHttpRequest) {
        xmlHttpRequest = new XMLHttpRequest();
    } else {
        alert("No XMLHttpRequest!");
        return;
    }

    //setttings for XMLHttpRequest object
    xmlHttpRequest.open("GET", "DataFromServer.txt", true);
    xmlHttpRequest.send();

    xmlHttpRequest.onreadystatechange = function () {
        console.log("readyState : ", xmlHttpRequest.readyState);
        console.log("status : ", xmlHttpRequest.status);
        if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
            showData.innerHTML = xmlHttpRequest.responseText;
            thisButton.style.visibility = "hidden";
        }
    }





}