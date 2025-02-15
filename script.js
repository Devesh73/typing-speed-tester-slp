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
    document.getElementById("result").innerText = "";
    startTime = null; // Reset start time to ensure accurate measurement
}

function restartTest() {
    document.getElementById("typingArea").value = "";
    document.getElementById("textToType").innerText = "Click 'Start' to begin the test.";
    document.getElementById("result").innerText = "";
    document.getElementById("typingArea").disabled = true;
}

document.getElementById("typingArea").addEventListener("input", function () {
    if (!startTime) {
        startTime = new Date().getTime(); // Start time when the user starts typing
    }

    if (this.value === selectedText) {
        endTime = new Date().getTime();
        let timeTaken = (endTime - startTime) / 1000;
        let words = selectedText.split(" ").length;
        let wpm = Math.round((words / timeTaken) * 60);

        document.getElementById("result").innerText = `You typed at ${wpm} words per minute!`;
        document.getElementById("typingArea").disabled = true; // Disable typing area
    }
});
