// ====================
// Study Link
// 学習記録
// ====================

const GAS_URL =
    "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec";


// ====================
// ユーザーID
// ====================

const userId =
    localStorage.getItem("userId");


// ====================
// 要素
// ====================

const totalHours =
    document.getElementById("totalHours");

const totalMinutes =
    document.getElementById("totalMinutes");

const studyMessage =
    document.getElementById("studyMessage");

const weeklyChart =
    document.getElementById("weeklyChart");

const subjectPieChart =
    document.getElementById("subjectPieChart");


// ====================
// 学習記録読み込み
// ====================

async function loadRecords() {

    if (!userId) {

        studyMessage.textContent =
            "ログインしてください。";

        return;
    }


    try {

        const response = await fetch(
            GAS_URL +
            "?type=studyRecords&userId=" +
            encodeURIComponent(userId)
        );


        const records =
            await response.json();


        console.log(
            "GASの返答:",
            records
        );


        showRecords(records);


    } catch (error) {

        console.error(
            "GASエラー:",
            error
        );


        studyMessage.textContent =
            "学習記録の読み込みに失敗しました。";

    }

}


// ====================
// 表示
// ====================

function showRecords(records) {

    const now =
        new Date();


    // ====================
    // 今週の月曜日
    // ====================

    const monday =
        new Date(now);


    const day =
        monday.getDay();


    const diff =
        day === 0
            ? -6
            : 1 - day;


    monday.setDate(
        monday.getDate() + diff
    );


    monday.setHours(
        0,
        0,
        0,
        0
    );


    // ====================
    // 曜日別
    // ====================

    const weekMinutes =
        [
            0,
            0,
            0,
            0,
            0,
            0,
            0
        ];


    // ====================
    // 教科別
    // ====================

    const subjectMinutes = {

        "国語": 0,

        "数学": 0,

        "英語": 0,

        "理科": 0,

        "社会": 0

    };


    let total = 0;


    // ====================
    // データ集計
    // ====================

    records.forEach(record => {

        const date =
            new Date(record.date);


        const minutes =
            Number(record.minutes) || 0;


        if (isNaN(date.getTime())) {
            return;
        }


        // 日付だけにする

        const recordDate =
            new Date(date);


        recordDate.setHours(
            0,
            0,
            0,
            0
        );


        // ====================
        // 今週の日曜日まで
        // ====================

        const weekEnd =
            new Date(monday);


        weekEnd.setDate(
            weekEnd.getDate() + 7
        );


        // ====================
        // 今週なら集計
        // ====================

        if (
            recordDate >= monday &&
            recordDate < weekEnd
        ) {

            total += minutes;


            // ====================
            // 曜日
            // 月=0 ～ 日=6
            // ====================

            let dayIndex =
                recordDate.getDay() - 1;


            if (dayIndex < 0) {

                dayIndex = 6;

            }


            weekMinutes[dayIndex] +=
                minutes;


            // ====================
            // 教科
            // ====================

            if (
                subjectMinutes[
                    record.subject
                ] !== undefined
            ) {

                subjectMinutes[
                    record.subject
                ] += minutes;

            }

        }

    });


    // ====================
    // 合計時間
    // ====================

    const hours =
        Math.floor(total / 60);


    const minutes =
        total % 60;


    totalHours.textContent =
        hours;


    totalMinutes.textContent =
        minutes;


    // ====================
    // メッセージ
    // ====================

    if (total === 0) {

        studyMessage.textContent =
            "今週も頑張ろう！📚";

    }

    else if (total < 60) {

        studyMessage.textContent =
            "いいスタート！この調子！🔥";

    }

    else if (total < 180) {

        studyMessage.textContent =
            "しっかり勉強できてる！💪";

    }

    else {

        studyMessage.textContent =
            "すごい！今週もめっちゃ頑張ってる！🏆";

    }


    // ====================
    // 曜日別グラフ
    // ====================

    createWeeklyChart(
        weekMinutes
    );


    // ====================
    // 教科別
    // ====================

    updateSubject(
        "japanese",
        subjectMinutes["国語"]
    );


    updateSubject(
        "math",
        subjectMinutes["数学"]
    );


    updateSubject(
        "english",
        subjectMinutes["英語"]
    );


    updateSubject(
        "science",
        subjectMinutes["理科"]
    );


    updateSubject(
        "social",
        subjectMinutes["社会"]
    );


    // ====================
    // 円グラフ
    // ====================

    updateSubjectPie(
        subjectMinutes
    );

}


// ====================
// 曜日別グラフ
// ====================

function createWeeklyChart(minutes) {

    weeklyChart.innerHTML = "";


    const days = [

        "月",
        "火",
        "水",
        "木",
        "金",
        "土",
        "日"

    ];


    const max =
        Math.max(...minutes, 1);


    minutes.forEach(
        (minute, index) => {

            const item =
                document.createElement("div");


            item.className =
                "day-bar";


            const height =
                Math.max(
                    5,
                    (minute / max) * 100
                );


            item.innerHTML = `

                <div class="bar-value">
                    ${minute}分
                </div>

                <div
                    class="bar-fill"
                    style="
                        height:${height}%;
                    ">
                </div>

                <div class="day-name">
                    ${days[index]}
                </div>

            `;


            weeklyChart.appendChild(
                item
            );

        }
    );

}


// ====================
// 教科バー
// ====================

function updateSubject(
    name,
    minutes
) {

    const time =
        document.getElementById(
            name + "Time"
        );


    const bar =
        document.getElementById(
            name + "Bar"
        );


    if (time) {

        time.textContent =
            `${minutes}分`;

    }


    if (bar) {

        bar.style.width =
            `${Math.min(minutes, 100)}%`;

    }

}


// ====================
// 教科円グラフ
// ====================

function updateSubjectPie(
    subjects
) {

    const pie =
        document.getElementById(
            "subjectPieChart"
        );


    if (!pie) {
        return;
    }


    // ====================
    // 合計
    // ====================

    const total =

        subjects["国語"] +
        subjects["数学"] +
        subjects["英語"] +
        subjects["理科"] +
        subjects["社会"];


    // ====================
    // 0分ならグレー
    // ====================

    if (total === 0) {

        pie.style.background =
            "#e2e8f0";


        updatePercent(
            "japanese",
            0
        );

        updatePercent(
            "math",
            0
        );

        updatePercent(
            "english",
            0
        );

        updatePercent(
            "science",
            0
        );

        updatePercent(
            "social",
            0
        );

        return;
    }


    // ====================
    // 各教科の割合
    // ====================

    const japanese =
        subjects["国語"] / total * 100;


    const math =
        subjects["数学"] / total * 100;


    const english =
        subjects["英語"] / total * 100;


    const science =
        subjects["理科"] / total * 100;


    const social =
        subjects["社会"] / total * 100;


    // ====================
    // パーセント表示
    // ====================

    updatePercent(
        "japanese",
        japanese
    );


    updatePercent(
        "math",
        math
    );


    updatePercent(
        "english",
        english
    );


    updatePercent(
        "science",
        science
    );


    updatePercent(
        "social",
        social
    );


    // ====================
    // 円グラフ
    // ====================

    const japaneseEnd =
        japanese;


    const mathEnd =
        japaneseEnd + math;


    const englishEnd =
        mathEnd + english;


    const scienceEnd =
        englishEnd + science;


    const socialEnd =
        scienceEnd + social;


    pie.style.background = `conic-gradient(

        #ef4444 0% ${japaneseEnd}%,

        #2563eb ${japaneseEnd}% ${mathEnd}%,

        #a855f7 ${mathEnd}% ${englishEnd}%,

        #f59e0b ${englishEnd}% ${scienceEnd}%,

        #22c55e ${scienceEnd}% ${socialEnd}%

    )`;

}


// ====================
// パーセント更新
// ====================

function updatePercent(
    name,
    percent
) {

    const element =
        document.getElementById(
            name + "Percent"
        );


    if (!element) {
        return;
    }


    element.textContent =
        `${percent.toFixed(1)}%`;

}


// ====================
// 開始
// ====================

loadRecords();