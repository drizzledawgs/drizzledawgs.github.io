// get screen aspect ratio
document.addEventListener("DOMContentLoaded", function() {
    var windowHeight = window.innerHeight;
    var windowWidth = window.innerWidth;
    var aspectRatio = windowWidth / windowHeight;

    if (aspectRatio > 1.5) {
        document.body.style.backgroundSize = "40%";
        document.querySelector('.topbar > h2').style.fontSize = "400%";
        document.querySelectorAll('body > h2').forEach(element => {
            element.style.fontSize = "250%";
        });
        console.log("pc / 16:9 layout")
    } else if (aspectRatio >= 0.9 && aspectRatio <= 1.5) {
        document.body.style.backgroundSize = "50%";
        document.querySelector('.topbar > h2').style.fontSize = "350%";
        document.querySelectorAll('body > h2').forEach(element => {
            element.style.fontSize = "230%";
        });
        console.log("tablet / 4:3 layout")
    } else {

        document.body.style.backgroundSize = "80%";
        document.querySelector('.topbar > h2').style.fontSize = "300%";
        document.getElementById("footer").remove();
        document.querySelectorAll('body > h2').forEach(element => {
            element.style.fontSize = "185%";
        });
        document.querySelectorAll('body > h3').forEach(element => {
            element.style.fontSize = "185%";
        });

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

        document.querySelector('.thisIsTheDrizzleDawg > h3').style.fontSize = "185%";
        console.log("mobile layout")
    }
});
