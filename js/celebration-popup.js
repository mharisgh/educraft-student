(function () {
  if (window.initCelebrationPopup) return;

  function injectStyles() {
    if (document.getElementById("ec-celebration-styles")) return;

    var style = document.createElement("style");
    style.id = "ec-celebration-styles";
    style.textContent = [
      ".ec-celebration-overlay{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;padding:24px;opacity:0;pointer-events:none;transition:opacity .3s ease;z-index:9999;}",
      ".ec-celebration-overlay.is-open{opacity:1;pointer-events:auto;}",
      ".ec-celebration-backdrop{position:absolute;inset:0;background:rgba(15,23,42,.52);backdrop-filter:blur(6px);}",
      ".ec-celebration-modal{position:relative;width:min(100%,560px);overflow:hidden;border-radius:28px;background:linear-gradient(180deg,#fff8f2 0%,#ffffff 100%);box-shadow:0 28px 90px rgba(15,23,42,.25);padding:32px 28px 28px;text-align:center;transform:translateY(24px) scale(.96);transition:transform .35s cubic-bezier(.22,1,.36,1);}",
      ".ec-celebration-overlay.is-open .ec-celebration-modal{transform:translateY(0) scale(1);}",
      ".ec-celebration-rain{pointer-events:none;position:absolute;inset:0;overflow:hidden;}",
      ".ec-confetti-piece{position:absolute;top:-14%;width:12px;height:26px;border-radius:999px;opacity:.9;animation-name:ec-confetti-fall;animation-timing-function:linear;animation-iteration-count:1;}",
      ".ec-confetti-piece--dot{width:10px;height:10px;border-radius:999px;}",
      ".ec-celebration-badge{position:relative;display:flex;align-items:center;justify-content:center;width:92px;height:92px;margin:12px auto 18px;border-radius:999px;background:radial-gradient(circle at top,#ffd7af 0%,#f8740b 72%);box-shadow:0 18px 40px rgba(248,116,11,.34);animation:ec-badge-float 2.6s ease-in-out infinite;}",
      ".ec-celebration-badge img{width:50px;height:50px;object-fit:contain;}",
      ".ec-celebration-kicker{margin:0;font-size:12px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#bf4b00;}",
      ".ec-celebration-title{margin:12px 0 0;font-size:34px;line-height:1.08;font-weight:700;color:#16130f;}",
      ".ec-celebration-message{margin:14px auto 0;max-width:420px;font-size:16px;line-height:1.7;color:rgba(22,19,15,.72);}",
      ".ec-celebration-chip{display:inline-flex;margin-top:18px;align-items:center;justify-content:center;border-radius:999px;background:#fff1e6;padding:10px 16px;font-size:13px;font-weight:600;color:#bf4b00;}",
      ".ec-celebration-actions{margin-top:24px;display:flex;flex-wrap:wrap;gap:12px;justify-content:center;}",
      ".ec-celebration-btn{display:inline-flex;align-items:center;justify-content:center;min-width:180px;border-radius:999px;padding:14px 22px;font-weight:600;text-decoration:none;transition:transform .2s ease,background .2s ease,color .2s ease,border-color .2s ease;}",
      ".ec-celebration-btn:hover{transform:translateY(-2px);}",
      ".ec-celebration-btn--primary{background:#f8740b;color:#fff;box-shadow:0 14px 28px rgba(248,116,11,.24);}",
      ".ec-celebration-btn--primary:hover{background:#bf4b00;}",
      ".ec-celebration-btn--secondary{background:#fff;color:#16130f;border:1px solid rgba(22,19,15,.12);}",
      ".ec-celebration-btn--secondary:hover{border-color:rgba(248,116,11,.35);color:#bf4b00;}",
      "@keyframes ec-confetti-fall{0%{transform:translate3d(0,-20px,0) rotate(0deg);opacity:0;}10%{opacity:1;}100%{transform:translate3d(var(--drift,0px),118vh,0) rotate(var(--spin,480deg));opacity:1;}}",
      "@keyframes ec-badge-float{0%,100%{transform:translateY(0);}50%{transform:translateY(-6px);}}",
      "@media (max-width:640px){.ec-celebration-modal{padding:28px 20px 22px;}.ec-celebration-title{font-size:28px;}.ec-celebration-btn{width:100%;}}",
      "@media (prefers-reduced-motion:reduce){.ec-celebration-overlay,.ec-celebration-modal,.ec-confetti-piece,.ec-celebration-badge{animation:none !important;transition:none !important;}}"
    ].join("");
    document.head.appendChild(style);
  }

  function createPieces(container) {
    container.innerHTML = "";
    var colors = ["#f8740b", "#ffbc00", "#ff8a3d", "#8bd3ff", "#7ce7ac", "#ffc5df"];
    for (var i = 0; i < 28; i += 1) {
      var piece = document.createElement("span");
      piece.className = "ec-confetti-piece" + (i % 5 === 0 ? " ec-confetti-piece--dot" : "");
      piece.style.left = Math.random() * 100 + "%";
      piece.style.background = colors[i % colors.length];
      piece.style.animationDuration = 3.4 + Math.random() * 2 + "s";
      piece.style.animationDelay = Math.random() * 0.45 + "s";
      piece.style.setProperty("--drift", Math.round((Math.random() - 0.5) * 160) + "px");
      piece.style.setProperty("--spin", Math.round((Math.random() - 0.5) * 1200) + "deg");
      container.appendChild(piece);
    }
  }

  function buildPopup(config) {
    var overlay = document.createElement("div");
    overlay.className = "ec-celebration-overlay";
    overlay.innerHTML = [
      '<div class="ec-celebration-backdrop"></div>',
      '<div class="ec-celebration-modal" role="dialog" aria-modal="true" aria-labelledby="ec-celebration-title">',
      '  <div class="ec-celebration-rain"></div>',
      '  <div class="ec-celebration-badge"><img src="' + (config.badgeImage || "./assets/confetti.png") + '" alt="Celebration" /></div>',
      '  <p class="ec-celebration-kicker">Story Submitted</p>',
      '  <h2 id="ec-celebration-title" class="ec-celebration-title"></h2>',
      '  <p class="ec-celebration-message"></p>',
      '  <div class="ec-celebration-chip"></div>',
      '  <div class="ec-celebration-actions">',
      '    <a class="ec-celebration-btn ec-celebration-btn--primary" href="' + (config.primaryHref || "#") + '"></a>',
      '    <a class="ec-celebration-btn ec-celebration-btn--secondary" href="' + (config.secondaryHref || "#") + '"></a>',
      '  </div>',
      '</div>'
    ].join("");

    document.body.appendChild(overlay);

    var modal = overlay.querySelector(".ec-celebration-modal");
    var rain = overlay.querySelector(".ec-celebration-rain");
    var title = overlay.querySelector(".ec-celebration-title");
    var message = overlay.querySelector(".ec-celebration-message");
    var chip = overlay.querySelector(".ec-celebration-chip");
    var primaryBtn = overlay.querySelector(".ec-celebration-btn--primary");
    var secondaryBtn = overlay.querySelector(".ec-celebration-btn--secondary");

    var compliments = config.compliments || [
      "You turned an idea into something real.",
      "Your creativity and effort really shine.",
      "You made something awesome and worth sharing.",
      "That is exactly the kind of brave building we love to see."
    ];

    function fillContent() {
      var messageIndex = Math.floor(Math.random() * compliments.length);
      title.textContent = config.title || "You did something incredible!";
      message.textContent = config.message || compliments[messageIndex];
      chip.textContent = config.chipText || "Amazing work . Keep building";
      primaryBtn.textContent = config.primaryLabel || "Read the created story";
      secondaryBtn.textContent = config.secondaryLabel || "Go Home";
    }

    function open() {
      fillContent();
      createPieces(rain);
      overlay.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }

    function close() {
      overlay.classList.remove("is-open");
      document.body.style.overflow = "";
      window.setTimeout(function () {
        rain.innerHTML = "";
      }, 280);
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && overlay.classList.contains("is-open")) {
        close();
      }
    });

    modal.addEventListener("click", function (event) {
      event.stopPropagation();
    });

    return {
      open: open,
      close: close,
      element: overlay
    };
  }

  window.initCelebrationPopup = function (config) {
    injectStyles();

    var popup = buildPopup(config || {});
    var trigger = config && config.triggerSelector ? document.querySelector(config.triggerSelector) : null;

    if (trigger) {
      trigger.addEventListener("click", function (event) {
        event.preventDefault();
        popup.open();
      });
    }

    return popup;
  };
})();
