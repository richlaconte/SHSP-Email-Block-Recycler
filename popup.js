let changeColor = document.getElementById('changeColor');
let scanPage = document.getElementById("scanPage");

chrome.storage.sync.get('color', (data) => {
    console.log(data);
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
})

changeColor.onclick = (element) => {
    console.log("test");
    let color = element.target.value;
    let test = () => {
        console.log("test has been run");
    }
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.executeScript(
            tabs[0].id,
            //{ code: 'document.body.style.backgroundColor = "' + color + '";' });
            { code: 'document.getElementById("previewEmail").contentWindow.document.getElementsByClassName("shsp-wireframe")[0].innerHTML = "test";' });
    });
};



let code = document.getElementById('code');
chrome.storage.sync.get(stored => {
    code.innerHTML = stored.blockString;
});