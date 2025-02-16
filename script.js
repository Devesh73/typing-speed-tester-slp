const sampleTexts = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing speed tests are fun and challenging.",
    "Improve your typing by practicing every day."
];

let startTime = null, endTime = null, selectedText = "";

function startTest() {
    selectedText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    document.getElementById("textToType").innerText = selectedText;
    document.getElementById("typingArea").value = "";
    document.getElementById("typingArea").disabled = false;
    document.getElementById("typingArea").focus();
    startTime = null; // Reset start time until the user starts typing
}

function restartTest() {
    document.getElementById("typingArea").value = "";
    document.getElementById("textToType").innerText = "Click 'Start' to begin the test.";
    document.getElementById("result").innerText = "";
    document.getElementById("typingArea").disabled = true;
    startTime = null;
}

document.getElementById("typingArea").addEventListener("input", function () {
    if (!startTime) {
        startTime = new Date().getTime(); // Start timer on first keystroke
    }

    if (this.value.trim() === selectedText) {
        endTime = new Date().getTime();
        let timeTaken = (endTime - startTime) / 1000; // Convert to seconds
        let words = selectedText.trim().split(/\s+/).length; // Correct word count
        let wpm = Math.round((words / timeTaken) * 60);
        
        document.getElementById("result").innerText = `You typed at ${wpm} words per minute!`;
        document.getElementById("typingArea").disabled = true; // Disable input after completion
    }
});

