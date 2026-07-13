async function loadCalendar() {

    const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec?type=calendar"
    );

    const events = await response.json();

    const calendarList = document.getElementById("calendarList");

    calendarList.innerHTML = "";

    if (events.length === 0) {
        calendarList.innerHTML = "<p>予定はありません。</p>";
        return;
    }

    events.forEach(event => {

        calendarList.innerHTML += `
            <div class="notice">
                <h3>📅 ${event.title}</h3>
                <small>${new Date(event.date).toLocaleDateString("ja-JP")}
                <p>${event.content}</p>
            </div>
        `;

    });

}

loadCalendar();