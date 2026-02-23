/* --- 114514 & Co. Luxury Modern Unified Script --- */

document.addEventListener("DOMContentLoaded", () => {
    console.log("SYSTEM ONLINE: 114514-CO UNIFIED ARCHITECTURE CONNECTED...");

    // 1. 共通パーツの読み込みと初期化
    // ヘッダー読み込み後に検索とモバイルメニューを紐付け
    loadComponent("common-header", "assets/inc/header.inc", () => {
        initMobileMenu();
        initSearch();
    });

    // フッター読み込み後に戻るボタンとCookieバナーを紐付け
    loadComponent("common-footer", "assets/inc/footer.inc", () => {
        initBackToTop();
        initCookieBanner();
    });

    // 2. 即時実行可能なエフェクト
    initAmbientLight();
    initScrollReveal();
    initKonamiCommand();
});

/**
 * 共通パーツ読み込み関数 (Callback対応版)
 */
async function loadComponent(id, file, callback) {
    const element = document.getElementById(id);
    if (!element) return;

    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Failed to load ${file}`);
        const data = await response.text();
        element.innerHTML = data;

        // 読み込み完了後に各機能を実行
        if (callback) callback();
    } catch (error) {
        console.error("Component load error:", error);
    }
}

/**
 * モバイルメニュー制御
 */
function initMobileMenu() {
    const menuToggle = document.getElementById("mobile-menu");
    const navList = document.getElementById("nav-list");

    if (menuToggle && navList) {
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("is-active");
            navList.classList.toggle("active");
            document.body.style.overflow = navList.classList.contains("active") ? "hidden" : "";
        });
    }
}

/**
 * 検索窓の制御
 */
function initSearch() {
    const trigger = document.getElementById("search-trigger");
    const container = document.getElementById("search-container");
    const input = document.getElementById("search-input");

    if (trigger && container) {
        trigger.addEventListener("click", (e) => {
            e.stopPropagation();
            container.classList.toggle("active");
            if (container.classList.contains("active")) {
                input.focus();
            }
        });

        document.addEventListener("click", (e) => {
            if (!container.contains(e.target)) {
                container.classList.remove("active");
            }
        });
    }
}

/**
 * Cookieバナー制御 (消去ロジック完全版)
 */
function initCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.querySelector('.cookie-btn');
    const isAccepted = localStorage.getItem('cookieAccepted');

    if (!banner) return;

    if (isAccepted) {
        banner.style.display = 'none';
        return;
    }

    setTimeout(() => {
        banner.classList.add('show');
    }, 2000);

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            banner.classList.remove('show');
            localStorage.setItem('cookieAccepted', 'true');
            // アニメーション完了後にDOMから消して操作の邪魔を防ぐ
            setTimeout(() => { banner.style.display = 'none'; }, 800);
        });
    }
}

/**
 * Back to Top 制御
 */
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/**
 * アンビエントライト
 */
function initAmbientLight() {
    const light = document.getElementById("ambient-light");
    if (!light) return;

    window.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        light.style.setProperty("--mouse-x", `${x}%`);
        light.style.setProperty("--mouse-y", `${y}%`);
    });
}

/**
 * スクロール連動アニメーション
 */
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

/**
 * 隠しコマンド
 */
function initKonamiCommand() {
    const secretCode = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
    let inputCode = [];

    window.addEventListener("keydown", (e) => {
        inputCode.push(e.key);
        inputCode = inputCode.slice(-secretCode.length);
        if (JSON.stringify(inputCode) === JSON.stringify(secretCode)) {
            document.body.style.transition = "opacity 2s ease";
            document.body.style.opacity = "0";
            setTimeout(() => { window.location.href = "secret.html"; }, 2000);
        }
    });
}