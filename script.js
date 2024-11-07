// Countdown clock function
function updateClock() {
    const endDate = "30 November 2024 8:00 AM";
    const end = new Date(endDate);
    const now = new Date();

    const d = (end - now) / 1000;
    const days = Math.floor(d / 3600 / 24);
    const hours = Math.floor((d / 3600) % 24);
    const minutes = Math.floor((d / 60) % 60);
    const seconds = Math.floor(d % 60);

    const cards = document.querySelectorAll('.flip-card');
    cards[0].querySelector('.top-flip').textContent = days;
    cards[1].querySelector('.top-flip').textContent = hours;
    cards[2].querySelector('.top-flip').textContent = minutes;
    cards[3].querySelector('.top-flip').textContent = seconds;
}

setInterval(updateClock, 1000);
updateClock();

// House points function
function updateHousePoints() {
    document.getElementById('redBox').textContent = 10;
    document.getElementById('blueBox').textContent = 10;
    document.getElementById('greenBox').textContent = 10;
    document.getElementById('yellowBox').textContent = 10;
}

updateHousePoints();

// Event data fetch function
const eventSelector = document.getElementById('event-selector');
const tableBody = document.querySelector('#data-table tbody');
const errorMessage = document.getElementById('error-message');

eventSelector.addEventListener('change', () => {
    const sheetName = eventSelector.value;

    if (sheetName) {
        document.querySelector('h2').textContent = sheetName;
        fetch(`https://script.google.com/macros/s/AKfycbyTVNu7X7auS9QZ58D7joRiyXXPdsOecpR7pjncPWYFoTya1WBnA7r2mGGHx-SF-8L6/exec?sheet=${encodeURIComponent(sheetName)}`)
            .then(response => response.ok ? response.json() : Promise.reject('Network error'))
            .then(data => {
                tableBody.innerHTML = '';
                errorMessage.style.display = 'none';

                if (!data.length) {
                    errorMessage.style.display = 'block';
                    errorMessage.textContent = 'No data available for this event.';
                    return;
                }

                data.forEach(item => {
                    const row = `<tr>
                        <td>${item.position}</td>
                        <td>${item.house}</td>
                        <td>${item.name}</td>
                        <td>${item.points}</td>
                    </tr>`;
                    tableBody.insertAdjacentHTML('beforeend', row);
                });
            })
            .catch(() => {
                errorMessage.style.display = 'block';
                errorMessage.textContent = 'Error fetching data. Please try again later.';
            });
    } else {
        tableBody.innerHTML = '';
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Please select an event to view results.';
    }
});
