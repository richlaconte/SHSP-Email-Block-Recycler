let setStrings = (index, div) => {
    let string = div.outerHTML.toString();

    let number = 0;

    let charStart = 0;
    let charEnd = 5000;

    chrome.storage.sync.set({ ["block" + "" + index + "" + number]: string.slice(charStart, charEnd) }, () => {
    })

    while (string[charEnd]) {
        number++;
        charStart += 5000;
        charEnd += 5000;

        chrome.storage.sync.set({ ["block" + "" + index + "" + number]: string.slice(charStart, charEnd) }, () => {
        })
    }

}

let main = () => {
    let blocks = document.getElementById("previewEmail").contentWindow.document.querySelectorAll("[sh-layout]");

    for (let i = 0; i < blocks.length; i++) {
        console.log("blocks[" + i + "] length: " + blocks[i].outerHTML.toString().length);
        setStrings(i, blocks[i]);
    }

    chrome.storage.sync.set({ blockTotal: blocks.length }, () => {
    })
}

window.setTimeout(main, 1000);