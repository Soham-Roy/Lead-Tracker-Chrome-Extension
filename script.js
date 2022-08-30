const inputText = document.querySelector("#input_text");
const saveInputBtn = document.querySelector("#save_input_btn");
const list = document.getElementById("ul_el");
const saveTabBtn = document.querySelector("#save_tab_btn");
const deleteAllBtn = document.querySelector("#delete_all");

let leads = [];
renderList();

saveInputBtn.addEventListener("click", function() {
    let text = inputText.value;
    if ( text === null ) {
        return;
    }
    add(text);
    inputText.value = "";
    renderList();
});

saveTabBtn.addEventListener("click", function() {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        add(tabs[0].url);
        renderList();
    });
});

deleteAllBtn.addEventListener("click", function() {
    localStorage.removeItem("myleads");
    renderList();
});

function add(text) {
    leads.push(text);
    localStorage.setItem("myleads", leads);
}

function renderList() {
    loadLeads();
    let listItems = "";
    for ( let i = 0; i < leads.length; ++i ) {
        listItems += `
            <li>
                <a target='_blank' href = "${leads[i]}">${leads[i]}</a>
            </li>
        `;
    }
    list.innerHTML = listItems;
}

function loadLeads() {
    leads = JSON.parse(localStorage.getItem("myleads"));
    if ( leads === null ) {
        leads = [];
    }
}