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

}