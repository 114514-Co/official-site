/* assets/js/main.js */
document.addEventListener('DOMContentLoaded', () => {
    console.log('SYSTEM ONLINE: 114514-CO CONNECTED...');
    initBackToTop();
    initKonamiCommand();
});

// モバイルメニュー
function mobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');
    menu.classList.toggle('is-active');
    navList.classList.toggle('active');
    if(navList.classList.contains('active')) console.log("MOBILE ACCESS GRANTED...");
}

// BGM制御
let isPlaying = false;
function toggleBGM() {
    const bgm = document.getElementById('myBGM');
    const btn = document.getElementById('bgm-control');
    if (isPlaying) {
        bgm.pause();
        btn.innerText = '🔊 SYSTEM SOUND: OFF';
        document.body.classList.remove('shaking');
    } else {
        bgm.play();
        btn.innerText = '🔊 SYSTEM SOUND: ON (HYPER)';
        document.body.classList.add('shaking');
        isPlaying = true;
    }
}

// モード切替
function toggleMode() {
    const body = document.body;
    const btn = document.getElementById('mode-switch');
    body.classList.toggle('overdrive-mode');
    btn.innerText = body.classList.contains('overdrive-mode') ? 'MODE: OVERDRIVE' : 'MODE: NORMAL';
}

// 隠しコマンド
function initKonamiCommand() {
    const secretCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let inputCode = [];
    window.addEventListener('keydown', (e) => {
        inputCode.push(e.key);
        inputCode = inputCode.slice(-secretCode.length);
        if (JSON.stringify(inputCode) === JSON.stringify(secretCode)) {
            document.body.style.filter = "invert(100%)";
            setTimeout(() => { window.location.href = 'secret.html'; }, 1000);
        }
    });
}

// Cookieバナー
function acceptCookie() {
    document.getElementById('cookie-banner').style.display = 'none';
}

// 戻るボタン
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        window.scrollY > 300 ? backToTop.classList.add('show') : backToTop.classList.remove('show');
    });
}