document.addEventListener("DOMContentLoaded", function() { /* i should have just used css calls for this oh my god */
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

    function removeElement(selector) {
        try {
            const element = document.querySelector(selector);
            element.parentNode.removeChild(element);
        } catch (error) {
            console.error("Error while removing: ", error);
        }
    }

    if (aspectRatio > 1.5) {
        if (windowHeight > 1440) {
            setStyles("40%", "450%", "450%");
        } else {
            document.body.style.width = "85%";
            document.querySelector('.footer').style.width = "85%";
            removeElement(".memberBoxMobile");
        }
    } else if (aspectRatio >= 0.9 && aspectRatio <= 1.5) {
        setStyles("50%", "350%", "230%");
        removeElement(".memberBoxMobile");
        document.querySelector('.memberPhotoBannerThing').style.width = '75%';
    } else {
        setStyles("80%", "300%", "185%");
        document.body.style.paddingBottom = "15px";


        if (document.title === "DRIZZLE DAWG // MEMBER PROFILES") {
            const warningMessages = [
                "FOR MOBILE USERS: SWIPE LEFT ON THE BOX, OR PRESS THE ARROW BUTTON AT THE BOTTOM TO CHANGE THE PROFILE SELECTED"
            ];
            const warningHTML = warningMessages.map(message => `<p>${message}</p>`).join('');
            document.querySelector('.memberBox').insertAdjacentHTML('beforebegin', warningHTML);
        }

        // mobile specific fixes
        const elements = ['.doubleFlexBox', '.gigbox', '.newsbox', '.memberImagesMobile > img'];
        elements.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                if (selector === '.doubleFlexBox') {
                    element.style.justifyContent = 'space-between'; 
                    element.style.display = 'block';
                } else if (selector === '.gigbox' || selector === '.newsbox') {
                    element.style.width = "85%";
                    element.style.paddingBottom = "30px";
                } else if (selector === '.memberImagesMobile > img') {
                    const elements = document.querySelectorAll('.memberImagesMobile > img');
                    elements.forEach(element => {
                        element.style.width = "40vw";
                    });
                    const container = document.querySelector('.memberImagesMobile');
                    container.style.marginLeft = "auto";
                    container.style.marginRight = "auto";
                    container.style.textAlign = "center";
                }
            } else {
                console.error(`Element ${selector} not found.`);
            }
        });
        removeElement(".memberBox");
        document.querySelector('.memberPhotoBannerThing').style.width = '95%'; // im lazy and dont wanna wrap this in a try
    }
});








// get update info
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
            const table = document.getElementById(tableId);
            const tableBody = table.querySelector('tbody');
            const row = tableBody.insertRow();
            const dateCell = row.insertCell(0);
            dateCell.textContent = "ERROR";
    });
}

if (document.title === "DRIZZLE DAWG // HOME") {
    fetchUpdates('gigs.json', 'gigTable');
} else if (document.title === "DRIZZLE DAWG // NEWS") {
    fetchUpdates('news.json', 'newsTable');
    fetchUpdates('gigs.json', 'gigTable');
}