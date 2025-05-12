(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();document.addEventListener("DOMContentLoaded",()=>{c("beat_productList"),c("other_productList"),d()});function d(){document.querySelectorAll(".close-btn").forEach(o=>{o.addEventListener("click",s=>{const n=o.closest("details");n&&n.removeAttribute("open")})})}function c(o){fetch("products.json").then(s=>s.json()).then(s=>{const n=s[o],r=document.getElementById(o);n.forEach(e=>{const t=document.createElement("li");t.innerHTML=`
          <details class="product-entry">
            <summary>${e.name}</summary>
            <div class="detail-popup">
              <div class="content-row">
                <div class="section image">
                  <img src="${e.banner}" alt="${e.name}">
                </div>
                <div class="section desc">
                  <p>${e.desc}</p>
                </div>
              </div>
              <div class="section controls">
                <button class="close-btn"><span class="icon">&#xf102;</span>　閉じる/Close</button>
              </div>
            </div>
          </details>
        `,r.appendChild(t)}),d()})}
