let thisButton = document.getElementsByTagName("button")[0]; //因為是Elements(回傳陣列)所以要指定
let Button20221202 = document.getElementById("2022/12/2");
let Button20220222 = document.getElementById("2022/2/22");
let Button20220104 = document.getElementById("2022/1/4");
let showData = document.getElementById("showData");

thisButton.addEventListener("click", loadServerData);
Button20221202.addEventListener("click", loadServerData);
Button20220222.addEventListener("click", loadServerData);
Button20220104.addEventListener("click", loadServerData);

function loadServerData() {
    // debugger;
    console.log("Load Server Data!");
    let xmlHttpRequest;
    if (window.XMLHttpRequest) {
        xmlHttpRequest = new XMLHttpRequest();
    } else {
        alert("No XMLHttpRequest!");
        return;
    }

    let thisMoment = new Date();
    if (this.id == "") {
        thisMoment = new Date();
    } else {
        thisMoment = new Date(this.id);
    }
    let thisYear = thisMoment.getFullYear();
    let thisMonth = thisMoment.getMonth() + 1 < 10 ? "0" + (thisMoment.getMonth() + 1) : thisMoment.getMonth() + 1;
    let thisDay = thisMoment.getDate() < 10 ? "0" + thisMoment.getDate() : thisMoment.getDate();
    let thisDate = thisYear.toString() + thisMonth.toString() + thisDay.toString();

    //setttings for XMLHttpRequest object
    xmlHttpRequest.open("GET", thisDate + ".txt", true);
    xmlHttpRequest.send();

    xmlHttpRequest.onreadystatechange = function () {
        console.log("readyState : ", xmlHttpRequest.readyState);
        console.log("status : ", xmlHttpRequest.status);
        if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
            showData.innerHTML = "<pre>" + xmlHttpRequest.responseText + "</pre>";
            // thisButton.style.visibility = "hidden"; 按了之後消失
        }
    }

}


//隨機笑話
$(function () {
    $("#randomBtn").on("click", loadRandomJoke);
});

function loadRandomJoke() {
    $.getJSON("https://api.chucknorris.io/jokes/random")
    .done(function (data) {
        console.log("Success");
        console.log("data.value");
        $("#showData").empty();
        // $("#showData").html(`<pre>${data.value}</pre>`);
        $("#showData").text(data.value);
    })
    .fail(function (err) {
        //debugger;        
        console.log("Status Code : ",err.status);
        // console.log("Error");
    })
    .always(function () {
        console.log("Complete!");
        // console.log("Always");
    });
}
