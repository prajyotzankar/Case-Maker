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
        chrome.storage.local.set({
          amitdata: [response.data],
        });
      }
    }
  );
};

const sendData = (info, tab) => {
  chrome.storage.local.get(["amitdata"], (result) => {
    chrome.tabs.sendMessage(
      tab.id,
      {
        action: "sendData",
        data: result,
      },
      (response) => {
        console.log("sendData message sent");
        console.log(response);
      }
    );
  });
};

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "saveData") {
    getSaveData(info, tab);
  }
  if (info.menuItemId === "sendData") {
    sendData(info, tab);
  }
});

// connection to panel
const connections = {};

chrome.runtime.onConnect.addListener((port) => {
  const extensionListener = (message, sender, sendResponse) => {
    // The original connection event doesn't include the tab ID of the
    // DevTools page, so we need to send it explicitly.
    if (message.action === "init") {
      connections[message.tabId] = port;
      console.log(message.tabId);
      return;
    }
    if (message.action === "autofillFromPanel") {
      console.log("Auto Fill Data from panel");
      port.postMessage({
        action: "autofillFromPanel",
        data: "Auto Fill Data from panel",
      });
    }

    if (message.action === "printPanel") {
      console.log("Print Panel");
    }
    if (message.action === "onShownPanel") {
      console.log("Print Panel", message.data);
    }
  };

  // Listen to messages sent from the DevTools page
  port.onMessage.addListener(extensionListener);

  port.onDisconnect.addListener(function (port) {
    port.onMessage.removeListener(extensionListener);

    var tabs = Object.keys(connections);
    for (var i = 0, len = tabs.length; i < len; i++) {
      if (connections[tabs[i]] == port) {
        delete connections[tabs[i]];
        break;
      }
    }
  });
});

// Receive message from content script and relay to the devTools page for the
// current tab
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // Messages from content scripts should have sender.tab set
  if (sender.tab) {
    var tabId = sender.tab.id;
    if (tabId in connections) {
      connections[tabId].postMessage(request);
    } else {
      console.log("Tab not found in connection list.");
    }
  } else {
    console.log("sender.tab not defined.");
  }
  return true;
});
