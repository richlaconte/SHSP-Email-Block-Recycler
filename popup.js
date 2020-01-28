let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', (data) => {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
})

changeColor.onclick = (element) => {
    let color = element.target.value;
    let test = () => {
        console.log("test has been run");
    }
    /*chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.executeScript(
            tabs[0].id,
            //{ code: 'document.body.style.backgroundColor = "' + color + '";' });
            { code:  });
    });*/
};
let code = document.getElementById('code');
chrome.storage.sync.get(stored => {
    console.log(stored.block.toSTring());
    code.innerHTML = stored.block;
});