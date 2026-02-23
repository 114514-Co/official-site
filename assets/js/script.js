/* --- 114514 & Co. Luxury Modern Unified Script --- */

document.addEventListener("DOMContentLoaded", () => {
  console.log("SYSTEM ONLINE: 114514-CO UNIFIED ARCHITECTURE CONNECTED...");

  // 1. 共通パーツの読み込み (Header / Footer)
  loadComponent("common-header", "assets/inc/header.inc");
  loadComponent("common-footer", "assets/inc/footer.inc");

  // 2. マウス連動のアンビエントライト効果
  initAmbientLight();

  // 3. スクロール連動のアニメーション (Reveal)
  initScrollReveal();

  // 4. 隠しコマンド (Konami Command)
  initKonamiCommand();
});

/**
 * 共通パーツ読み込み関数
 */
async function loadComponent(id, file) {
  const element = document.getElementById(id);
  if (!element) return;

  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`Failed to load ${file}`);
    const data = await response.text();
    element.innerHTML = data;

    // ヘッダー読み込み完了後、モバイルメニューのイベントを紐付け
    if (id === "common-header") initMobileMenu();
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
      // LuxuryなフェードインのためにBodyのスクロールを制御
      document.body.style.overflow = navList.classList.contains("active")
        ? "hidden"
        : "";
    });
  }
}

/**
 * アンビエントライト (マウス追従)
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
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

/**
 * 隠しコマンド (Konami Command)
 * Luxury Modernな演出として、反転ではなく「静かなフェードアウト」から移行
 */
function initKonamiCommand() {
  const secretCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];
  let inputCode = [];

  window.addEventListener("keydown", (e) => {
    inputCode.push(e.key);
    inputCode = inputCode.slice(-secretCode.length);

    if (JSON.stringify(inputCode) === JSON.stringify(secretCode)) {
      console.log("UNAUTHORIZED ACCESS DETECTED...");
      document.body.style.transition = "opacity 2s ease";
      document.body.style.opacity = "0";
      setTimeout(() => {
        window.location.href = "secret.html";
      }, 2000);
    }
  });
}

// 以前の BGM / Overdrive モードは、ブランドの品格を保つため
// 必要に応じてボタンが配置されたページのみで動作するように調整可能です。

// script.js の initMobileMenu 関数内、または末尾に追記
function initSearch() {
  const trigger = document.getElementById("search-trigger");
  const container = document.getElementById("search-container");
  const input = document.getElementById("search-input");

  if (trigger && container) {
    trigger.addEventListener("click", () => {
      container.classList.toggle("active");
      if (container.classList.contains("active")) {
        input.focus();
      }
    });

    // 検索窓以外をクリックしたら閉じる
    document.addEventListener("click", (e) => {
      if (!container.contains(e.target)) {
        container.classList.remove("active");
      }
    });
  }
}

// DOMContentLoaded 内で呼び出すのを忘れずに！
// loadComponent の後などで initSearch(); を実行

// script.js の DOMContentLoaded 内、または末尾に追記

function initCookieBanner() {
  const banner = document.getElementById("cookie-banner");
  // すでに同意済み（Local Storageにデータがある）かチェック
  const isAccepted = localStorage.getItem("cookieAccepted");

  if (!isAccepted && banner) {
    // 少し遅れて表示させて「高級感」を出す
    setTimeout(() => {
      banner.classList.add("show");
    }, 2000);
  }
}

function acceptCookie() {
  const banner = document.getElementById("cookie-banner");
  if (banner) {
    banner.classList.remove("show");
    // 同意したことをブラウザに保存
    localStorage.setItem("cookieAccepted", "true");
  }
}

// 読み込み実行（loadComponentの完了を待たずに実行可能）
window.addEventListener("load", initCookieBanner);

// script.js 内の initBackToTop を以下のようにアップデート
function initBackToTop() {
  const backToTop = document.getElementById("back-to-top");
  if (!backToTop) return;

  window.addEventListener("scroll", () => {
    // 300px以上スクロールしたら表示
    if (window.scrollY > 300) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  // スムーズに上に戻る挙動
  backToTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
