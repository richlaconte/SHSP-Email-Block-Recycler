let refresh = document.getElementById('refresh');
let copy = document.getElementById('copy');
let paste = document.getElementById('paste');
let previous = document.getElementById('previous');
let next = document.getElementById('next');

let copiedBlock = "";

copy.addEventListener("click", () => {
    copiedBlock = document.getElementById("code" + currentBlock).innerHTML.toString();
    console.log(copiedBlock);
})
/*
copy.onclick = () => {
    
}*/

paste.onclick = () => {
    console.log(copiedBlock);
    if (copiedBlock !== "") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.executeScript(
                tabs[0].id,
                //{ code: 'document.body.style.backgroundColor = "' + color + '";' });
                { code: 'document.getElementById("previewEmail").contentWindow.document.querSelectorAll("[sh-layout]")[0] = "' + copiedBlock + '";' });
        });
    }
};

let currentBlock = 0;
let code = [];
let blockTotal = 0;

next.onclick = () => {
    if (currentBlock < blockTotal - 1) {
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
    for (let i = 0; i < stored.blockTotal; i++) {
        blockTotal++;
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