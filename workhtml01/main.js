$(function(){
    // ebugger;  // debugger 下中斷點
    //Load video：set video element's src
    //find video element
    // document.getElementById("myVideo") 精簡成 $("#myVideo")
    $("#myVideo").attr("src","sample-mp4-file.mp4");
    // set Play Button <- click event ...
    // onclick, addEventListener
    $("#playBtn").on("click",function(){
        // debugger;
        //音量顯示 按play顯示數值 取到小數第2位
        $("#volumeDisplay").text($("#myVideo")[0].volume.toFixed(2));
        //進度條 最大是影片的時間
        $("#progressBar")[0].max = $("#myVideo")[0].duration;
        // debugger;
        // console.log("Yo");
        //1.Play Video or Pause Video <--Check Video Current Status
        //2.Set Button Text
        if($("#myVideo")[0].paused){
            $("#myVideo")[0].play();
            $("#playBtn").text("Pause");
        }else{
            $("#myVideo")[0].pause();
            $("#playBtn").text("Play");
        }
    });
    // Set FullScreen Button
    $("#fullBtn").on("click",function(){
        $("#myVideo")[0].webkitEnterFullscreen();
    });
    $("#lowerVolumeBtn").on("click",downVolume);
    $("#higherVolumeBtn").on("click", upVolume);
    $("#myVideo").on("timeupdate", updateProgress);
    // 如果有人拉動bar 要去change事件
    $("#progressBar").on("change", changeProgress);
       
});

function downVolume(){
    var myVideo = $("#myVideo")[0];
    if(myVideo.volume == 0){
    }else if(myVideo.volume < 0.1){
        myVideo.volume = 0;
    }else{
        myVideo.volume = myVideo.volume - 0.1;
    }
    $("#volumeDisplay").text(myVideo.volume.toFixed(2));
    //上面那句是更新版，紙本舊的
}

function upVolume(){
    var myVideo = $("#myVideo")[0];
    if(myVideo.volume == 1){
    }else if(myVideo.volume > 0.9){
        myVideo.volume = 1;
    }else{
        myVideo.volume = myVideo.volume + 0.1;
    }
    $("#volumeDisplay").text(myVideo.volume.toFixed(2));
}

function updateProgress(){
    $("#timeDisplay").text(Math.floor($("#myVideo")[0].currentTime));
    // 方法一 $("#timeDisplay").append("/"+Math.floor($("#myVideo")[0].duration)+"秒");
    // 方法二 ``符號文字直接，變數等等要用${}包起來
    $("#timeDisplay").append(`/${Math.floor($("#myVideo")[0].duration)}秒`);
    $("#progressBar")[0].value = $("#myVideo")[0].currentTime;
}

function changeProgress(){
    $("#myVideo")[0].pause(); // 因為播放時有點難拉所以加71行先暫停再73行撥放
    $("#myVideo")[0].currentTime = $("#progressBar")[0].value;
    $("#myVideo")[0].play;
}
// $("#")