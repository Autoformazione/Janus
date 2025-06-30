document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "setMode", mode: btn.dataset.mode }, () => window.close());
  });
});

chrome.runtime.sendMessage({ type: "getStatus" }, (data) => {
  const titleMap = { off: "OFF", partial: "Parziale", full: "Totale" };
  document.getElementById("status").textContent = titleMap[data.mode];
});