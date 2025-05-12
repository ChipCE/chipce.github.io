document.addEventListener("DOMContentLoaded", () => {
    // setDetailsDefaultClose();
    addCloseBtnAction();
});

function setDetailsDefaultClose(){
    document.querySelectorAll("details").forEach(d => d.removeAttribute("open"));
}

function addCloseBtnAction(){
    document.querySelectorAll(".close-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const details = btn.closest("details");
          if (details) {
            details.removeAttribute("open");
          }
        });
      });
}