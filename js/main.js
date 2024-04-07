// get screen aspect ratio
// and also do a few other things
document.addEventListener("DOMContentLoaded", function() {
    var windowHeight = window.innerHeight;
    var windowWidth = window.innerWidth;
    var aspectRatio = windowWidth / windowHeight;

    if (aspectRatio > 1.5) {
        document.body.style.backgroundSize = "40%";
        
        document.querySelector('.topbar > h2').style.fontSize = "400%";
        document.querySelector('.gigbox').style.width = "40%";
        document.querySelectorAll('body > h2').forEach(element => {
            element.style.fontSize = "250%";
        });
        console.log("pc / 16:9 layout")
    } else if (aspectRatio >= 0.9 && aspectRatio <= 1.5) {
        document.body.style.backgroundSize = "50%";
        document.querySelector('.topbar > h2').style.fontSize = "350%";
        document.querySelector('.gigbox').style.width = "50%";
        document.querySelectorAll('body > h2').forEach(element => {
            element.style.fontSize = "230%";
        });
        console.log("tablet / 4:3 layout")
    } else {

        document.body.style.backgroundSize = "80%";
        document.querySelector('.topbar > h2').style.fontSize = "300%";
        document.querySelectorAll('body > h2').forEach(element => {
            element.style.fontSize = "185%";
        });
        document.querySelectorAll('body > h3').forEach(element => {
            element.style.fontSize = "185%";
        });

        var doubleFlexBox = document.querySelector('.doubleFlexBox');
        doubleFlexBox.style.justifyContent = 'space-between';
        doubleFlexBox.style.padding = '20px';

        window.addEventListener('DOMContentLoaded', () => {
            if (document.title === "DRIZZLE DAWG // INDEX") {
                document.body.appendChild(document.createElement("br"));
                document.body.appendChild(document.createElement("br")); 
                var newHeading = document.createElement("h3");
                newHeading.textContent = "THIS WEBSITE IS OPTIMISED FOR COMPUTERS. THERE WILL BE ISSUES WITH THE SITE ON YOUR PHONE BECAUSE OPTIMISING FOR MOBILE IS HELL";
                document.body.appendChild(newHeading);
                document.body.appendChild(document.createElement("br"));
                document.body.appendChild(document.createElement("br"));
                var newHeading = document.createElement("h3");
                newHeading.textContent = "IM WORKING ON IT BUT SHIT TAKES TIME, YKNOW";
                document.body.appendChild(newHeading);
            };
        });

        try {
            const element = document.querySelector('.thisIsTheDrizzleDawg > h3');
            if (element) {
                element.style.fontSize = "185%";
            } else {
                console.error("Element not found.");
            }
        } catch (error) {
            console.error("Element not found.");
        }

        try {
            const element = document.querySelector('.doubleFlexBox');
            if (element) {
                document.querySelector('.doubleFlexBox').style.display = 'block';
            } else {
                console.error("Element not found.");
            }
        } catch (error) {
            console.error("Element not found.");
        }

        try {
            const element = document.querySelector('.gigbox');
            if (element) {
                document.querySelector('.gigbox').style.width = "80%";
            } else {
                console.error("Element not found.");
            }
        } catch (error) {
            console.error("Element not found.");
        }

        try {
            const element = document.querySelector('.newsbox');
            if (element) {
                document.querySelector('.newsbox').style.width = "80%";
            } else {
                console.error("Element not found.");
            }
        } catch (error) {
            console.error("Element not found.");
        }


        console.log("mobile layout")
    }
});

// chatgpt json loading code bc i dont really know json
fetch('news.json')
.then(response => response.json())
.then(data => {
    const newsTable = document.getElementById('newsTable');
    const newsTableBody = newsTable.querySelector('tbody');

    data.forEach((newsItem, index) => {
        const row = newsTableBody.insertRow();
        const dateCell = row.insertCell(0);
        const detailsCell = row.insertCell(1);
        dateCell.textContent = newsItem.date;
        detailsCell.innerHTML = `${newsItem.details.replace(/\n/g, '<br>')}`;
        
        detailsCell.style.textAlign = "right";
        detailsCell.style.textAlign = "right";

    });
})
.catch(error => {
    console.error('Error fetching news data: ', error);
});

// chatgpt json loading code bc i dont really know json
fetch('gigs.json')
.then(response => response.json())
.then(data => {
    const newsTable = document.getElementById('gigTable');
    const newsTableBody = newsTable.querySelector('tbody');

    data.forEach((newsItem, index) => {
        const row = newsTableBody.insertRow();
        const dateCell = row.insertCell(0);
        const detailsCell = row.insertCell(1);
        dateCell.textContent = newsItem.date;
        detailsCell.innerHTML = `${newsItem.details.replace(/\n/g, '<br>')}`;
        
        detailsCell.style.textAlign = "right";
        detailsCell.style.textAlign = "right";

    });
})
.catch(error => {
    console.error('Error fetching news data: ', error);
});
