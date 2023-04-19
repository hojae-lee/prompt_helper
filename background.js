function msg() {
  alert("hello, world");
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: msg,
  });
});
