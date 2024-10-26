// Array to store quote objects with text and category properties
let quotes = [
    { text: "The journey of a thousand miles begins with one step.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Motivation" }
];

// Step 1: Integrate Web Storage
// Load quotes from local storage if available
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }
}

// Save the current quotes array to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Call loadQuotes when the page loads
loadQuotes();

// Step 2: JSON Data Import and Export
// Export quotes to a JSON file
function exportToJsonFile() {
    const data = JSON.stringify(quotes, null, 2); // Pretty-print with 2 spaces
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url); // Clean up
}

// Import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            if (Array.isArray(importedQuotes) && importedQuotes.every(q => q.text && q.category)) {
                quotes.push(...importedQuotes);
                saveQuotes(); // Save to local storage
                alert('Quotes imported successfully!');
            } else {
                alert('Invalid JSON format');
            }
        } catch (e) {
            alert('Error parsing JSON file');
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

// Show a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');

    // Display the selected quote
    quoteDisplay.innerHTML = `<p><strong>${selectedQuote.category}:</strong> ${selectedQuote.text}</p>`;
    
    // Optional: Save this quote in session storage
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(selectedQuote));
}

// Load the last viewed quote on page load
function loadLastViewedQuote() {
    const lastViewed = sessionStorage.getItem('lastViewedQuote');
    if (lastViewed) {
        const quote = JSON.parse(lastViewed);
        const quoteDisplay = document.getElementById('quoteDisplay');
        quoteDisplay.innerHTML = `<p><strong>${quote.category}:</strong> ${quote.text}</p>`;
    }
}

// Add event listeners
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById('importFile').addEventListener('change', importFromJsonFile);

// Call loadLastViewedQuote when the page loads
loadLastViewedQuote();
