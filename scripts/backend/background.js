chrome.contextMenus.create({
  id: "saveData",
  title: "Save Data",
  contexts: ["all"],
});

chrome.contextMenus.create({
  id: "sendData",
  title: "Send Data",
  contexts: ["all"],
});

const getSaveData = (info, tab) => {
  chrome.tabs.sendMessage(
    tab.id,
    {
      action: "saveData",
    },
    (response) => {
      console.log("saveData message sent");
      if (response.action === "dataCaptured") {
        console.log(response.data);
      }
    }
  );
};

const sendData = (info, tab) => {
  chrome.tabs.sendMessage(
    tab.id,
    {
        action: "sendData",
        data: ["Ankit Singh"]
    },
    (response) => {
      console.log("sendData message sent");
      console.log(response);
    }
  );
};

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "saveData") {
    getSaveData(info, tab);
  }
  if (info.menuItemId === "sendData") {
    sendData(info, tab);
  }
});
