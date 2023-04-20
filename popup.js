const W = window;
W.JOB = "Marketer";

document.addEventListener("DOMContentLoaded", () => {
  function inputValue(main, sub) {
    const marketerData = `마케팅 : 설문조사
      Act as a survey creator. you need to create survey questions about the topic of the bottom.
      You need to create 7 questions that people will be interested in answering. Also, create a choice. Create a mix of multiple-choice questions with 5 or so options to choose from, and open-ended questions for short answers. Some multiple choice questions should have three options, some should have four, and the essay answers should have a short explanation.

      The topic is`;
    const develpData = `개발 : 소프트웨어 디자인
      Software design prompt
      You are tasked with designing a new software application. Please provide a brief description of the application's purpose and functionality, and ask the AI language model to provide suggestions for the software architecture, design patterns, and technologies to use.

      The application topic is`;
    const designData = `디자인 : 지속 가능한 제품 디자인
      You are a product designer tasked with creating a sustainable product. I'll put the product category at the very bottom. Design a product that is environmentally friendly, socially responsible, and economically viable. Your design should include the following:

      - Detailed specifications of the product, including materials, manufacturing process, and end-of-life disposal.
      - An analysis of the environmental impact of the product, including its carbon footprint and other ecological impacts.
      - A marketing strategy that emphasizes the product's sustainability features and benefits to consumers.

      The product category is`;
    let result = "";
    switch (main) {
      case "Marketer":
        result = marketerData;
        break;
      case "Designer":
        result = designData;
        break;
      default:
        result = develpData;
    }

    const textarea = document.querySelector("textarea");
    textarea.value = result + " " + sub;

    // ui 강제로 붙여보기
    const exDiv = document.createElement("div");
    exDiv.textContent = "간단하게!";
    document.querySelector("textarea").parentElement.appendChild(exDiv);
    document.querySelector(".text-gray-800.w-full").firstChild.textContent =
      "우리가 지배했다.";
  }

  document.querySelector("#jobSelect").addEventListener("change", (e) => {
    W.JOB = e.target.value;
  });

  document.querySelector("#applyBtn").addEventListener("click", async () => {
    const inputStr = document.querySelector("#interest").value;
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    // Execute script in the current tab
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: inputValue,
      args: [W.JOB, inputStr],
    });
  });
});
