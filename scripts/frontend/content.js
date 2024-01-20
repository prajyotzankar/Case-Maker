chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);
  const capturedElements = document.querySelectorAll('input[type="text"]');

  if (message.action === "saveData") {
    // Send the captured data as a response
    sendResponse({
      action: "dataCaptured",
      data: Array.from(capturedElements).map((element) => {
        return element.value;
      }),
    });
  }

  if (message.action === "sendData") {
    // Get data from message
    const name = message.data[0];
    capturedElements[0].value = name;

    // Send the captured data as a response
    sendResponse({
      action: "Data received",
    });
  }
});
