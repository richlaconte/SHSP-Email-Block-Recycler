//let blocks = document.getElementById("previewEmail").contentWindow.document.getElementsByClassName("shsp-wireframe");
//let block = [];

let main = () => {
    let blocks = document.getElementById("previewEmail").contentWindow.document.querySelectorAll("[sh-layout]");

    console.log(blocks);
    console.log(blocks.length);
    console.log(blocks[0]);
    blocks[0];

    for (let i = 0; i < blocks.length; i++) {
        console.log("blocks[" + i + "] length: " + blocks[i].innerHTML.toString().length);
        //block1 = blocks[1].innerHTML.toString();
        if (blocks[i].innerHTML.toString().length >= 25000) {

        } else if (blocks[i].innerHTML.toString().length >= 20000) {
            let blockString = blocks[i].innerHTML.toString().slice(0, 5000);
            let block1String = blocks[i].innerHTML.toString().slice(5000, 10000);
            let block2String = blocks[i].innerHTML.toString().slice(10000, 15000);
            let block3String = blocks[i].innerHTML.toString().slice(15000, 20000)
            let block4String = blocks[i].innerHTML.toString().slice(20000, blocks[i].length);
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
        } else if (blocks[i].innerHTML.toString().length >= 15000) {
            let blockString = blocks[i].innerHTML.toString().slice(0, 5000);
            let block1String = blocks[i].innerHTML.toString().slice(5000, 10000);
            let block2String = blocks[i].innerHTML.toString().slice(10000, 15000);
            let block3String = blocks[i].innerHTML.toString().slice(15000, blocks[i].length);
            chrome.storage.sync.set({ ["block" + i + "String"]: blockString }, () => {
            })
            chrome.storage.sync.set({ ["block" + i + "1" + "String"]: block1String }, () => {
            })
            chrome.storage.sync.set({ ["block" + i + "2" + "String"]: block2String }, () => {
            })
            chrome.storage.sync.set({ ["block" + i + "3" + "String"]: block3String }, () => {
            })
        } else if (blocks[i].innerHTML.toString().length >= 10000) {
            let blockString = blocks[i].innerHTML.toString().slice(0, 5000);
            let block1String = blocks[i].innerHTML.toString().slice(5000, 10000);
            let block2String = blocks[i].innerHTML.toString().slice(10000, blocks[i].length);
            chrome.storage.sync.set({ ["block" + i + "String"]: blockString }, () => {
            })
            chrome.storage.sync.set({ ["block" + i + "1" + "String"]: block1String }, () => {
            })
            chrome.storage.sync.set({ ["block" + i + "2" + "String"]: block2String }, () => {
            })
        } else if (blocks[i].innerHTML.toString().length >= 5000) {
            let blockString = blocks[i].innerHTML.toString().slice(0, 5000);
            let block1String = blocks[i].innerHTML.toString().slice(5000, blocks[i].length);
            chrome.storage.sync.set({ ["block" + i + "String"]: blockString }, () => {
            })
            chrome.storage.sync.set({ ["block" + i + "1" + "String"]: block1String }, () => {
            })
        } else {
            let block1 = blocks[i].innerHTML.toString();
            chrome.storage.sync.set({ ["block" + i + "String"]: block1 }, () => {
            })
        }
    }
}

window.setTimeout(main, 1000);
/*
if (blocks[0]) {
    console.log("blocks[0] length: " + blocks[0].innerHTML.toString().length);
    //block1 = blocks[1].innerHTML.toString();
    if (blocks[0].innerHTML.toString().length >= 5000) {
        let block1String = blocks[0].innerHTML.toString().slice(0, 5000);

        let block12 = blocks[0].innerHTML.toString().slice(5000, blocks[0].length);
        chrome.storage.sync.set({ ["block" + i + "String"]: block1String }, () => {
        })
        chrome.storage.sync.set({ block02String: block12 }, () => {
        })
    } else {
        let block1 = blocks[0].innerHTML.toString();
        chrome.storage.sync.set({ block0String: block1 }, () => {
        })
    }
}
*/

// V1
/*
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
*/

// V2
