//initial
$(function () {
    $("#dropbox").on("dragenter", dragenter);
    $("#dropbox").on("dragleave", dragleave);
    $("#dropbox").on("dragover", dragover);
    $("#dropbox").on("drop", drop);
});

function dragenter() {
    $("#dropbox").css("background-color", "red");
    $("#dropbox").text("Drop it!");
}

function dragleave() {
    $("#dropbox").css("background-color", "blue");
    $("#dropbox").text("Come here.");
}

function dragover(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    // debugger;
    let files = e.originalEvent.dataTransfer.files;
    if (files.length == 0) {
        return false;
    }
    convert(files[0]);
}

function convert(file) {
    // debugger;
    if (!file.type.match(/text.*/)) {
        alert('請拖放⽂字檔');
        dragleave();
        return false;
    }

    let reader = new FileReader();
    // onloadend 檔案Load完才執行function
    reader.onloadend = function () {
        let s = reader.result;
        
        $('#preview').text(s); // 每次都是新檔案
        // $('#preview').append("\n"+s); //保留原本的檔案 換行後是新檔案
        dragleave();
    };

    reader.readAsText(file);

}