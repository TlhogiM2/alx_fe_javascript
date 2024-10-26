// Array to store quote objects with text and category properties
let quotes = [
    { text: "The journey of a thousand miles begins with one step.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Motivation" }
];

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');

    // Clear the existing content and add the new quote
    quoteDisplay.innerHTML = `
        <p><strong>${selectedQuote.category}:</strong> ${selectedQuote.text}</p>
    `;
}

// Event listener for the 'Show New Quote' button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Function to add a new quote
function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value.trim();
    const quoteCategory = document.getElementById('newQuoteCategory').value.trim();

    if (quoteText && quoteCategory) {
        // Add new quote to the array
        quotes.push({ text: quoteText, category: quoteCategory });

        // Display the new quote immediately (optional)
        showRandomQuote();

        // Clear input fields
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
    } else {
        alert("Please enter both quote text and category.");
    }
}
