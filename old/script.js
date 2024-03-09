// normally id avoid using javascript but its kinda needed here given i cant write decent websites

// change css file used based on device
function isMobileDevice() {
    return /iPhone|Android/i.test(navigator.userAgent);
}
if (isMobileDevice()) {
    document.getElementById('cssFile').href = 'mobile.css';
}

// chatgpt json loading code bc i dont really know js
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