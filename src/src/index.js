document.addEventListener("DOMContentLoaded", () => {
    loadProductList("beat_productList");
    loadProductList("miata_productList");
    loadProductList("other_productList");
    addCloseBtnAction();
});



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

function loadProductList(categoryName){
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
      const products = data[categoryName];
      const list = document.getElementById(categoryName);
      products.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `
          <details class="product-entry">
            <summary>${product.name}</summary>
            <div class="detail-popup">
              <div class="content-row">
                <div class="section image">
                  <img src="${product.banner}" alt="${product.name}">
                </div>
                <div class="section desc">
                  <p>${product.desc}</p>
                </div>
              </div>
              <div class="section controls">
                <button class="close-btn"><span class="icon">&#xf102;</span>　閉じる/Close</button>
              </div>
            </div>
          </details>
        `;
        list.appendChild(li);
      });

      // Rebind close buttons
      addCloseBtnAction();
    //   document.querySelectorAll(".close-btn").forEach(btn => {
    //     btn.addEventListener("click", () => {
    //       const details = btn.closest("details");
    //       if (details) details.removeAttribute("open");
    //     });
    //   });
    });
}




  