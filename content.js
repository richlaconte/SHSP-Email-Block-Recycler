/*document.onmouseup = document.onkeyup = document.onseelctionchange = () => {
    let content = window.getSelection().toString();
    chrome.storage.sync.set({ content });
};*/

let blocks = document.getElementById("previewEmail").contentWindow.document.getElementsByClassName("shsp-wireframe");
console.log(blocks);
let block = blocks[0];
console.log(block);
chrome.storage.sync.set({ block: block });