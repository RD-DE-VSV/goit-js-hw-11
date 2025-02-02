export const createGalleryCardTemplate = imgInfo => {
  return `<li class="gallery-card">
            <article class="card">
            <a class="gallery-link" href="${imgInfo.largeImageURL}" target="_blank" rel="noopener noreferrer">
              <img class="gallery-img" src="${imgInfo.webformatURL}" alt="${imgInfo.tags}" />
            </a>
            <div class="gallery-container">
              <div class="gallery-item">
                <p class="gallery-title">Likes</p>
                <p class="gallery-count">${imgInfo.likes}</p>
              </div>
              <div class="gallery-item">
                <p class="gallery-title">Views</p>
                <p class="gallery-count">${imgInfo.views}</p>
              </div>
              <div class="gallery-item">
                <p class="gallery-title">Comments</p>
                <p class="gallery-count">${imgInfo.comments}</p>
              </div>
              <div class="gallery-item">
                <p class="gallery-title">Downloads</p>
                <p class="gallery-count">${imgInfo.downloads}</p>
              </div>
            </div>
          </article>
        </li>`;
};