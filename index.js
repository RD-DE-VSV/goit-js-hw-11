import{S as m,i as p}from"./assets/vendor-5ObWk2rO.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function l(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerPolicy&&(t.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?t.credentials="include":r.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(r){if(r.ep)return;r.ep=!0;const t=l(r);fetch(r.href,t)}})();const h=e=>`<li class="gallery-card">
            <article class="card">
            <a class="gallery-link" href="${e.largeImageURL}" target="_blank" rel="noopener noreferrer">
              <img class="gallery-img" src="${e.webformatURL}" alt="${e.tags}" />
            </a>
            <div class="gallery-container">
              <div class="gallery-item">
                <p class="gallery-title">Likes</p>
                <p class="gallery-count">${e.likes}</p>
              </div>
              <div class="gallery-item">
                <p class="gallery-title">Views</p>
                <p class="gallery-count">${e.views}</p>
              </div>
              <div class="gallery-item">
                <p class="gallery-title">Comments</p>
                <p class="gallery-count">${e.comments}</p>
              </div>
              <div class="gallery-item">
                <p class="gallery-title">Downloads</p>
                <p class="gallery-count">${e.downloads}</p>
              </div>
            </div>
          </article>
        </li>`,f=(e,s=1,l=20)=>{const a=new URLSearchParams({q:e,key:"48600448-a8625b0ee752919c612468958",image_type:"photo",orientation:"horizontal",safesearch:"true",page:s,per_page:l});return fetch(`https://pixabay.com/api/?${a}`).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()})},v=document.querySelector(".js-search-form"),u=document.querySelector(".js-gallery"),y=document.querySelector(".loader");let c="",n=1,L=20,d=0,i=!1;const b=new m(".js-gallery a",{captionDelay:300,captionsData:"alt"}),w=e=>{if(e.preventDefault(),c=e.currentTarget.elements.user_query.value.trim(),c===""){p.error({message:"Please enter your request",position:"topRight"});return}u.innerHTML="",n=1,d=0,g()},g=()=>{i||(i=!0,y.classList.remove("is-hidden"),f(c,n,L).then(e=>{if(e.totalHits===0){p.error({message:"Sorry, there are no images matching your search query.",position:"topRight"});return}d=e.totalHits;const s=e.hits.map(l=>h(l)).join("");u.insertAdjacentHTML("beforeend",s),b.refresh(),n+=1}).catch(e=>console.error(e)).finally(()=>{y.classList.add("is-hidden"),i=!1}))},S=new IntersectionObserver(e=>{e[0].isIntersecting&&u.children.length<d&&g()},{root:null,rootMargin:"200px",threshold:1});S.observe(document.querySelector(".js-gallery"));v.addEventListener("submit",w);
//# sourceMappingURL=index.js.map
