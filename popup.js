let job = "Marketer";

document.addEventListener("DOMContentLoaded", () => {
  function inputValue(main, sub) {
    const textarea = document.querySelector("textarea");
    textarea.value = main + sub;
    const submit = textarea.nextElementSibling;
    submit.click();
  }

  document.querySelector("#jobSelect").addEventListener("change", (e) => {
    job = e.target.value;
  });

  document.querySelector("#applyBtn").addEventListener("click", async () => {
    const inputStr = document.querySelector("#interest").value;
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    // Execute script in the current tab
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: inputValue,
      args: [job, inputStr],
    });
  });
});
