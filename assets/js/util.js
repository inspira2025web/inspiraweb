(function () {
  
 

  // Mouse movement (throttled)
  let lastMouseLog = 0;
  document.addEventListener("mousemove", e => {
    const now = Date.now();
    if (now - lastMouseLog > 2000) {
      lastMouseLog = now;
      logAction("Mouse Move", { mouseX: e.clientX, mouseY: e.clientY });
    }
  });

  // Clicks
  document.addEventListener("click", e => {
    logAction("Mouse Click", {
      mouseX: e.clientX,
      mouseY: e.clientY,
      button: e.button === 0 ? "Left" : e.button === 2 ? "Right" : "Middle",
    });
  });

  // Right-click
  document.addEventListener("contextmenu", e => {
    e.preventDefault();
    logAction("Right Click Attempt", { mouseX: e.clientX, mouseY: e.clientY });
  });

  // Page open/close
  window.addEventListener("load", () => logAction("Page Opened"));
  window.addEventListener("beforeunload", () => logAction("Page Closed"));
})();
