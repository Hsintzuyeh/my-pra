$(function () {
    $("button").on("click", go);
});

const maleKeywords = ["雄","強","賢","志"];
const femaleKeywords = ["芸","芬","佩"];

let go = () => {
    // alert("hi");  https://api.jquery.com/val/
    var inputText = $("#userInput").val();
    // debugger;  https://www.w3schools.com/JSREF/jsref_includes.asp
    // Array method : some
    // String method : includes
    const isMale = maleKeywords.some(thisElement => inputText.includes(thisElement));
    const isFemale = femaleKeywords.some(thisElement => inputText.includes(thisElement));
    // debugger;
    if(isMale && isFemale){
        $("h1").text("😁🎅🤶⛄☃❄");
    }else if(isMale){
        $("h1").text("🧑🎉🛴");
    }else if(isFemale){
        $("h1").text("👩🌺🛕");
    }else{
        $("h1").text("😎⛲🌋✡🔯☸🈲");
    }
// Emoji Keyboard。Win : Windows Key + .   Mac : Ctrl + Command + Space
};