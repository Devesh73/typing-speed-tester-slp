const sampleTexts = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing speed tests are fun and challenging.",
    "Improve your typing by practicing every day."
];

let startTime, endTime, selectedText;

function startTest() {
    selectedText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    document.getElementById("textToType").innerText = selectedText;
    document.getElementById("typingArea").value = "";
    document.getElementById("typingArea").disabled = false;
    document.getElementById("typingArea").focus();
    startTime = performance.now(); // More precise timing
    // Reset the text highlighting to clear any previous state
    document.getElementById("textToType").innerHTML = selectedText;
}

function restartTest() {
    document.getElementById("typingArea").value = "";
    document.getElementById("textToType").innerText = "Click 'Start' to begin the test.";
    document.getElementById("result").innerText = "";
    document.getElementById("typingArea").disabled = true;
}

document.getElementById("typingArea").addEventListener("input", function () {

    let typedText = this.value.trim(); // Fixed: To match selectedText correctly
    let targetText = selectedText.trim(); // Fixed: For accuracy

    // Real-time feedback on typing errors
    let highlightedText = "";
    for (let i = 0; i < targetText.length; i++) {
        if (typedText[i] === targetText[i]) {
            highlightedText += `<span class="correct">${targetText[i]}</span>`;
        } else {
            highlightedText += `<span class="incorrect">${targetText[i]}</span>`;
        }
    }

    // Update the text display with real-time highlights
    document.getElementById("textToType").innerHTML = highlightedText;

    // Check if the user has completed typing the text
    if (typedText === targetText) {
        endTime = new Date().getTime();
        let timeTaken = (endTime - startTime) / 1000 / 60; // Converts milliseconds to minutes

        let words = targetText.split(/\s+/).length; // Word count for WPM
        let wpm = Math.round(words / timeTaken);

        if (timeTaken < 0.1) { // If time taken to type is too low
            document.getElementById("result").innerText = `Too fast! Try again.`;
        } else {
            document.getElementById("result").innerText = `You typed at ${wpm} words per minute!`;
        }

        document.getElementById("typingArea").disabled = true; // Disable typing after completion
    }
});
