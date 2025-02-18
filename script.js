const sampleTexts = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing speed tests are fun and challenging.",
  "Improve your typing by practicing every day."
];

let startTime, selectedText;

function startTest() {
  selectedText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
  document.getElementById("textToType").innerText = selectedText;
  document.getElementById("typingArea").value = "";
  document.getElementById("result").innerText = "";
  document.getElementById("typingArea").disabled = false;
  document.getElementById("typingArea").focus();
  startTime = performance.now(); // Set start time
}

function restartTest() {
  // Resetting all parameters
  selectedText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)]; 
  document.getElementById("textToType").innerText = selectedText;
  document.getElementById("typingArea").value = "";
  document.getElementById("result").innerText = "";
  document.getElementById("typingArea").disabled = false; // Allow typing immediately
  document.getElementById("typingArea").focus();
  startTime = performance.now(); // Reset start time for the new test
}

document.getElementById("typingArea").addEventListener("input", function () {
  let typedText = this.value.trim();
  let targetText = selectedText.trim();

  // Check if the entire text has been typed
  if (typedText.length === targetText.length && typedText === targetText) {
    let endTime = performance.now();
    let timeTaken = (endTime - startTime) / 1000 / 60; // Convert milliseconds to minutes

    let words = targetText.split(/\s+/).length; // Word count
    let wpm = Math.round(words / timeTaken);

    if (timeTaken < 0.1) {
      document.getElementById("result").innerText = `Too fast! Try again.`;
    } else {
      document.getElementById("result").innerText = `You typed at ${wpm} words per minute!`;
    }

    document.getElementById("typingArea").disabled = true; // Disable the text area after completion
  }
});
