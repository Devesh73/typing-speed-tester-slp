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
}

function restartTest() {
    document.getElementById("typingArea").value = "";
    document.getElementById("textToType").innerText = "Click 'Start' to begin the test.";
    document.getElementById("result").innerText = "";
    document.getElementById("typingArea").disabled = true;
    startTime = null;  // Reset the start time
    endTime = null;  // Reset the end time
    selectedText = null;  // Reset the selected text
}

document.getElementById("typingArea").addEventListener("input", function () {
    let typedText = this.value;
    let targetText = selectedText;

    // Create a string where each character is checked and color-coded
    let feedbackText = '';
    
    // Compare each character and color the feedback
    for (let i = 0; i < typedText.length; i++) {
        let typedChar = typedText[i];
        let targetChar = targetText[i];

        // If the character is correct, color it green; if not, color it red
        if (typedChar === targetChar) {
            feedbackText += `<span style="color: green">${typedChar}</span>`;
        } else {
            feedbackText += `<span style="color: red">${typedChar}</span>`;
        }
    }

    // If there are any remaining characters in the target text (after typing less than the full text), color them grey
    if (typedText.length < targetText.length) {
        feedbackText += targetText.slice(typedText.length).split('').map(char => `<span style="color: grey">${char}</span>`).join('');
    }

    // Update the feedback display
    document.getElementById("textToType").innerHTML = feedbackText;

    // Check if the user has typed everything correctly
    if (typedText === targetText) {
        endTime = new Date().getTime();
        let timeTaken = (endTime - startTime) / 1000 / 60; // Convert milliseconds to minutes

        let words = targetText.split(/\s+/).length; // Word count
        let wpm = Math.round(words / timeTaken);

        if (timeTaken < 0.1) {
            document.getElementById("result").innerText = "Too fast! Try again.";
        } else {
            document.getElementById("result").innerText = `You typed at ${wpm} words per minute!`;
        }

        document.getElementById("typingArea").disabled = true; // Disable the text area after completion
    }
});
