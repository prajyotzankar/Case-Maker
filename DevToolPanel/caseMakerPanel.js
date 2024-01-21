// Create a connection to the service worker
const backgroundPageConnection = chrome.runtime.connect({
  name: "panel",
});

backgroundPageConnection.postMessage({
  action: "init",
  tabId: chrome.devtools.inspectedWindow.tabId,
});

chrome.devtools.panels.create(
  "Case Maker Panel",
  "assets/logo.png",
  "DevToolPanel/caseMakerPanel.html",
  (panel) => {
    console.log("Panel created", panel);
    backgroundPageConnection.postMessage({
      action: "printPanel",
      data: panel,
    });
  }
);

document
  .getElementById("autoFillButton")
  .addEventListener("click", autoFillData);
const autoFillData = () => {
  console.log("Auto Fill Data");
  alert("Auto Fill Data");
  backgroundPageConnection.postMessage(
    {
      action: "autofillFromPanel",
      data: ["Ankit Singh"],
    },
    (response) => {
      console.log(response);
    }
  );
};

const saveData = () => {
  console.log("Save Data");
  alert("Save Data");
};
