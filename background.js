chrome.runtime.onMessage.addListener(onMessage);

function onMessage(message) {
    fetch('https://my-dev-test-dev-ed.my.salesforce.com/services/data/v47.0/query/?q=select+Id+from+Account',
    {
        method: 'GET',
        headers: createHeaders()
    })
    .then(response => {
        console.log(response.body);
        if (!response) throw "XDDD";
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));

    return true;
}

function createHeaders() {
    return new Headers({
        'Authorization': 'Bearer 00D3X000002NiWW!AR0AQBIb1H8wHDllBMa_CGag9woJKPPlmgLVyCXADYpfvxbbEuSiaSU9IHXFHZc2YuSn_hxrfxZckC24trP9MnauSaoW_ugz',
        'Accept': 'application/json; charset=UTF-8'
    });
}