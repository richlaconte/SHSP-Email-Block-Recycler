const parse = (html) => {
    let base = html;
    let test = base.search('tracked?');
    let found = base.substr(test, 80);
    let goodStuff = found.split('"')[2];
    templateID = goodStuff.split('/')[3];
    return goodStuff;
}
async function get(url) {
    const response = await fetch(url, {});
    const text = await response.text();

    return text;
}

let script = document.createElement("SCRIPT");
script.innerHTML = "let testScript = () => {console.log('it worked!!')}";
script.innerHTML += `
document.addEventListener('setEmail', function(e) {
    window.myData = e.detail;
    setEmail(window.myData.templateID, window.myData.templateHTML, window.myData.addedBlocksHTML);
})
const setEmail = (templateID, templateHTML, addedBlocksHTML) => {
    window.api.setEmail(templateID, {
        "unsubscribeCategoryID": 0,
        "subject": "tracked?",
        "dynamicSubject": "",
        "dynamicSubjectAudienceID": "",
        "fromName": "Market Marketing",
        "fromEmail": "richl.laconte@test.com",
        "title": "tracked?",
        "description": "",
        "emailHTML": templateHTML + "" + addedBlocksHTML
    }, "test", "test", "test", (e) => { console.log(e) }, null);
}
`
document.getElementsByTagName("head")[0].appendChild(script);

let templateHTML;
let addedBlocksHTML;
let templateID;
let log = () => {
    console.log(templateHTML);
}
window.setTimeout(log, 3000);
get('/email/').then(text => {
    get(parse(text))
        .then(res => {
            let start = res.search('"emailHTML":');
            let end = res.search('"emailText":');
            let found = res.substr((start + 13), (end - start - 15));
            templateHTML = found;
            console.log(templateID);
            setInWindowValues(templateID, templateHTML, addedBlocksHTML);
        })
})


let setInWindowValues = (templateID, templateHTML, addedBlocksHTML) => {
    let script;
    if (document.getElementById("blockRecyclerVars")) {
        script = document.getElementById("blockRecyclerVars");
        script.innerHTML = `templateID = ${templateID}; templateHTML = \`${templateHTML}\`; addedBlocksHTML = \`${addedBlocksHTML}\`;`;
    } else {
        script = document.createElement("SCRIPT");
        script.id = "blockRecyclerVars";
        script.innerHTML = `let templateID = ${templateID}; let templateHTML = \`${templateHTML}\`; let addedBlocksHTML = \`${addedBlocksHTML}\`;`;
        document.getElementsByTagName("head")[0].appendChild(script);
    }
}


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

let remove_linebreaks = (str) => {
    let str2 = str.replace(/'/g, "\\'");
    return str2.replace(/[\r\n]+/gm, "");
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
                let html = remove_linebreaks(document.getElementById("previewEmail").contentWindow.document.querySelectorAll("[sh-layout]")[number].outerHTML);
                addedBlocksHTML += html;
                setInWindowValues(templateID, templateHTML, addedBlocksHTML);
                setEmail();
            })
        }
    }
}

const setEmail = () => {
    document.dispatchEvent(new CustomEvent('setEmail', {
        'detail': {
            'templateID': templateID,
            'templateHTML': templateHTML,
            'addedBlocksHTML': addedBlocksHTML
        }
    }))
}

window.setTimeout(main, 1000);
/*
let layouts = document.getElementById('previewEmail').contentWindow.document.getElementsByClassName("email-block-controls-clone");
for (let i = 0; i < layouts.length; i++) { layouts[i].outerHTML += '<a title="Duplicate Block" class="single-control testBtn" style="color: rgb(0, 0, 238);">test</a>'; };
let testBtn = document.getElementsByClassName("testBtn"); for (let i = 0; i < testBtn.length; i++) { testBtn[i].addEventListener("click", () => { console.log("clicked button") }) };
*/