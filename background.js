chrome.runtime.onMessage.addListener(onMessage);

function onMessage(message, sender, sendResponse) {
    console.log(message);
    const soql = encodeURI(message.soql);
    fetch('https://my-dev-test-dev-ed.my.salesforce.com/services/data/v47.0/query/?q=' + soql,
        {
            method: 'GET',
            headers: createHeaders()
        })
        .then(response => {
            console.log(response.body);
            sendResponse({'response': response.body});
        })
        .catch(error => console.log(error));

    return true;
}

function createHeaders() {
    return new Headers({
        'Authorization': 'Bearer 00D3X000002NiWW!AR0AQBIb1H8wHDllBMa_CGag9woJKPPlmgLVyCXADYpfvxbbEuSiaSU9IHXFHZc2YuSn_hxrfxZckC24trP9MnauSaoW_ugz',
        'Accept': 'application/json; charset=UTF-8'
    });
}