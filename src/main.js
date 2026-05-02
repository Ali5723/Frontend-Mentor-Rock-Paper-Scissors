["#rulesButton", ".closeButton"].forEach((selector) => {
  document.querySelector(selector).addEventListener("click", (e) => {
    document.querySelector(".overlay").classList.toggle("hidden");
    document.querySelector(".rules").classList.toggle("hidden");
  });
});
