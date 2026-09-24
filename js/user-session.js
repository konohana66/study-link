// =========================
// 👤 StudyLink 共通ユーザー情報
// =========================

const USER_SESSION_GAS_URL =
    "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec";

const USER_SESSION_CACHE_TIME = 5000; // 5秒
const USER_SESSION_TIMEOUT = 5000; // 最大5秒

let studyLinkUserCache = null;
let studyLinkUserCacheTime = 0;
let studyLinkUserPromise = null;


// =========================
// ユーザー情報取得
// =========================

async function getStudyLinkUser(userId) {

    if (!userId) {
        return null;
    }

    const now = Date.now();

    // 5秒以内ならキャッシュを使用
    if (
        studyLinkUserCache &&
        studyLinkUserCache.userId === userId &&
        now - studyLinkUserCacheTime <
            USER_SESSION_CACHE_TIME
    ) {
        return studyLinkUserCache;
    }


    // すでに取得中なら同じ通信を共有
    if (studyLinkUserPromise) {
        return studyLinkUserPromise;
    }


    studyLinkUserPromise =
        fetchStudyLinkUser(userId);


    try {

        const user =
            await studyLinkUserPromise;


        if (user) {

            studyLinkUserCache =
                user;

            studyLinkUserCacheTime =
                Date.now();
        }


        return user;

    } finally {

        studyLinkUserPromise =
            null;
    }
}


// =========================
// GAS通信
// =========================

async function fetchStudyLinkUser(userId) {

    const controller =
        new AbortController();

    const timeout =
        setTimeout(() => {
            controller.abort();
        }, USER_SESSION_TIMEOUT);


    try {

        const response =
            await fetch(
                USER_SESSION_GAS_URL +
                "?type=user&userId=" +
                encodeURIComponent(userId),
                {
                    cache: "no-store",
                    signal: controller.signal
                }
            );


        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );
        }


        const user =
            await response.json();


        if (
            !user ||
            user.result === "error"
        ) {
            return null;
        }


        return user;

    } finally {

        clearTimeout(timeout);
    }
}


// =========================
// キャッシュ削除
// =========================

function clearStudyLinkUserCache() {

    studyLinkUserCache =
        null;

    studyLinkUserCacheTime =
        0;
}