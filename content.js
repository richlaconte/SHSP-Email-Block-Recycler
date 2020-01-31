//let blocks = document.getElementById("previewEmail").contentWindow.document.getElementsByClassName("shsp-wireframe");
//let block = [];

let main = () => {
    let blocks = document.getElementById("previewEmail").contentWindow.document.querySelectorAll("[sh-layout]");

    console.log(blocks);
    console.log(blocks.length);
    console.log(blocks[0]);
    blocks[0];

    blockTotal = 0;

    for (let i = 0; i < blocks.length; i++) {
        blockTotal++;
        console.log("blocks[" + i + "] length: " + blocks[i].outerHTML.toString().length);
        //block1 = blocks[1].outerHTML.toString();
        if (blocks[i].outerHTML.toString().length >= 25000) {

        } else if (blocks[i].outerHTML.toString().length >= 20000) {
            let blockString = blocks[i].outerHTML.toString().slice(0, 5000);
            let block1String = blocks[i].outerHTML.toString().slice(5000, 10000);
            let block2String = blocks[i].outerHTML.toString().slice(10000, 15000);
            let block3String = blocks[i].outerHTML.toString().slice(15000, 20000)
            let block4String = blocks[i].outerHTML.toString().slice(20000, blocks[i].length);
            chrome.storage.sync.set({ ["block" + i + "String"]: blockString }, () => {
            })
            chrome.storage.sync.set({ ["block" + i + "1" + "String"]: block1String }, () => {
            })
            chrome.storage.sync.set({ ["block" + i + "2" + "String"]: block2String }, () => {
            })
            chrome.storage.sync.set({ ["block" + i + "3" + "String"]: block3String }, () => {
            })
            chrome.storage.sync.set({ ["block" + i + "4" + "String"]: block4String }, () => {
            })
        } else if (blocks[i].outerHTML.toString().length >= 15000) {
            let blockString = blocks[i].outerHTML.toString().slice(0, 5000);
            let block1String = blocks[i].outerHTML.toString().slice(5000, 10000);
            let block2String = blocks[i].outerHTML.toString().slice(10000, 15000);
            let block3String = blocks[i].outerHTML.toString().slice(15000, blocks[i].length);
            chrome.storage.sync.set({ ["block" + i + "String"]: blockString }, () => {
            })
            chrome.storage.sync.set({ ["block" + i + "1" + "String"]: block1String }, () => {
            })
            chrome.storage.sync.set({ ["block" + i + "2" + "String"]: block2String }, () => {
            })
            chrome.storage.sync.set({ ["block" + i + "3" + "String"]: block3String }, () => {
            })
        } else if (blocks[i].outerHTML.toString().length >= 10000) {
            let blockString = blocks[i].outerHTML.toString().slice(0, 5000);
            let block1String = blocks[i].outerHTML.toString().slice(5000, 10000);
            let block2String = blocks[i].outerHTML.toString().slice(10000, blocks[i].length);
            chrome.storage.sync.set({ ["block" + i + "String"]: blockString }, () => {
            })
            chrome.storage.sync.set({ ["block" + i + "1" + "String"]: block1String }, () => {
            })
            chrome.storage.sync.set({ ["block" + i + "2" + "String"]: block2String }, () => {
            })
        } else if (blocks[i].outerHTML.toString().length >= 5000) {
            let blockString = blocks[i].outerHTML.toString().slice(0, 5000);
            let block1String = blocks[i].outerHTML.toString().slice(5000, blocks[i].length);
            chrome.storage.sync.set({ ["block" + i + "String"]: blockString }, () => {
            })
            chrome.storage.sync.set({ ["block" + i + "1" + "String"]: block1String }, () => {
            })
        } else {
            let block1 = blocks[i].outerHTML.toString();
            chrome.storage.sync.set({ ["block" + i + "String"]: block1 }, () => {
            })
        }
    }

    chrome.storage.sync.set({ blockTotal: blockTotal }, () => {
    })
}

window.setTimeout(main, 1000);
