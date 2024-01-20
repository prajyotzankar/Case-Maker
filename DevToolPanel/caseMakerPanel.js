chrome.devtools.panels.create(
  "Case Maker Panel",
  "assets/logo.png",
  "DevToolPanel/caseMakerPanel.html",
  (panel) => {
    console.log("Panel created", panel);
  }
);

const autoFillData = () => {
  const nameElement = document.querySelectorAll('input[type="text"]')[0];
  nameElement.value = "Ankit Singh";
  chrome.devtools.inspectedWindow.eval("document.body.innerHTML");
  console.log("Auto Fill Data");
};
