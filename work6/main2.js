// 老師的
// 整合取得地理位置到目前的天氣範例中(main.js)
// 程式重構的原則: 1.增加可讀性(變數命名/函數命名..) 2.避免重複程式碼片段 3.效率改善(進階)
// JavaScript物件操作: 可先建立空的或是有一些東西的，然後再進行操作。
//                     let myObject = { firstName : “Ryan”};myObject.lastName = “Chung”;
// 程式執行順序: Q1.在這個地方我拿到我要的值了嗎? Q2.有重複的程式碼，應該? → 寫成函數

let cityData = [
    { name: "", lat: "", lon: "" },
    { name: "台北", lat: 25.0856513, lon: 121.421409 },
    { name: "台中", lat: 24.1852333, lon: 120.4946381 },
    { name: "高雄", lat: 22.7000444, lon: 120.0508691 },
];

let weatherAPI_URL = "https://api.openweathermap.org/data/2.5/weather?";
let weatherMapAPIKey = "55ca6e38d75786c811b058fc277a06c6";

let params = {
    appid: weatherMapAPIKey,
    units: 'metric',
    lang: 'zh_tw'
};

$(function () {
    for (let x = 0; x < cityData.length; x++) {
        $("#citySelect").append(`<option value='${x}'>${cityData[x].name}</option>`);
    }
    $("#citySelect").on("change", loadServerData);
    $("#currentLocationBtn").on("click", loadServerData);
});

function loadServerData() {
    // debugger;
    $("#result").empty();
    if (this.id == "currentLocationBtn") {
        $("#citySelect").val(0);
        if (navigator.geolocation == undefined) {
            alert("Fail to get location");
            return;
        }
        let settings = {
            enableHighAccuracy: true
        };
        navigator.geolocation.getCurrentPosition(result, error, settings);

    } else {
        if (this.value == 0) return;
        console.log("choose city");
        params.lat = cityData[this.value].lat;
        params.lon = cityData[this.value].lon;
        getLocation(weatherAPI_URL, params);

    }
}

function result(position) {
    let thisCoords = position.coords;
    params.lat = thisCoords.latitude;
    params.lon = thisCoords.longitude;
    // console.log(`Location:${thisCoords.latitude},${thisCoords.longitude}`);
    getLocation(weatherAPI_URL, params);
}

function error(err) {
    alert(err);
}

function getLocation(weatherAPI_URL, params) {
    $.getJSON(weatherAPI_URL, params)
        .done(function (data) {
            $("#result")
                .append(`<p>氣溫 : ${data.main.temp_min} ~ ${data.main.temp_max}</p>`);
            let imgAndDesc = '<p>';
            imgAndDesc += `${data.name}<br>`;
            imgAndDesc += `<img src='https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'>`;
            imgAndDesc += `${data.weather[0].description}`;
            imgAndDesc += '</p>';
            $("#result")
                .append(imgAndDesc);
        })
        .fail(function () { console.log("Error"); })
        .always(function () { console.log("Always"); });
}