//Random integer generator for the character
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

//Setting some global variables for use later in loops
var randomIntEl = document.getElementsByClassName("randomInt");
var userForm = document.getElementsByClassName("userForm")[0];
var userFormInputs = userForm.getElementsByTagName("input");
var armorEl = document.getElementsByClassName("armor")[0];
var mwlEl = document.getElementsByClassName("mwl")[0];


function clearAtt() {
    document.getElementsByName("name")[0].previousElementSibling.removeAttribute("style");
}

//Asigns a random integer to each of the fields that require random ints
for(var i = 0; randomIntEl.length > i; i++) {
    randomIntEl[i].innerText = getRandomInt(3, 18);
}

armorEl.innerHTML = getRandomInt(1, 8);
mwlEl.innerHTML = parseInt(randomIntEl[1].innerHTML)/2;

//Creates a JSON object with all the data
//The JSON object is parsed bit for bit and turned into a downloadable file that the user then gets a prompt asking where to save the file
function saveChar() {
    if(document.getElementsByName("name")[0].value !== "") {
        var formData = new FormData(userForm);
        var object = {};
        formData.forEach(function (value, key) {
            object[key] = value;
        });
        for (var i = 0; randomIntEl.length > i; i++) {
            object[randomIntEl[i].previousElementSibling.innerText] = randomIntEl[i].innerText;
        }
        object["description"] = document.getElementsByName("description")[0].value;
        object["armor"] = document.getElementsByClassName("armor")[0].innerHTML;
        object["mwl"] = document.getElementsByClassName("mwl")[0].innerHTML;
        var json = JSON.stringify(object);
        console.log(object);
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(json);
        var dlAnchorElem = document.getElementById('downloadAnchorElem');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", document.getElementsByName("name")[0].value + ".json");
        dlAnchorElem.click();
    }
    else {
        document.getElementsByName("name")[0].previousElementSibling.setAttribute("style", "color: red;");
    }
}

//When the user clicks on "import", it parses the file content and converts the JSON object into an array of which then content is fed into the fields
function loadChar() {
    var importedJson = document.getElementsByClassName("load")[0].files;
    var fr = new FileReader();
    fr.onload = function(e) {
        var result = Object.values(JSON.parse(e.target.result));
        for(var i = 0; randomIntEl.length > i; i++) {
            randomIntEl[i].innerText = result[7+i];
        }
        for(var i = 0; userFormInputs.length > i; i++) {
            userFormInputs[i].value = result[i];
        }
        document.getElementsByTagName("textarea")[0].value = result[14];
        document.getElementsByClassName("armor")[0].innerHTML = result[15];
        document.getElementsByClassName("mwl")[0].innerHTML = result[16];
    };
    fr.readAsText(importedJson.item(0));
}