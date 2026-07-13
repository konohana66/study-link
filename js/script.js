// =========================
// お知らせ一覧
// =========================

async function loadNotices() {

    try {

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec?type=notices"
        );

        const notices = await response.json();

        const noticeList = document.getElementById("noticeList");

        if (!noticeList) return;

        noticeList.innerHTML = "";

        notices.reverse().forEach(notice => {

            noticeList.innerHTML += `
                <div class="notice">
                    <h3>${notice.title}</h3>
                    <p>${notice.content}</p>
                </div>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}

// =========================
// ローディング画面
// =========================

window.addEventListener("load", () => {

    loadNotices();
    loadTodaySchedule();

    const loading = document.getElementById("loading");

    if (!loading) return;

    setTimeout(() => {

        loading.style.opacity = "0";

        setTimeout(() => {

            loading.style.display = "none";

        }, 500);

    }, 1000);

});

async function loadTodaySchedule() {

    try {

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec?type=calendar"
        );

        const events = await response.json();

        const schedule = document.getElementById("todaySchedule");

        if (!schedule) return;

        schedule.innerHTML = "";

        const today = new Date().toLocaleDateString("sv-SE");

        const todayEvents = events.filter(event => {
            const eventDate = new Date(event.date).toLocaleDateString("sv-SE");
            return eventDate === today;
        });

        if (todayEvents.length === 0) {
            schedule.innerHTML = "<p>今日は予定はありません😊</p>";
            return;
        }

        todayEvents.forEach(event => {

            schedule.innerHTML += `
                <div class="notice">
                    <h3>📌 ${event.title}</h3>
                    <p>${event.content}</p>
                </div>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}