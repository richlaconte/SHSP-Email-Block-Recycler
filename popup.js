let refresh = document.getElementById('refresh');
let copy = document.getElementById('copy');
let paste = document.getElementById('paste');
let previous = document.getElementById('previous');
let next = document.getElementById('next');

paste.onclick = (element) => {
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

let currentBlock = 0;
let code = [];
let blockTotal;

next.onclick = () => {
    if (currentBlock < blockTotal) {
        currentBlock++;
        renderCurrentBlock();
    }
}
previous.onclick = () => {
    if (currentBlock > 0) {
        currentBlock--;
        renderCurrentBlock();
    }
}

let hideBlocks = () => {
    for (let i = 0; i < blockTotal; i++) {
        document.getElementById("code" + "" + i).style.display = "none";
    }
}

let renderCurrentBlock = () => {
    hideBlocks();
    document.getElementById("code" + "" + currentBlock).style.display = "block";
}

chrome.storage.sync.get(stored => {
    blockTotal = stored.blockTotal;
    for (let i = 0; i < stored.blockTotal; i++) {
        let div = document.createElement("DIV");
        div.id = "code" + "" + i;
        div.style.display = "none";
        div.innerHTML = stored["block" + "" + i + "" + "String"];
        if (stored["block" + i + "1String"]) {
            div.innerHTML += stored["block" + i + "1String"];
            if (stored["block" + i + "2String"]) {
                div.innerHTML += stored["block" + i + "2String"];
                if (stored["block" + i + "3String"]) {
                    div.innerHTML += stored["block" + i + "3String"];
                    if (stored["block" + i + "4String"]) {
                        div.innerHTML += stored["block" + i + "4String"];
                    }
                }
            }
        }
        document.getElementById("codeArea").appendChild(div);
        code.push(div);
    }
    renderCurrentBlock();
});