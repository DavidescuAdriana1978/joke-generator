const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote From API
async function getQuote() {
    loading();
    // Use the single, correct API URL
    const apiUrl = 'https://api.chucknorris.io/jokes/random';
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Chuck Norris API uses 'value' for the joke text
        const jokeContent = data.value;

        // Handle "Author" (The API doesn't provide one, so we set it)
        authorText.innerText = "Chuck Norris";

        // Check length for styling
        if (jokeContent.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }

        quoteText.innerText = jokeContent;
        complete();

    } catch (error) {
        console.error("Oops, no quote!", error);
        // it can create an infinite loop if the user is offline.
    }
}
// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();

