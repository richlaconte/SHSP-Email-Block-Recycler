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

let code0 = document.getElementById('code0');
let code1 = document.getElementById('code1');
let code2 = document.getElementById('code2');
let code3 = document.getElementById('code3');

next.onclick = () => {
    if (currentBlock < 3) {
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
    code0.style.display = "none";
    code1.style.display = "none";
    code2.style.display = "none";
    code3.style.display = "none";
}

let renderCurrentBlock = () => {
    hideBlocks();
    if (currentBlock === 0) {
        code0.style.display = "block";
    } else if (currentBlock === 1) {
        code1.style.display = "block";
    } else if (currentBlock === 2) {
        code2.style.display = "block";
    } else if (currentBlock === 3) {
        code3.style.display = "block";
    }
}

renderCurrentBlock();

chrome.storage.sync.get(stored => {
    code0.innerHTML = stored.block0String;
    if (stored.block02String) {
        code0.innerHTML += stored.block02String;
    }

    code1.innerHTML = stored.block1String;
    if (stored.block12String) {
        code1.innerHTML += stored.block12String;
    }
    code1.innerHTML += stored.block12String;

    code2.innerHTML = stored.block2String;
    if (stored.block22String) {
        code2.innerHTML += stored.block22String;
    }
});