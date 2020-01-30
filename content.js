/*document.onmouseup = document.onkeyup = document.onseelctionchange = () => {
    let content = window.getSelection().toString();
    chrome.storage.sync.set({ content });
};*/

let blocks = document.getElementById("previewEmail").contentWindow.document.getElementsByClassName("shsp-wireframe");
let block = [];

// Cannot set more than 2 blocks to an array - error - "QUOTA_BYTS_PER_ITEM quota exceeded"
// Instead need to try setting each block to its own variable.

/*for (let i = 0; i < blocks.length; i++) {
    if (block.getElementsByClassName("full content")[0].parentElement.innerHTML.toString().length >= 5000) {
        let name = "block" + "" + i;
        block.push(name);
        let block1 = block.getElementsByClassName("full content")[0].parentElement.innerHTML.toString().slice(0, 5000);
        chrome.storage.sync.set({ name: block1 }, () => {
        })
        name = "block" + "" + i + "" + "2";
        block.push(name);
        let block2 = block.getElementsByClassName("full content")[0].parentElement.innerHTML.toString().slice(5000, block.length);
        chrome.storage.sync.set({ block: block2 }, () => {
        })
    } else {
        let block1 = block.getElementsByClassName("full content")[0].parentElement.innerHTML.toString();
        chrome.storage.sync.set({ block1String: block1 }, () => {
        })
    }
}*/
if (blocks[0]) {
    if (blocks[0].getElementsByClassName("full").length > 0) {
        console.log("blocks[0] length: " + blocks[0].getElementsByClassName("full")[0].parentElement.innerHTML.toString().length);
        //block1 = blocks[1].innerHTML.toString();
        if (blocks[0].getElementsByClassName("full")[0].parentElement.innerHTML.toString().length >= 5000) {
            let block1string = blocks[1].getElementsByClassName("full")[0].parentElement.innerHTML.toString().slice(0, 5000);

            let block12 = blocks[0].getElementsByClassName("full")[0].parentElement.innerHTML.toString().slice(5000, blocks[0].length);
            chrome.storage.sync.set({ block0String: block1String }, () => {
            })
            chrome.storage.sync.set({ block02String: block12 }, () => {
            })
        } else {
            let block1 = blocks[0].getElementsByClassName("full")[0].parentElement.innerHTML.toString();
            chrome.storage.sync.set({ block0String: block1 }, () => {
            })
        }
    }
}

if (blocks[1]) {
    console.log("blocks[1] length: " + blocks[1].getElementsByClassName("full content")[0].parentElement.innerHTML.toString().length);
    //block1 = blocks[1].innerHTML.toString();
    if (blocks[1].getElementsByClassName("full content")[0].parentElement.innerHTML.toString().length >= 5000) {
        let block1string = blocks[1].getElementsByClassName("full content")[0].parentElement.innerHTML.toString();
        block1 = block1string.slice(0, 5000);

        block12 = blocks[1].getElementsByClassName("full content")[0].parentElement.innerHTML.toString().slice(5000, blocks[1].length);
        chrome.storage.sync.set({ block1String: block1 }, () => {
        })
        chrome.storage.sync.set({ block12String: block12 }, () => {
        })
    } else {
        block1 = blocks[1].getElementsByClassName("full content")[0].parentElement.innerHTML.toString();
        chrome.storage.sync.set({ block1String: block1 }, () => {
        })
    }
}

if (blocks[2]) {
    if (blocks[2].getElementsByClassName("full").length > 0) {
        console.log("blocks[2] length: " + blocks[2].getElementsByClassName("full")[0].parentElement.innerHTML.toString().length);
        //block1 = blocks[1].innerHTML.toString();
        if (blocks[2].getElementsByClassName("full")[0].parentElement.innerHTML.toString().length >= 5000) {
            let block1string = blocks[2].getElementsByClassName("full")[0].parentElement.innerHTML.toString().slice(0, 5000);

            let block12 = blocks[2].getElementsByClassName("full")[0].parentElement.innerHTML.toString().slice(5000, blocks[2].length);
            chrome.storage.sync.set({ block2String: block1String }, () => {
            })
            chrome.storage.sync.set({ block22String: block12 }, () => {
            })
        } else {
            let block1 = blocks[2].getElementsByClassName("full")[0].parentElement.innerHTML.toString();
            chrome.storage.sync.set({ block2String: block1 }, () => {
            })
        }
    }
}

/*
if (blocks[2])
*/

