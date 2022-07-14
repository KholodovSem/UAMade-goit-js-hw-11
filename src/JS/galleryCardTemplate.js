import handlebars from 'handlebars';

const source = `{{#each this}}
  <div class='photo-card'>
  <div class="thumb">
    <a href='{{largeImageURL}}'>
    <img
      src='{{webformatURL}}'
      alt='{{tags}}'
      loading='lazy'
    />
    </a>
    <div class='info'>
      <div class="info-wrapper">
      <p class='info-item'>
      Likes:      
      </p>
      <b class="value">{{likes}}</b>
      </div>
      <div class="info-wrapper">
      <p class='info-item'>
      Views:      
      </p>
      <b class="value">{{views}}</b>
      </div>
      <div class="info-wrapper">
      <p class='info-item'>
      Comments:      
      </p>
      <b class="value">{{comments}}</b>
      </div>
      <div class="info-wrapper">
      <p class='info-item'>
      Downloads:      
      </p>
      <b class="value">{{downloads}}</b>
      </div>
    </div>
    </div>
  </div>
{{/each}}`;
const template = handlebars.compile(source);

export default function createMarkupGallery(data) {
  return template(data);
}
