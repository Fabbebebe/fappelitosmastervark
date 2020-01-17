function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

var randomIntEl = document.getElementsByClassName("randomInt");

for(var i = 0; randomIntEl.length > i; i++) {
    randomIntEl[i].innerText = getRandomInt(3, 18);
}

var armorEl = document.getElementsByClassName("armor")[0];
var mwlEl = document.getElementsByClassName("mwl")[0];

armorEl.innerHTML = getRandomInt(1, 8);
mwlEl.innerHTML = parseInt(randomIntEl[1].innerHTML)/2;

function saveChar() {
    var formData = new FormData(document.getElementsByClassName("userForm")[0]);
    var object = {};
    formData.forEach(function(value, key){
        object[key] = value;
    });
    var json = JSON.stringify(object);
    console.log(json);
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(json);
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "scene.json");
    dlAnchorElem.click();
}

function loadChar() {
    var importedJson = document.getElementsByClassName("load")[0].files;
    var fr = new FileReader();
    fr.onload = function(e) {
        var result = JSON.parse(e.target.result);
        console.log(result);
    }
    fr.readAsText(importedJson.item(0));
}