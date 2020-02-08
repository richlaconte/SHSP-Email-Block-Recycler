const setStrings = (index, div) => {
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

const main = () => {
    const blocks = document.getElementById("previewEmail").contentWindow.document.querySelectorAll("[sh-layout]");

    for (let i = 0; i < blocks.length; i++) {
        blocks[i].addEventListener("mouseover", (e) => {

            checkForControls(blocks[i], i);
        })

        setStrings(i, blocks[i]);
    }

    chrome.storage.sync.set({ blockTotal: blocks.length }, () => {
    })
}

const checkForControls = (block, number) => {
    if (block.getElementsByClassName("email-block-controls-recycle").length > 0) {
        return;
    } else {
        const emailControls = block.getElementsByClassName("email-layout-controls-right")[0];

        if (emailControls) {
            const newButton = '<a title="Duplicate Block" class="email-block-controls-clone single-control"><i class="icon-copy"></i></a><a title="Recycle Block" class="email-block-controls-recycle single-control" style="color: rgb(0, 0, 238);">test</a>';
            //emailControls[i].innerHTML += newButton;
            emailControls.getElementsByClassName("email-block-controls-clone")[0].outerHTML = newButton;
            emailControls.getElementsByClassName("email-block-controls-recycle")[0].addEventListener("click", () => {
                console.log("clicked block " + number);
            })
        }
    }
}


window.setTimeout(main, 1000);
/*
let layouts = document.getElementById('previewEmail').contentWindow.document.getElementsByClassName("email-block-controls-clone");
for (let i = 0; i < layouts.length; i++) { layouts[i].outerHTML += '<a title="Duplicate Block" class="single-control testBtn" style="color: rgb(0, 0, 238);">test</a>'; };
let testBtn = document.getElementsByClassName("testBtn"); for (let i = 0; i < testBtn.length; i++) { testBtn[i].addEventListener("click", () => { console.log("clicked button") }) };
*/