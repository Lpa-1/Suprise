document.addEventListener("DOMContentLoaded", function () {

    // ── Music: restore playback position across pages ──
    var music = document.getElementById("music");
    if (music) {
        if (localStorage.getItem("musicStarted") === "true") {
            var savedTime = localStorage.getItem("musicTime");
            if (savedTime) music.currentTime = parseFloat(savedTime);
            music.play().catch(function () {});
        }
        music.addEventListener("timeupdate", function () {
            localStorage.setItem("musicTime", music.currentTime);
        });
    }

    // ── Touch shake helper (CSS :hover handles desktop) ──
    function addTouchShake(el) {
        if (!el) return;
        el.addEventListener("touchstart", function () {
            el.classList.add("shaking");
        }, { passive: true });
        el.addEventListener("touchend", function () {
            setTimeout(function () {
                el.classList.remove("shaking");
            }, 700);
        }, { passive: true });
    }

    // ════════════════════════════
    //  index.html
    // ════════════════════════════
    var celebrateBtn = document.getElementById("celebrateBtn");
    if (celebrateBtn) {
        celebrateBtn.addEventListener("click", function () {
            if (music) {
                // Always restart music from the beginning
                localStorage.removeItem("musicTime");
                music.currentTime = 0;
                music.play().then(function () {
                    localStorage.setItem("musicStarted", "true");
                    window.location.href = "cake.html";
                }).catch(function () {
                    localStorage.setItem("musicStarted", "true");
                    window.location.href = "cake.html";
                });
            } else {
                window.location.href = "cake.html";
            }
        });
    }

    // ════════════════════════════
    //  cake.html
    // ════════════════════════════
    var knifeImage = document.getElementById("knifeImage");
    var cakeImage  = document.getElementById("cakeImage");

    if (knifeImage && cakeImage) {
        addTouchShake(knifeImage);

        knifeImage.addEventListener("click", function () {
            cakeImage.src = "sliced-cake.png";
            knifeImage.style.display = "none";
            cakeImage.classList.add("sliced");
            cakeImage.classList.add("shakeable");
            addTouchShake(cakeImage);
            cakeImage.addEventListener("click", function () {
                window.location.href = "gift.html";
            }, { once: true });
        });
    }

    // ════════════════════════════
    //  gift.html
    // ════════════════════════════
    var giftImage   = document.getElementById("giftImage");
    var messageArea = document.getElementById("messageArea");

    if (giftImage && messageArea) {
        messageArea.style.display  = "none";
        messageArea.style.opacity  = "0";

        addTouchShake(giftImage);

        giftImage.addEventListener("click", function () {
            giftImage.style.transition = "opacity 0.4s ease";
            giftImage.style.opacity    = "0";

            setTimeout(function () {
                giftImage.style.display = "none";
                messageArea.style.display = "flex";

                requestAnimationFrame(function () {
                    requestAnimationFrame(function () {
                        messageArea.style.transition = "opacity 0.6s ease";
                        messageArea.style.opacity    = "1";
                    });
                });
            }, 400);
        });
    }

});
