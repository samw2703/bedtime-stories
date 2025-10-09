async function getRandomArticle(feedUrl) {
    debugger;
    const response = await fetch(feedUrl);
    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'text/xml');
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