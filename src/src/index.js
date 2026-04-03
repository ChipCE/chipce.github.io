document.addEventListener("DOMContentLoaded", () => {
    setupProductDialog();
    loadProductList("beat_productList");
    loadProductList("miata_productList");
    loadProductList("other_productList");
});

function setupProductDialog() {
    const dialog = document.getElementById("productDialog");
    const closeBtn = document.getElementById("productDialogClose");

    closeBtn?.addEventListener("click", () => {
      dialog?.close();
    });

    dialog?.addEventListener("click", (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });
}

function openProductDialog(product) {
    const dialog = document.getElementById("productDialog");
    const title = document.getElementById("productDialogTitle");
    const desc = document.getElementById("productDialogDesc");
    const image = document.getElementById("productDialogImage");
    const links = document.getElementById("productDialogLinks");

    if (!dialog || !title || !desc || !image || !links) {
      return;
    }

    title.textContent = product.name;
    desc.innerHTML = `<span class="icon">&#xf0189;</span> ${product.desc}`;
    const dialogImage = product.image && product.image.trim() !== "" ? product.image : product.banner;
    if (dialogImage && dialogImage.trim() !== "") {
      image.src = dialogImage;
      image.alt = product.name;
      image.hidden = false;
    } else {
      image.hidden = true;
      image.removeAttribute("src");
      image.alt = "";
    }

    links.innerHTML = "";
    if (Array.isArray(product.links) && product.links.length > 0) {
      const heading = document.createElement("p");
      heading.className = "product-dialog-links-title";
      heading.innerHTML = `<span class="icon">&#xf0337;</span> 関連リンク・開発メモ・Related links`;
      links.appendChild(heading);

      const list = document.createElement("ul");
      list.className = "product-dialog-links-list";

      product.links.forEach((url) => {
        const item = document.createElement("li");
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.target = "_blank";
        anchor.rel = "noreferrer noopener";
        anchor.textContent = url;
        item.appendChild(anchor);
        list.appendChild(item);
      });

      links.appendChild(list);
      links.hidden = false;
    } else {
      links.hidden = true;
    }

    dialog.showModal();
}

function loadProductList(categoryName){
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
      const products = data[categoryName];
      const list = document.getElementById(categoryName);
      products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('box-', 'square');
        card.innerHTML = `
          <div class="product-trigger" role="button" tabindex="0">
            <div class="product-summary">
              <img class="product-thumb" src="${product.banner}" alt="${product.name}">
              <span class="product-name">${product.name}</span>
            </div>
          </div>
        `;
        list.appendChild(card);
        const trigger = card.querySelector(".product-trigger");
        trigger?.addEventListener("click", () => {
          openProductDialog(product);
        });
        trigger?.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openProductDialog(product);
          }
        });
      });
    });
}




  
