///item.html?itemId=test&category=testCat&imageCount=3&itemName=エアコンフィルター"

// script.js
const params = new URLSearchParams(window.location.search);
const itemId = params.get("itemId");
const category = params.get("category");
const imageCount = params.get("imageCount");
const itemName = params.get("itemName");

document.addEventListener("DOMContentLoaded", () => {
    setText();
    loadImage();
    loadText();
});

function setText(){
    document.getElementById("itemId").textContent = itemId ? itemId : "?";
    document.getElementById("category").textContent = category ? category : "?";
    document.getElementById("itemName").textContent = itemName ? itemName : "?";

    const tittle  = "SnakeOilDev/" + (category ? category : "?") + "/" + (itemName ? itemName : "?");
    document.title = tittle;
}


function loadImage(){
    const gallery = document.getElementById("gallery");

    if (itemId) {
        // banner
        const banner = document.createElement("img");
        banner.src = `/img/products/${itemId}/banner.jpg`; 
        banner.onerror = function () {
            this.remove();
        };
        gallery.appendChild(banner);

        // others
      for (let i = 1; i <= imageCount; i++) {
        const img = document.createElement("img");
        const filename = i.toString().padStart(2, '0') + ".jpg"
        img.src = `/img/products/${itemId}/${filename}`; 
        img.onerror = function () {
            this.remove();
        };
        gallery.appendChild(img);
      }
    } else {
      gallery.innerText = "No item specified in URL.";
    }
}

function loadText(){
    const text = document.getElementById("description");
    if (itemId) {
        fetch(`/img/products/${itemId}/desc.txt`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                text.innerHTML = data;
            })
            .catch(error => {
                console.error('Error fetching the text:', error);
                text.innerText = "Error loading item description.";
            });
    } else {
        text.innerText = "No item specified in URL.";
    }
}