chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "saveData") {
    // Send the captured data as a response
    sendResponse({
      action: "dataCaptured",
      data: {
        PageID: document.URL,
        elements: Array.from(capturedElements).map((element) => {
          return { id: element.id, value: element.value };
        }),
      },
    });
  }

  if (message.action === "sendData") {
    // Get data from message

    console.log(message.data);
    // Send the captured data as a response
    sendResponse({
      action: "Data received",
    });
  }
});
