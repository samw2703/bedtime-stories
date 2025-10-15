async function getRandomArticle(feedUrl) {
    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(feedUrl)}`);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const text = await data.contents;
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'application/xml');
    const items = xmlDoc.querySelectorAll('item');

    if (items.length > 0) {
        const randomIndex = Math.floor(Math.random() * items.length);
        const linkElement = items[randomIndex].querySelector('link');
        if (linkElement)
            return linkElement.textContent;
            
        return urls[Math.floor(Math.random() * urls.length)];
    } else
        return urls[Math.floor(Math.random() * urls.length)];
}