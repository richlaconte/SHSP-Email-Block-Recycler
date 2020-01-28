/*document.onmouseup = document.onkeyup = document.onseelctionchange = () => {
    let content = window.getSelection().toString();
    chrome.storage.sync.set({ content });
};*/

let blocks = document.getElementById("previewEmail").contentWindow.document.getElementsByClassName("shsp-wireframe");
let block = blocks[0];
let block0;
let block1;
let block2;
let block3;
let block4;

// Cannot set more than 2 blocks to an array - error - "QUOTA_BYTS_PER_ITEM quota exceeded"
// Instead need to try setting each block to its own variable.

if (blocks[0]) {
    block0 = blocks[0].innerHTML.toString();
}
if (blocks[1]) {
    block1 = blocks[1].innerHTML.toString();
}

let blockString = block.innerHTML.toString();

chrome.storage.sync.set({ block: block }, () => {
    console.log('color is ' + block);
})

chrome.storage.sync.set({ blockString: blockString }, () => {
    console.log('color is ' + blockString);
})

chrome.storage.sync.set({ blocks: blocks }, () => {
    console.log('color is ' + blocks);
})

chrome.storage.sync.set({ block0: block0 }, () => {
    console.log('block0 ' + block0);
})

chrome.storage.sync.set({ block1: block1 }, () => {
    console.log('block1 ' + block1);
})