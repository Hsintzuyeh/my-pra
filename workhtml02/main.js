let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnemy;
//mapArray - 決定地圖中每個格子的元素
//ctx - HTML5 Canvas用
//currentImgMain：x,y location
//currentImgMainX, currentImgMainY - 決定主角所在座標
//imgXXX：image object
//imgMountain, imgMain, imgEnemy - 障礙物, 主角, 敵人的圖片物件
const gridLength = 200;


//第二種寫法12~29，59~75
function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function () {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}


//Game initial
//網頁載入完成後初始化動作
$(function () {
    mapArray = [ //0-可走Empty,1-障礙Obstacle,
        //2-終點Final Stop,3-敵人Enemy
        [0, 1, 1],
        [0, 0, 0],
        [3, 1, 2]
    ];

    //Canvas:畫布or畫一塊地 指定2d
    ctx = $("#myCanvas")[0].getContext("2d");
    //把主角擺上畫面
    imgMain = new Image();
    imgMain.src = "images/spriteSheet.png";
    currentImgMain = {
        "x": 0,
        "y": 0
    };

    imgMain.onload = function () {
        ctx.drawImage(imgMain, 0, 0, 80, 130,
            currentImgMain.x, currentImgMain.y, gridLength, gridLength);
    };

    var sources = {
        mountain: 'images/material.png',
        enemy: 'images/Enemy.png'
    };


    loadImages(sources, function (images) {
        for (var x in mapArray) {
            for (var y in mapArray[x]) {
                if (mapArray[x][y] == 1) { //指定竹筍位置
                    ctx.drawImage(images.mountain, 32, 65, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 3) { //指定敵人位置
                    ctx.drawImage(images.enemy, 7, 40, 104, 135, y * gridLength, x * gridLength, gridLength, gridLength);
                }
            }
        }
    });

    //用js練習寫一個99乘法表


    //原教材寫法
    // imgMountain = new Image();
    // imgMountain.src = "images/material.png";
    // imgEnemy = new Image();
    // imgEnemy.src = "images/Enemy.png";

    // imgMountain.onload = function () {
    //     imgEnemy.onload = function () {
    //         for (var x in mapArray) {
    //             for (var y in mapArray[x]) {
    //                 if (mapArray[x][y] == 1) { //指定竹筍位置
    //                     ctx.drawImage(imgMountain, 32, 65, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);
    //                 } else if (mapArray[x][y] == 3) { //指定敵人位置
    //                     ctx.drawImage(imgEnemy, 7, 40, 104, 135, y * gridLength, x * gridLength, gridLength, gridLength);
    //                 }
    //             }
    //         }
    //     }
    // }


});


// User Event
//處理使用者按下按鍵
$(document).on("keydown", function (event) {
    // debugger;
    let targetImg, targetBlock, cutImagePositionX;
    targetImg = { //主角的目標座標
        "x": -1,
        "y": -1
    };

    targetBlock = { //主角的目標(對應2維陣列)
        "x": -1,
        "y": -1
    }

    event.preventDefault();
    //避免鍵盤預設行為發生，如捲動/放大/換頁...
    //判斷使用者按下什麼並推算目標座標

    console.log(event.code);

    switch (event.code) {
        case "ArrowLeft":
            targetImg.x = currentImgMain.x - gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 175;//臉朝左 face left
            break;
        case "ArrowUp":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y - gridLength;
            cutImagePositionX = 355;//臉朝上 face up
            break;
        case "ArrowRight":
            targetImg.x = currentImgMain.x + gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 540;//臉朝右 face right
            break;
        case "ArrowDown":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y + gridLength;
            cutImagePositionX = 0;//臉朝下 face down
            break;
        default://其他按鍵不處理 other key- no effect
            return;
    }

    //確認目標位置不會超過地圖confirm the main role will not leave the map
    if (targetImg.x <= 400 && targetImg.x >= 0 && targetImg.y <= 400 && targetImg.y >= 0) {
        targetBlock.x = targetImg.y / gridLength;
        targetBlock.y = targetImg.x / gridLength;
    } else {
        targetBlock.x = -1;
        targetBlock.y = -1;
    }
    //清空主角原本所在的位置clear main role
    ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);

    // check map data
    if (targetBlock.x != -1 && targetBlock.y != -1) {
        switch (mapArray[targetBlock.x][targetBlock.y]) {
            case 0: // 一般道路(可移動) can go
                $("#talkBox").text("");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 1: // 有障礙物(不可移動) Mountain
                $("#talkBox").text("有山");
                break;
            case 2: // 終點(可移動) can go - Final Stop
                $("#talkBox").text("抵達終點");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 3: // 敵人(不可移動) Enemy
                $("#talkBox").text("哈摟");
                break;
        }
    } else {
        $("#talkBox").text("邊界");
    }

    //重新繪製主角
    ctx.drawImage(imgMain, cutImagePositionX, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridLength, gridLength);

});