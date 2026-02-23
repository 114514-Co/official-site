document.addEventListener("DOMContentLoaded", () => {
    // ヘッダーの読み込み
    const headerElement = document.querySelector("#common-header");
    if (headerElement) {
        fetch("assets/inc/header.html")
            .then(response => response.text())
            .then(data => {
                headerElement.innerHTML = data;
            });
    }
    
    // 同様にフッターも外出し可能です
});