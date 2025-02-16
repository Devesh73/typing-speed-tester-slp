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
    startTime = new Date().getTime();
}

function restartTest() {
    document.getElementById("typingArea").value = "";
    document.getElementById("textToType").innerText = "Click 'Start' to begin the test.";
    document.getElementById("result").innerText = "";
    document.getElementById("typingArea").disabled = true;
}

document.getElementById("typingArea").addEventListener("input", function () {
    let userInput = this.value;
    
    // Check if the user has typed the entire text correctly
    if (userInput === selectedText) {
        endTime = new Date().getTime();
        let timeTaken = (endTime - startTime) / 1000; // Time in seconds
        let words = selectedText.split(" ").length;
        
        // WPM Calculation: Account for the time taken to type correctly
        let wpm = Math.round((words / timeTaken) * 60);
        
        // Disable the textarea to prevent further input after completion
        document.getElementById("typingArea").disabled = true;
        
        // Display WPM result
        document.getElementById("result").innerText = `You typed at ${wpm} words per minute!`;
    } else {
        // Optionally, calculate accuracy or other feedback if you want to track mistakes
        let correctChars = 0;
        for (let i = 0; i < userInput.length; i++) {
            if (userInput[i] === selectedText[i]) {
                correctChars++;
            }
        }
        // You can use correctChars to display an accuracy percentage if desired
    }
});
