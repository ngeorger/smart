"use strict";var gridContainers=document.querySelectorAll(".grid-container-home");gridContainers.forEach(function(e){var t=e.querySelectorAll(".card");e.classList.add("grid-container-home-".concat(t.length))}),document.body.onload=document.body.classList.add("animate");var smSearchBtn=document.querySelector(".navbar-mobile__search-btn"),lgSearchBtn=document.querySelector(".navbar__right-item--search"),hamburgerBtn=document.querySelector(".navbar-mobile__hamburger-btn"),mobileNavMenu=document.querySelector(".mobile-nav-menu"),searchModal=document.querySelector(".modal-search"),modalSearchCloseBtn=document.querySelector(".modal-search__close-btn"),btns=[smSearchBtn,lgSearchBtn,hamburgerBtn,modalSearchCloseBtn];btns.forEach(function(e){e.addEventListener("click",function(e){var t=e.currentTarget.dataset.target,n=document.getElementById(t);if("false"===n.getAttribute("aria-expanded"))return openMenu(n,t);closeMenu(n,t)})});var closeMenu=function(e,t){document.body.classList.remove("expanded-".concat(t)),e.setAttribute("aria-expanded","false"),e.setAttribute("aria-hidden","true")},openMenu=function(n,r){document.body.classList.add("expanded-".concat(r)),n.setAttribute("aria-expanded","true"),n.setAttribute("aria-hidden","false");document.body.addEventListener("keyup",function e(t){"Escape"===t.key&&(closeMenu(n,r),document.body.removeEventListener("keyup",e))})},lastKnownScrollPos=0,ticking=!1,progressBar=document.querySelector(".post-reading-progress"),shareBar=document.querySelector(".post-share-bar"),footer=document.querySelector(".footer"),buffer=50,postImg=null!==!document.querySelector(".post-img")?document.querySelector(".post-img"):document.querySelector(".no-post-img"),postContentHeight=document.querySelector(".post-content");function readingBarProgress(e){var t=Math.ceil(e/postContentHeight.clientHeight*100);progressBar.style.width="".concat(t,"%")}function shareBarAnimation(){postImg.getBoundingClientRect().bottom+buffer<shareBar.getBoundingClientRect().top&&shareBar.getBoundingClientRect().bottom<footer.getBoundingClientRect().top-buffer?(1024<window.innerWidth?shareBar.style.marginLeft="0":shareBar.style.marginBottom="0",shareBar.style.opacity="1"):(1024<window.innerWidth?shareBar.style.marginLeft="-200px":shareBar.style.marginBottom="-100px",shareBar.style.opacity="0")}null!==shareBar&&window.addEventListener("scroll",function(){lastKnownScrollPos=window.scrollY,ticking||(window.requestAnimationFrame(function(){shareBarAnimation(),null!==progressBar&&readingBarProgress(lastKnownScrollPos),ticking=!1}),ticking=!0)});var copyButton=document.getElementById("copy-button");copyButton&&copyButton.addEventListener("click",function(){var e=window.location.href,t=document.createElement("input");document.body.appendChild(t),t.value=e,t.select(),document.execCommand("copy"),document.body.removeChild(t)});var tables=document.querySelectorAll(".post-content > table");function tablePrepend(e){var t=document.createElement("div");t.setAttribute("style","width: 100%; overflow-x: auto; margin: 1em 0;"),e.parentNode.insertBefore(t,e),t.appendChild(e)}tables.forEach(function(e){return tablePrepend(e)});var builtIdx="";if("undefined"!=typeof SEARCH_API){var api=new GhostContentAPI({url:"".concat(window.location.protocol,"//").concat(window.location.host),key:SEARCH_API,version:"v2"});""===builtIdx&&(builtIdx=api.posts.browse({include:"tags,authors",formats:"plaintext",limit:"all"}).then(function(e){var t=lunr(function(){var t=this;this.ref("uuid"),this.field("plaintext"),this.field("title"),e.forEach(function(e){t.add(e)},this)});return localStorage.setItem("posts",JSON.stringify(e)),{posts:e,idx:t}}).catch(function(e){console.error(e)}))}var searchInput=document.querySelector(".modal-search__input"),searchBtn=document.querySelector(".modal-search__btn"),searchResultHeader=document.querySelector(".search-results__header"),searchResult=document.querySelector(".search-results__container");function searchPosts(n){searchResult.innerHTML="",builtIdx.then(function(e){var t=e.idx.search(n);1<t.length?searchResultHeader.textContent="".concat(t.length," Results"):0!==t.length?searchResultHeader.textContent="".concat(t.length," Result"):searchResultHeader.textContent="No results",t.forEach(function(r){e.posts.filter(function(e){if(e.uuid===r.ref){var t=new Date(e.published_at),n="".concat(["January","February","March","April","May","June","July","August","September","October","November","December"][t.getMonth()]," ").concat(t.getDate(),", ").concat(t.getFullYear());searchResult.innerHTML+='<article class="search-results__item"><p class="search-results__date">'.concat(n,'</p>\n          <a class="search-results__link" href="').concat(e.url,'">').concat(e.title,"</a></article>")}})})})}searchBtn.addEventListener("click",function(){""===searchInput.value?(searchResultHeader.textContent="Enter a search term",searchResult.innerHTML=""):searchPosts(searchInput.value)}),searchInput.addEventListener("keyup",function(e){""===searchInput.value?(searchResultHeader.textContent="Enter a search term",searchResult.innerHTML=""):13===e.keyCode&&searchPosts(searchInput.value)}),searchInput.addEventListener("focus",function(e){e.target.value=""});