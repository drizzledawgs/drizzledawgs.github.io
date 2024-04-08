document.addEventListener("DOMContentLoaded", function() {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const aspectRatio = windowWidth / windowHeight;

    function setStyles(bgSize, h2Size, h2SizeMultiplier) {
        document.body.style.backgroundSize = bgSize;
        document.querySelector('.topbar > h2').style.fontSize = h2Size;
        document.querySelectorAll('body > h2, body > h3').forEach(element => {
            element.style.fontSize = h2SizeMultiplier;
        });
    }

    if (windowHeight > "1440") {
        if (document.title === "DRIZZLE DAWG // INDEX") {
            const warningMessages = [
                "THIS WEBSITE IS OPTIMISED FOR SCREENS SMALLER THAN 1440p"
            ];
            const body = document.body;
            warningMessages.forEach(message => {
                const newHeading = document.createElement("h3");
                newHeading.textContent = message;
                body.appendChild(document.createElement("br"));
                body.appendChild(newHeading);
            });
        }
    }

    if (aspectRatio > 1.5) {
        setStyles("40%", "400%", "250%");
        document.body.style.width = "85%";
        document.querySelector('.footer').style.width = "85%"

    } else if (aspectRatio >= 0.9 && aspectRatio <= 1.5) {
        setStyles("50%", "350%", "230%");
    } else {
        setStyles("80%", "300%", "185%");

        document.body.style.paddingBottom = "15px";

        if (document.title === "DRIZZLE DAWG // INDEX") {
            const warningMessages = [
                "THIS WEBSITE IS OPTIMISED FOR COMPUTERS. IM STILL WORKING ON THE MOBILE SITE",
                "IM WORKING ON IT BUT WEBDEV SUCKS AND SHIT TAKES TIME, YKNOW"
            ];
            const body = document.body;
            warningMessages.forEach(message => {
                const newHeading = document.createElement("h3");
                newHeading.textContent = message;
                body.appendChild(document.createElement("br"));
                body.appendChild(newHeading);
            });
        }

        // mobile specific fixes
        try {
            const elements = ['.thisIsTheDrizzleDawg > h3', '.doubleFlexBox', '.gigbox', '.newsbox'];
            elements.forEach(selector => {
                const element = document.querySelector(selector);
                if (element) {
                    if (selector === '.doubleFlexBox') {
                        element.style.justifyContent = 'space-between'; 
                        element.style.display = 'block';
                    } else if (selector === '.gigbox' || selector === '.newsbox') {
                        element.style.width = "85%";
                        element.style.paddingBottom = "30px";
                    }
                } else {
                    console.error(`Element ${selector} not found.`);
                }
            });
        } catch (error) {
            console.error("Error while styling elements: ", error);
        }
    }
});

function fetchUpdates(jsonUrl, tableId) {
    fetch(jsonUrl)
    .then(response => response.json())
    .then(data => {
        const table = document.getElementById(tableId);
        const tableBody = table.querySelector('tbody');

        data.forEach(newsItem => {
            const row = tableBody.insertRow();
            const dateCell = row.insertCell(0);
            const detailsCell = row.insertCell(1);
            dateCell.textContent = newsItem.date;
            detailsCell.innerHTML = `${newsItem.details.replace(/\n/g, '<br>')}`;
            detailsCell.style.textAlign = "right";
        });
    })
    .catch(error => {
        console.error(`Error fetching ${jsonUrl} data: `, error);
    });
}

fetchUpdates('news.json', 'newsTable');
fetchUpdates('gigs.json', 'gigTable');
