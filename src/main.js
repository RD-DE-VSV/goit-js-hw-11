import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createGalleryCardTemplate } from './js/render-functions';
import { fetchPhotosByQuery } from './js/pixabay-api';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loader = document.querySelector('.loader');

let searchQuery = '';
let page = 1;
let perPage = 20;
let totalHits = 0;
let isLoading = false;

const gallery = new SimpleLightbox('.js-gallery a', {
  captionDelay: 300,
  captionsData: 'alt',
});

const onSearchFormSubmit = event => {
  event.preventDefault();
  
  searchQuery = event.currentTarget.elements.user_query.value.trim();
  if (searchQuery === '') {
    iziToast.error({
      message: 'Please enter your request',
      position: 'topRight',
    });
    return;
  }

  galleryEl.innerHTML = ''; // Clear previous results
  page = 1; // Reset page number
  totalHits = 0; // Reset total hits
  fetchImages();
};

const fetchImages = () => {
  if (isLoading) return;
  isLoading = true;
  loader.classList.remove('is-hidden');

  fetchPhotosByQuery(searchQuery, page, perPage)
    .then(data => {
      if (data.totalHits === 0) {
        iziToast.error({
          message: 'Sorry, there are no images matching your search query.',
          position: 'topRight',
        });
        return;
      }

      totalHits = data.totalHits;
      const galleryTemplate = data.hits.map(el => createGalleryCardTemplate(el)).join('');
      galleryEl.insertAdjacentHTML('beforeend', galleryTemplate);

      gallery.refresh();
      page += 1;
    })
    .catch(err => console.error(err))
    .finally(() => {
      loader.classList.add('is-hidden');
      isLoading = false;
    });
};

// Observe when the user scrolls near the bottom
const observer = new IntersectionObserver(entries => {
  const lastEntry = entries[0];
  if (lastEntry.isIntersecting && galleryEl.children.length < totalHits) {
    fetchImages();
  }
}, {
  root: null,
  rootMargin: '200px',
  threshold: 1.0,
});

// Attach observer to the gallery
observer.observe(document.querySelector('.js-gallery'));

// Event Listeners
searchFormEl.addEventListener('submit', onSearchFormSubmit);
