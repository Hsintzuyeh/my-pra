let ctx, thisImage;

//initial
$(function () {
    $("[type='date']").on("change", showDate);
    ctx = $("#myCanvas")[0].getContext("2d");
});


function showDate() {
    // debugger
    console.log(this.value);  
    var thisDate = this.value;
    // use typeof check data type - string
    thisDate = thisDate.replace(/-/g, "");
    // debugger;
    thisImage = new Image();
    thisImage.src = "flipClockNumbers.png";
    thisImage.onload = function () {
        for (var x = 0; x < thisDate.length; x++) {
            ctx.drawImage(thisImage, thisDate[x] * 80, 0, 90, 130, 60 * x, 0, 60, 100);
        // 原本的圖 找一個點+寬、高，放在canvas的某個點+要的寬、高
        }
    };
}