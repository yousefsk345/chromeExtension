let myLeads = [];

const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("save-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  renderLeads(myLeads);
}

function renderLeads(leads) {
  let listItems = "";
  ulEl.textContent = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `<li>
        <a href="${leads[i]}" target="_blank">${leads[i]}</a>
    </li>`;
  }
  ulEl.innerHTML = listItems;
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads(myLeads);
  });
});
inputBtn.addEventListener("click", function () {
  if (inputEl.value) {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads(myLeads);
  }
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  renderLeads(myLeads);
});
