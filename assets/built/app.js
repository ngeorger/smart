!function(){"use strict";function e(e){document.documentElement.setAttribute("data-color-pref",e),localStorage.setItem("pref",e)}async function t(){const e=window.location.href;await navigator.clipboard.writeText(e),document.querySelectorAll(".sm-copy-button").forEach((e=>{const t=e,s=t.innerHTML;t.innerHTML='<svg viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M6 4v4h12V4h2.007c.548 0 .993.445.993.993v16.014a.994.994 0 0 1-.993.993H3.993A.994.994 0 0 1 3 21.007V4.993C3 4.445 3.445 4 3.993 4H6zm2-2h8v4H8V2z"/></svg> Copied ✅',setTimeout((()=>{t.innerHTML=s}),3e3)}))}class s{constructor(e){this.id=e&&e.dataset.id||null,this.title=e&&e.dataset.title||null,this.items=()=>s.makeArray(JSON.parse(localStorage.getItem("saves"))),this.int=null}generateItem(){return{id:this.id,title:this.title,timestamp:new Date,scrollPos:this.scrollStatus().scrollPos,progress:this.scrollStatus().progress}}save(){localStorage.setItem("saves",JSON.stringify([this.generateItem(),...this.items()])),this.populateSavesMenu(),this.updateScrollPosition();document.querySelectorAll(`button[data-id=${this.id}]`).forEach((e=>{e.classList.add("sm-love-toggle")}))}remove(){const e=[...this.items()],t=e.findIndex((e=>this.id===e.id));e.splice(t,1),localStorage.removeItem("saves"),e.length&&localStorage.setItem("saves",JSON.stringify(e)),this.int=null,this.populateSavesMenu();document.querySelectorAll(`button[data-id=${this.id}]`).forEach((e=>{e.classList.remove("sm-love-toggle")}))}static makeArray(e){return e?e.length?e:[e]:[]}scrollStatus(){return this.isCurrentPageSaved()<0?{scrollPos:null,progress:null}:{scrollPos:window.scrollY,progress:Math.round(window.scrollY/(document.body.scrollHeight-document.body.clientHeight)*100)}}identifySaves(){this.items()&&this.items().forEach((e=>{const{id:t}=e,s=document.querySelectorAll(`button[data-id=${t}]`);s&&s.forEach((e=>e.classList.add("sm-love-toggle")))}))}isCurrentPageSaved(){const e=window.location.pathname.replace(/\//g,"");return this.items().findIndex((t=>t.id===e))}step(){const e=this.isCurrentPageSaved();if(e<0)return;const t=this.items();t[e].progress=this.scrollStatus().progress,t[e].scrollPos=this.scrollStatus().scrollPos,localStorage.removeItem("saves"),localStorage.setItem("saves",JSON.stringify(t)),this.populateSavesMenu(),setTimeout((()=>{window.requestAnimationFrame(this.step.bind(this))}),1e3)}updateScrollPosition(){if(!this.items().length)return;this.isCurrentPageSaved()<0||window.requestAnimationFrame(this.step.bind(this))}scrollToPos(){if(this.isCurrentPageSaved()>-1){const e=this.items();window.scrollTo({top:e[this.isCurrentPageSaved()].scrollPos,behavior:"smooth"})}}renderSavesMenu(){return this.items().map((e=>`<div class="sm-saves" style="background-image: linear-gradient(to right, hsla(\n          var(--primary-h) var(--saturation) var(--lightness) / ${e.progress?.35:.15}\n        ) ${e.progress?e.progress-10:50}%, hsla(\n          var(--primary-h) var(--saturation) var(--lightness) / 0.15\n        ) ${e.progress?e.progress+10:50}%">\n            <div class="sm-saves-meta">\n                <div>\n                    <p class="sm-saves-title"><a href="/${e.id}">${e.title}</a></p>\n                    <p class="sm-saves-date">Saved on ${(new Intl.DateTimeFormat).format(new Date(e.timestamp))}</p>\n                </div>\n                <button class="sm-circle-icon-button sm-love-button sm-love-toggle" data-id="${e.id}" data-title="${e.title}" aria-label="Remove ${e.title} from favorites">\n                <span class="sm-heart-outline-icon">\n                <svg><use href="#sm-heart-outline-icon"></use></svg>\n                </span>\n                <span class="sm-heart-fill-icon">\n                <svg><use href="#sm-heart-fill-icon"></use></svg>\n                </span>\n                </button>\n            </div>\n        </div>`)).join("")}populateSavesMenu(){const e=document.querySelector(".sm-overflow-articles"),t=document.querySelector(".sm-nav-menu-saves");if(!this.items().length){const s="<p>No articles saved yet. Hit the heart to get started!</p>";return e.innerHTML=s,void(t.innerHTML=s)}e.innerHTML=this.renderSavesMenu(),t.innerHTML=this.renderSavesMenu()}init(){this.identifySaves(),this.populateSavesMenu(),this.scrollToPos(),this.updateScrollPosition()}}function o(o){if(o.target.closest(".sm-navbar-menu-button")&&document.querySelector(".sm-nav-menu-container").classList.add("sm-show-menu"),o.target.closest(".sm-love-button"))!function(e){const t=new s(e),o=t.items();if(!o.length)return void t.save();const{id:r}=t;o.find((e=>e.id===r))?t.remove():t.save()}(o.target.closest(".sm-love-button"));else if(o.target.closest(".sm-nav-menu-close-button")&&document.querySelector(".sm-nav-menu-container").classList.remove("sm-show-menu"),o.target.closest(".sm-copy-button"))t();else if(o.target.closest(".sm-dark-mode"))e("dark");else{if(!o.target.closest(".sm-light-mode"))return o.target.closest(".sm-follow-button")?(document.querySelector(".sm-overflow-buttons").classList.add("sm-hide"),void document.querySelector(".sm-overflow-follow").classList.add("sm-show")):o.target.closest(".sm-share-button")?(document.querySelector(".sm-overflow-buttons").classList.add("sm-hide"),void document.querySelector(".sm-overflow-share").classList.add("sm-show")):o.target.closest(".sm-saves-button")?(document.querySelector(".sm-overflow-buttons").classList.add("sm-hide"),void document.querySelector(".sm-overflow-saves").classList.add("sm-show")):o.target.closest(".sm-overflow-back")?(o.target.closest(".sm-overflow-back").parentElement.classList.remove("sm-show"),void document.querySelector(".sm-overflow-buttons").classList.remove("sm-hide")):void(o.target.closest(".sm-overflow-button")?document.querySelector(".sm-overflow-menu").classList.toggle("sm-show"):"A"===o.target.tagName&&o.target.closest(".sm-overflow-menu")||document.querySelector(".sm-overflow-menu").classList.contains("sm-show")&&(o.preventDefault(),document.querySelector(".sm-overflow-menu").classList.remove("sm-show")));e("light")}}function r(e){"Escape"===e.code&&document.querySelector("[class*=show]")}document.body.addEventListener("click",o),function(){const e=document.querySelectorAll(".sm-dark-mode, .sm-light-mode");window.CSS&&CSS.supports("color","var(--primary)")||e.forEach((e=>{e.style.display="none"}))}(),function(){const e=document.querySelector(".sm-pagination");if(!e)return;const t=function(e){return/page/.test(e)?e.split("page")[0]:e}(window.location.pathname),{pages:s,page:o,prev:r,next:n}=e.dataset,a=document.createElement("a");a.innerHTML='<svg aria-hidden="true"><use href="#sm-left-arrow-icon"></use></svg>',a.classList.add("sm-circle-icon-button"),r?(a.setAttribute("aria-label","previous posts"),a.setAttribute("href",r)):a.setAttribute("disabled","true"),e.append(a);for(let r=0;r<s;r+=1){let s;s=0===r&&"/"===t?"/":0===r&&"/"!==t?t:`${t}page/${r+1}/`;const n=document.createElement("div");n.classList.add("sm-pagination-item");const a=document.createElement("a");a.setAttribute("href",s),a.textContent=r+1,+o===r+1&&n.classList.add("sm-current"),n.append(a),e.append(n)}const i=document.createElement("a");i.innerHTML='<svg aria-hidden="true"><use href="#sm-right-arrow-icon"></use></svg>',i.classList.add("sm-circle-icon-button"),n?(i.setAttribute("aria-label","next posts"),i.setAttribute("href",n)):i.setAttribute("disabled","true"),e.append(i)}(),document.body.addEventListener("keyup",r),(new s).init()}();
//# sourceMappingURL=app.js.map
