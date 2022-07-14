// Импорты
import axios from 'axios';

export default class fetchingAPI {
  constructor() {
    this.API_KEY = '28624819-d410dfb7aeeef29a0be5ef4eb';
    this.BASIC_URL = 'https://pixabay.com/api/';
    this.page = 1;
    this.maxPage = 0;
    this.searchParams = new URLSearchParams({
      key: this.API_KEY,
      q: '',
      per_page: 40,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
    });
  }

  fetchImage() {
    return axios
      .get(`${this.BASIC_URL}?page=${this.page}&${this.searchParams}`)
      .then(({ data }) => {
        this.incrementPage();
        return data.hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }
}
