createLeftSideButton();

function createLeftSideButton() {
    let div = createDiv();
    div.appendChild(createSqlArea());
    document.body.appendChild(div);
}

function createDiv() {
    let div = document.createElement( 'div' );
    div.style.position = 'fixed';
    div.style.top = '50%';
    div.style.zIndex = '100';
    div.appendChild(createButton());
    return div;
}

function createButton() {
    let btn = document.createElement('button');
    btn.className = 'slds-button slds-button_brand';
    btn.innerHTML = '>';
    btn.value = 'collapsed';
    btn.addEventListener('click', buttonHandler);
    return btn;
}

function buttonHandler() {
    let btn = this;
    if (btn.value === 'collapsed') {
        showSqlArea();
        btn.innerHTML = '<';
        btn.value = 'expanded';
    } else {
        hideSqlArea();
        btn.innerHTML = '>';
        btn.value = 'collapsed';
    }
}

function createSqlArea() {
    let div = document.createElement( 'div' );
    div.id = 'sqlArea';
    div.style.position = 'relative';
    div.style.width = '400px';
    div.style.height = '200px';
    div.style.backgroundColor = 'white';
    div.appendChild(createTextField());
    div.appendChild(createSendBtn());
    return div;
}

function createTextField() {
    let input = document.createElement('input');
    input.id = 'soqlInput';
    input.type = 'text';
    return input;
}

function createSendBtn() {
    let btn = document.createElement('button');
    btn.innerHTML = 'OK';
    btn.addEventListener('click', () => {
        let input = document.getElementById('soqlInput');
        const soql = input.value;
        fetch('https://my-dev-test-dev-ed.my.salesforce.com/services/data/v47.0/query/?q=' + soql,
            {
                method: 'GET',
                headers: createHeaders()
            })
            .then(response => {
                console.log(response.text());
                console.log(response.body);
            })
            .catch(error => console.log(error))
            .finally(resp => {
                console.log(resp);
            });
    });
    return btn;
}

function getIt(soql) {
    chrome.runtime.sendMessage({soql}, response => {
        console.log(response);
    });
}

function showSqlArea() {
    console.log('block');
    let div = document.getElementById('sqlArea');
    console.log(div);
    div.style.visibility = 'visible';
}

function hideSqlArea() {
    console.log('none');
    let div = document.getElementById('sqlArea');
    console.log(div);
    div.style.visibility = 'hidden';
}

// chrome.runtime.onMessage.addListener(onMessage);
//
// function onMessage(message) {
//     console.log(message.data);
// }

function createHeaders() {
    return new Headers({
        'Authorization': 'Bearer 00D3X000002NiWW!AR0AQBIb1H8wHDllBMa_CGag9woJKPPlmgLVyCXADYpfvxbbEuSiaSU9IHXFHZc2YuSn_hxrfxZckC24trP9MnauSaoW_ugz',
        'Accept': 'application/json; charset=UTF-8'
    });
}