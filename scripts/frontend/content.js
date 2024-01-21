chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);
  const capturedElements = document.querySelectorAll('input[type="text"]');

  if (message.action === "saveData") {
    const num = Math.floor(Math.random() * 10);
    const randomNameGenerator = (num) => {
      let res = "";
      for (let i = 0; i < num; i++) {
        const random = Math.floor(Math.random() * 27);
        res += String.fromCharCode(97 + random);
      }
      return res;
    };

    capturedElements[0].value = randomNameGenerator(num);

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

    console.log(message.data.data[0].elements);
    // Send the captured data as a response
    sendResponse({
      action: "Data received",
    });
  }
});
