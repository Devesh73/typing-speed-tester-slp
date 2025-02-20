document.getElementById("typingArea").addEventListener("input", function () {
    let typedText = this.value;
    let targetText = selectedText;

    // Create a string where each character is checked and color-coded
    let feedbackText = '';

    // Compare each character
    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === targetText[i]) {
            feedbackText += `<span style="color: green">${typedText[i]}</span>`;
        } else {
            feedbackText += `<span style="color: red">${typedText[i]}</span>`;
        }
    }

    // Append the rest of the target text if the user typed fewer characters
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
            document.getElementById("result").innerText = `Too fast! Try again.`;
        } else {
            document.getElementById("result").innerText = `You typed at ${wpm} words per minute!`;
        }

        document.getElementById("typingArea").disabled = true; // Disable the text area after completion
    }
});
