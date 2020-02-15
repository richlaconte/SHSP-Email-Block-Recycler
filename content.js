const parse = (html) => {
    let name = 'shspRecyclerBlockStorage0001';
    let base = html;
    let test = base.search(name);
    console.log(test);
    let found = base.substr(test, (test + name.length));
    console.log(found);
    let goodStuff = found.split('"')[2];
    console.log(goodStuff);
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
        "title": "shspRecyclerBlockStorage0001",
        "description": "",
        "emailHTML": templateHTML + "" + addedBlocksHTML
    }, "test", "test", "test", (e) => { console.log(e) }, null);
}

$(document).ajaxSuccess(function (event, xhr, settings) {
    console.log("Triggered ajaxSuccess handler.");
    console.log(settings.url);


    if (settings.url === "/api/setEmail") {
        console.log("dispatching setButtons");
        document.dispatchEvent(new CustomEvent('setButtons', {
            'detail': {
            }
        }))
    }
    if (settings.url === "/email/edit/") {
        cnosole.log("edit email called");
    }
});
`
document.getElementsByTagName("head")[0].appendChild(script);

let templateHTML;
let templateBlocks = [];
let addedBlocksHTML;
let templateID;

document.addEventListener('setButtons', () => {
    console.log("heard dispatch, calling setButtons");
    setButtons();
})

// ************************
// Get storage email HTML
// ************************
get('/email/').then(text => {
    get(parse(text))
        .then(res => {
            let start = res.search(`"emailHTML":`);
            let end = res.search(`"emailText":`);
            let found = res.substr((start + 13), (end - 15));
            templateHTML = removeEscapes(found);

            let splitHTML = templateHTML.split(`<div sh-template-name="shsp-wireframe"`);
            console.log(splitHTML);

            templateHTML = "";

            for (let i = 1; i < splitHTML.length; i++) {
                if (splitHTML[i].search(`","emailText":"","createTimestamp":"`)) {
                    //console.log(splitHTML[i]);

                    let html = splitHTML[i].split(`","emailText":"","createTimestamp":"`);
                    //console.log(html);
                    templateHTML += `<div sh-template-name="shsp-wireframe"`;
                    templateHTML += html[0];
                    //console.log(html[0]);
                    //console.log(html[1]);
                    console.log(templateHTML);

                    templateBlocks[i - 1] = `<div sh-template-name="shsp-wireframe"`;
                    templateBlocks[i - 1] += html[0];

                } else {
                    templateHTML += `<div sh-template-name="shsp-wireframe"`;
                    templateHTML += splitHTML[i];

                    templateBlocks[i - 1] = `<div sh-template-name="shsp-wireframe"`;
                    templateBlocks[i - 1] += splitHTML[i];
                }
            }

            console.log(templateBlocks);
            console.log(templateID);
            setInWindowValues(templateID, templateHTML, addedBlocksHTML);

            addTab();
            addDragAndDrops(templateBlocks);
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

const setButtons = () => {
    const blocks = document.getElementById("previewEmail").contentWindow.document.querySelectorAll("[sh-layout]");
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].addEventListener("mouseover", (e) => {

            checkForControls(blocks[i], i);
        })
    }
    makeSpacersEditable();
}

const hitSave = () => {
    let saveBtn = document.getElementById("saveEmail");
    saveBtn.click();
}

let removeEscapes = (str) => {
    let str3 = str.replace(/\\n/g, '');
    let str2 = str3.replace(/\\/g, '');
    return str2;
}

const addTab = () => {
    let tabs = document.getElementsByClassName("pane-tabs sub-pane-tabs")[0];
    tabs.innerHTML += `<a href="#dragonBlockPane" id="dragonBlockPaneTab" class="hide-history" data-toggle="tab" data-original-title="">
    <i class="icon-refresh icon-spin"></i> Saved Blocks                    </a>`;
}

const addDragAndDrops = (blocks) => {
    // ***************
    // Add the handles
    // ***************
    let subTabs = document.getElementsByClassName("sub-tabs")[0];

    let temp = `<div id="dragonBlockPane" class="pane-content hide active" style="display: none;">
    <ul class="email-drag-and-drop-items">`;

    for (let i = 0; i < blocks.length; i++) {
        temp += `<li class="email-drag-item email-drag-layout ui-draggable ui-draggable-handle" data-tpl="emailLayout-wireframe-blockRecycler` + i + `">
        <img src="/includes/img/emails/drag/wireframe/text.svg" width="200">
        <div>Block` + i + `</div>
    </li>`;
    }
    temp += `</ul></div>`;

    subTabs.innerHTML += temp;

    // ***************
    // Add the scripts
    // ***************
    let body = document.getElementsByTagName("BODY")[0];
    for (let i = 0; i < blocks.length; i++) {
        let html = `<script id="emailLayout-wireframe-blockRecycler` + i + `" type="text/template">`;
        html += blocks[i];
        html += `</script>`;

        let script = document.createElement("SCRIPT");
        body.appendChild(script);
        script.outerHTML = html;
    }

    // *******************
    // Hit the save button
    // *******************
    hitSave();
}


const checkForControls = (block, number) => {
    if (block.getElementsByClassName("email-block-controls-recycle").length > 0) {
        return;
    } else {
        const emailControls = block.getElementsByClassName("email-layout-controls-right")[0];

        if (emailControls) {
            const newButton = '<a title="Duplicate Block" class="email-block-controls-clone single-control"><i class="icon-copy"></i></a><a title="Recycle Block" class="email-block-controls-recycle single-control" style="color: rgb(0, 0, 238);"><i class="icon-refresh icon-spin"></i></a>';
            //emailControls[i].innerHTML += newButton;
            emailControls.getElementsByClassName("email-block-controls-clone")[0].outerHTML = newButton;
            emailControls.getElementsByClassName("email-block-controls-recycle")[0].addEventListener("click", () => {
                console.log("clicked block " + number);
                let html = document.getElementById("previewEmail").contentWindow.document.querySelectorAll("[sh-layout]")[number].outerHTML;
                addedBlocksHTML += html;

                console.log(addedBlocksHTML);

                let test = templateHTML + "" + addedBlocksHTML;

                setInWindowValues(templateID, templateHTML, test);
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

const makeSpacersEditable = () => {
    const spacers = document.getElementById("previewEmail").contentWindow.document.querySelectorAll("[sh-spacer]");

    for (let i = 0; i < spacers.length; i++) {
        const height = spacers[i].height;
        spacers[i].outerHTML = editableSpaceHtml(height);
    }
}

const editableSpaceHtml = (height) => {
    return `<td><div sh-content-block="Button" sh-version="2" class="ui-draggable">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" 
                style="padding-left: 0px; padding-right: 0px; mso-padding-left-alt: 0px; mso-padding-right-alt: 0px;">
                    <tbody>
                        <tr>
                            <td height="${height}" width="100%" style="font-size: 1px; line-height: 1px;" class="non-editable">
                                <br>
                            </td>
                        </tr>
                    </tbody>
            </table>
        <div class="email-block-controls" style="display: none;">
            <div class="email-block-controls-inner">
            <a title="Drag to Reorder" class="single-control email-block-controls-move"><i class="icon-move"></i></a>
            <a title="Edit Block" class="single-control email-block-controls-edit"><i class="icon-pencil"></i></a>
            <a title="Duplicate Block" class="single-control email-block-controls-clone"><i class="icon-copy"></i></a>
            
            <a title="Delete Block" class="single-control email-block-controls-delete"><i class="icon-trash"></i></a>
        </div>
    </div><td>`;
}