let page = document.getElementById('buttonDiv');
const kButtonsColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];

function constructOptions(kButtonsColors) {
    kButtonsColors.forEach(color => createButton(color));
}

function createButton(color) {
    let button = document.createElement('button');
    button.style.backgroundColor = color;
    button.addEventListener('click', () => {setStorage(color)});
    page.appendChild(button);
}

function setStorage(color) {
    chrome.storage.sync.set({color: color}, () => {
        console.log('color is ' + color);
    });
}

constructOptions(kButtonsColors);