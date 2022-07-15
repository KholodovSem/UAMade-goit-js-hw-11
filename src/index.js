// Импорты
import fetchingAPI from './JS/fetchImage';
import createMarkupGallery from './JS/galleryCardTemplate';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Ссылки на объекты DOM
const refs = {
  form: document.querySelector('.search-form'),
  searchBtn: document.querySelector('.form__search-btn'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

// Переменные
const apiService = new fetchingAPI();

// Слушатель события
refs.form.addEventListener('submit', async e => {
  e.preventDefault();
  successNotification(apiService.searchParams.get('per_page'));

  const inputValue = e.target.elements.searchQuery.value;
  apiService.searchParams.set('q', inputValue);

  await apiService.fetchImage().then(data => {
    apiService.maxPage = Math.round(
      data.totalHits / apiService.searchParams.get('per_page')
    );

    if (apiService.page > apiService.maxPage) {
      return maxPageNotification();
    }

    if (apiService.searchParams.get('q') !== apiService.searchParams.get('q')) {
      refs.gallery.innerHTML = '';
      successNotification(apiService.searchParams.get('per_page'));
    }

    renderingMarkup(createMarkupGallery(data));
  });
  refs.loadMoreBtn.classList.add('visible');

  const gallery = new SimpleLightbox('.gallery a');
});

refs.loadMoreBtn.addEventListener('click', async () => {
  await apiService.fetchImage().then(data => {
    addedMoreImageCard(createMarkupGallery(data));
  });

  const gallery = new SimpleLightbox('.gallery a');
  gallery.refresh();
});

// Функции
function renderingMarkup(markup) {
  refs.gallery.innerHTML = markup;
}

function addedMoreImageCard(markup) {
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function maxPageNotification() {
  return Notiflix.Notify.info(
    "We're sorry, but you've reached the end of search results."
  );
}

function successNotification(totalHits) {
  return Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
}
