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
            element.style.fontSize = "100%";
        });
        document.querySelectorAll('body > h3').forEach(element => {
            element.style.fontSize = "145%";
        });
        document.querySelector('.thisIsTheDrizzleDawg > h3').style.fontSize = "145%";
        console.log("mobile layout")
    }
});
