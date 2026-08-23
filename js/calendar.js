const GAS_URL =
    "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec";

let events = [];
let currentDate = new Date();


// ==========================
// カレンダー読み込み
// ==========================

async function loadCalendar() {

    const calendarList =
        document.getElementById("calendarList");

    calendarList.innerHTML =
        "<p>読み込み中...</p>";

    try {

        const response = await fetch(
            GAS_URL + "?type=calendar"
        );

        events = await response.json();

        renderCalendar();

    } catch (error) {

        console.error(error);

        calendarList.innerHTML =
            "<p>予定の読み込みに失敗しました。</p>";

    }

}


// ==========================
// カレンダー表示
// ==========================

function renderCalendar() {

    const calendarList =
        document.getElementById("calendarList");

    const year =
        currentDate.getFullYear();

    const month =
        currentDate.getMonth();


    // 月初

    const firstDay =
        new Date(year, month, 1);


    // 月末

    const lastDay =
        new Date(year, month + 1, 0);


    const startDay =
        firstDay.getDay();

    const daysInMonth =
        lastDay.getDate();


    // ==========================
    // カレンダー本体
    // ==========================

    let html = `

        <div class="calendar-header">

            <button
                class="calendar-nav"
                onclick="changeMonth(-1)">
                ◀
            </button>

            <h2>
                ${year}年 ${month + 1}月
            </h2>

            <button
                class="calendar-nav"
                onclick="changeMonth(1)">
                ▶
            </button>

        </div>


        <div class="calendar-week">

            <div>日</div>
            <div>月</div>
            <div>火</div>
            <div>水</div>
            <div>木</div>
            <div>金</div>
            <div>土</div>

        </div>


        <div class="calendar-grid">
    `;


    // ==========================
    // 前月の空白
    // ==========================

    for (let i = 0; i < startDay; i++) {

        html += `
            <div class="calendar-day empty"></div>
        `;

    }


    // ==========================
    // 日付
    // ==========================

    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const dateString =
            `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;


        const today =
            new Date();


        const isToday =
            today.getFullYear() === year &&
            today.getMonth() === month &&
            today.getDate() === day;


        // ==========================
        // この日の予定を取得
        // ==========================

        const dayEvents =
            events.filter(event => {

                const start =
                    getEventDate(
                        event.startDate || event.date
                    );

                const end =
                    getEventDate(
                        event.endDate ||
                        event.startDate ||
                        event.date
                    );


                // 期間内なら表示

                return (
                    start &&
                    end &&
                    dateString >= start &&
                    dateString <= end
                );

            });


        html += `
    <div
        class="calendar-day ${isToday ? "today" : ""}"
        onclick="showDayDetails('${dateString}')">

                <div class="calendar-date">
                    ${day}
                </div>

                <div class="calendar-events">
        `;


        // ==========================
        // 予定表示
        // ==========================

        dayEvents.forEach(event => {

            html += `

                <div
                    class="calendar-event"
                    title="${escapeHtml(event.content || "")}">

                    📅 ${escapeHtml(event.title)}

                </div>

            `;

        });


        html += `

                </div>

            </div>

        `;

    }


    html += `

        </div>

    `;


    // ==========================
    // 予定がない場合
    // ==========================

    if (events.length === 0) {

        html += `
            <p class="calendar-no-event">
                📅 登録されている予定はありません。
            </p>
        `;

    }


    calendarList.innerHTML = html;

}


// ==========================
// 月を変更
// ==========================

function changeMonth(amount) {

    currentDate.setMonth(
        currentDate.getMonth() + amount
    );

    renderCalendar();

}


// ==========================
// 日付を YYYY-MM-DD にする
// ==========================

function getEventDate(dateValue) {

    if (!dateValue) {
        return "";
    }


    // YYYY-MM-DD形式なら
    // そのまま使う

    if (
        typeof dateValue === "string" &&
        /^\d{4}-\d{2}-\d{2}$/.test(dateValue)
    ) {

        return dateValue;

    }


    const date =
        new Date(dateValue);


    if (isNaN(date.getTime())) {
        return "";
    }


    return `${date.getFullYear()}-${String(
        date.getMonth() + 1
    ).padStart(2, "0")}-${String(
        date.getDate()
    ).padStart(2, "0")}`;

}


// ==========================
// HTMLエスケープ
// ==========================

function escapeHtml(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text || "";

    return div.innerHTML;

}

// ==========================
// 日付の詳細表示
// ==========================

function showDayDetails(dateString) {

    const dayEvents = events.filter(event => {

        const start =
            getEventDate(
                event.startDate || event.date
            );

        const end =
            getEventDate(
                event.endDate ||
                event.startDate ||
                event.date
            );

        return (
            start &&
            end &&
            dateString >= start &&
            dateString <= end
        );

    });


    let detailHtml = `
        <div class="calendar-detail">

            <h3>
                ${formatJapaneseDate(dateString)}
            </h3>
    `;


    if (dayEvents.length === 0) {

        detailHtml += `
            <p>この日の予定はありません。</p>
        `;

    } else {

        dayEvents.forEach(event => {

            let timeText = "";

if (event.startTime && event.endTime) {

    timeText =
        `${escapeHtml(event.startTime)}〜${escapeHtml(event.endTime)}`;

} else if (event.startTime) {

    timeText =
        `${escapeHtml(event.startTime)}〜`;

} else if (event.endTime) {

    timeText =
        `〜${escapeHtml(event.endTime)}`;

}


            detailHtml += `
                <div class="calendar-detail-event">

                    <h4>
                        ${escapeHtml(
                            event.title || "予定"
                        )}
                    </h4>

                    ${
                        timeText
                            ? `<p class="calendar-detail-time">
                                🕐 ${timeText}
                               </p>`
                            : ""
                    }

                    ${
                        event.content
                            ? `<p>
                                ${escapeHtml(event.content)}
                               </p>`
                            : ""
                    }

                </div>
            `;

        });

    }


    detailHtml += `
        </div>
    `;


    const detailArea =
        document.getElementById("calendarDetail");


    if (detailArea) {

        detailArea.innerHTML =
            detailHtml;

        detailArea.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


// ==========================
// 日付表示
// ==========================

function formatJapaneseDate(dateString) {

    const parts =
        dateString.split("-");

    return `${parts[0]}年${Number(parts[1])}月${Number(parts[2])}日`;

}


// ==========================
// 開始
// ==========================

loadCalendar();