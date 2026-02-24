/* --- 114514 & Co. Luxury Modern Unified Script --- */

document.addEventListener("DOMContentLoaded", () => {
  console.log("SYSTEM ONLINE: 114514-CO UNIFIED ARCHITECTURE CONNECTED...");

  // --- ローディングシステムの即時起動 ---
  initUnifiedLoader();

  // 1. 共通パーツの読み込みと初期化
  loadComponent("common-header", "assets/inc/header.inc", () => {
    initMobileMenu();
    initSearch();
  });

  loadComponent("common-footer", "assets/inc/footer.inc", () => {
    initBackToTop();
    initCookieBanner();
    initSoundToggle(); // システムサウンドの切り替え・再生機能
  });

  // 2. 即時実行可能なエフェクト
  initAmbientLight();
  initScrollReveal();
  initKonamiCommand();
});

/**
 * 統合ローディングシステム
 * HTMLを自動生成し、カウントアップ演出を実行
 */
function initUnifiedLoader() {
  // すでに存在しない場合のみ生成（二重実行防止）
  if (document.getElementById("loading-screen")) return;

  const loadingHTML = `
    <div id="loading-screen">
        <div class="loader-content">
            <div class="loader-logo">114514 & Co.</div>
            <div class="loader-bar-container">
                <div class="loader-bar" id="loader-bar"></div>
            </div>
            <div class="loader-percentage" id="loader-text">0%</div>
        </div>
    </div>
  `;
  document.body.insertAdjacentHTML("afterbegin", loadingHTML);

  const loaderBar = document.getElementById("loader-bar");
  const loaderText = document.getElementById("loader-text");
  let progress = 0;

  // ローディング演出の実行
  const progressInterval = setInterval(() => {
    // 擬似プログレス増加
    progress += Math.floor(Math.random() * 12) + 3;

    if (progress >= 100) {
      progress = 100;
      clearInterval(progressInterval);

      // 完了時の演出（window.onloadを待たずに100%になったら終了）
      setTimeout(() => {
        document.body.classList.add("loaded");
        // アニメーション後にDOMから非表示にする（クリックイベント阻害防止）
        setTimeout(() => {
          document.getElementById("loading-screen").style.display = "none";
        }, 800);
      }, 500);
    }

    if (loaderBar) loaderBar.style.width = `${progress}%`;
    if (loaderText) loaderText.innerText = `${progress}%`;
  }, 60);

  // 念のため、全ての外部リソース（重い画像等）が読み終わったら強制終了させる設定
  window.addEventListener("load", () => {
    if (progress < 100) {
      progress = 100;
      // 上記のsetInterval側で完了処理が行われる
    }
  });
}

/**
 * 共通パーツ読み込み関数
 */
async function loadComponent(id, file, callback) {
  const element = document.getElementById(id);
  if (!element) return;

  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`Failed to load ${file}`);
    const data = await response.text();
    element.innerHTML = data;

    if (callback) callback();
  } catch (error) {
    console.error("Component load error:", error);
  }
}

/**
 * システムサウンドのステータス切替 & BGM・SE制御
 */
function initSoundToggle() {
  const statusBtn = document.getElementById("sound-status");
  const bgm = document.getElementById("myBGM");

  const clickSE = new Audio("assets/audio/click.mp3");
  clickSE.volume = 0.4;

  if (!statusBtn) return;

  statusBtn.addEventListener("click", () => {
    const isCurrentlyEnabled = !statusBtn.classList.contains("disabled");

    if (isCurrentlyEnabled) {
      statusBtn.textContent = "DISABLED";
      statusBtn.classList.add("disabled");
      if (bgm) bgm.pause();
    } else {
      statusBtn.textContent = "ENABLED";
      statusBtn.classList.remove("disabled");

      if (bgm) {
        bgm.play().catch(() => {
          console.log("Playback blocked by browser.");
        });
      }

      clickSE.currentTime = 0;
      clickSE.play().catch(() => {});
    }
  });
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
      document.body.style.overflow = navList.classList.contains("active")
        ? "hidden"
        : "";
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

  if (!trigger || !container || !input) return;

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    container.classList.toggle("active");
    if (container.classList.contains("active")) {
      input.focus();
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const query = input.value.trim();
      if (query) {
        window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        container.classList.remove("active");
        input.value = "";
      }
    }
  });

  document.addEventListener("click", (e) => {
    if (!container.contains(e.target) && !trigger.contains(e.target)) {
      container.classList.remove("active");
    }
  });
}

/**
 * Cookieバナー制御
 */
function initCookieBanner() {
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.querySelector(".cookie-btn");
  const isAccepted = localStorage.getItem("cookieAccepted");

  if (!banner) return;
  if (isAccepted) {
    banner.style.display = "none";
    return;
  }

  setTimeout(() => {
    banner.classList.add("show");
  }, 2000);

  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      banner.classList.remove("show");
      localStorage.setItem("cookieAccepted", "true");
      setTimeout(() => {
        banner.style.display = "none";
      }, 800);
    });
  }
}

/**
 * Back to Top 制御
 */
function initBackToTop() {
  const backToTop = document.getElementById("back-to-top");
  if (!backToTop) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
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
 * 隠しコマンド（コナミコマンド）
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
      document.body.style.transition = "opacity 2s ease";
      document.body.style.opacity = "0";
      setTimeout(() => {
        window.location.href = "secret.html";
      }, 2000);
    }
  });
}
