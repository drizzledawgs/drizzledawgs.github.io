// this is like half of the main.js so i think its best to have it seperate

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