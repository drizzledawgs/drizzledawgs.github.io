// normally id avoid using javascript but its kinda needed here given i cant write decentt css
function isMobileDevice() {
    return window.innerWidth <= 768
    // return /iPhone|Android/i.test(navigator.userAgent);
}
if (isMobileDevice()) {
    document.getElementById('cssFile').href = 'mobile.css';
}
