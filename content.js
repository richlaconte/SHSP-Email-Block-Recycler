/*document.onmouseup = document.onkeyup = document.onseelctionchange = () => {
    let content = window.getSelection().toString();
    chrome.storage.sync.set({ content });
};*/

let blocks = document.getElementById("previewEmail").contentWindow.document.getElementsByClassName("shsp-wireframe");
let block = blocks[0];
let block1;
let block2;
let block3;
let block4;

// Cannot set more than 2 blocks to an array - error - "QUOTA_BYTS_PER_ITEM quota exceeded"
// Instead need to try setting each block to its own variable.

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

chrome.storage.sync.set({ array: array }, () => {
    console.log('array =  ' + array);
})