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







let currentMemberIndex = 5;
let membersData = null;

function handleError() {
    console.log("error detected, noopy time :3");
        document.getElementById('memberImg1').src = "img/Noopy.webp";
        document.getElementById('memberImg2').src = "img/Noopy.webp";
        document.getElementById('memberImg3').src = "img/Noopy.webp";
        document.getElementById('memberImg4').src = "img/Noopy.webp";
        document.getElementById('memberName').innerText = "ERROR";
        document.getElementById('memberDescription').innerText = `this is an error handler for when members.json failed to load / parse. if you are, try refreshing the page.`;
}


async function fetchMembers() {
    try {
        if (!membersData) {
            const response = await fetch('members.json');
            membersData = await response.json();
        }
        return membersData;
    }
    catch (error) {
        handleError()
        }
}

async function changeMember() {
    try {
        const members = await fetchMembers();
        currentMemberIndex = (currentMemberIndex + 1) % members.length;

        const currentMember = members[currentMemberIndex];
        if (!currentMember.img1 || !currentMember.img2 || !currentMember.img3 || !currentMember.img4) {
            document.getElementById('memberImg1').src = currentMember.img1src;
            document.getElementById('memberImg2').src = currentMember.img2src;
            document.getElementById('memberImg3').src = currentMember.img3src;
            document.getElementById('memberImg4').src = currentMember.img4src;
        }

        document.getElementById('memberName').innerText = currentMember.name;
        document.getElementById('memberInstrument').innerText = `INSTRUMENT: ${currentMember.instrument}`;
        document.getElementById('memberGear').innerText = `EQUIPMENT: ${currentMember.gear}`;
        document.getElementById('memberDescription').innerText = `DESCRIPTION: ${currentMember.description}`;
    }
    catch (error) {
        handleError()
    }
}

// Load the first member when the page loads
if (document.title === "DRIZZLE DAWG // MEMBER PROFILES") {
    changeMember();
}

let touchstartX = 0;
let touchendX = 0;

// Function to trigger swipe direction check
function checkDirection() {
  const threshold = 50; 
  if (touchendX < touchstartX - threshold) {
    changeMember();
  }
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.memberBoxMobile').addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX;
    });
});

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.memberBoxMobile').addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    checkDirection();
    });
});