import { createElement } from '../render.js';
import { humanizePointDueTime, humanizePointDueDateItem, capitalizeFirstLetter, getListOffer, getDestinationName } from '../utils.js';


const createSelectedOffersTemplate = (offers, type) => {
  const listOffer = getListOffer(type).offers;
  return listOffer.map(({id, title, price}) => `${(offers.includes(id)) ? `<ul class="event__selected-offers">
                  <li class="event__offer">
                    <span class="event__offer-title">${title}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${price}</span>
                  </li>
                </ul>` : ''}`
  ).join('');
};

const createEventsItemTemplate = (point) => {
  const {basePrice, dateFrom, dateTo, isFavorite, offers, type, destination} = point;

  const timeFromHumanize = humanizePointDueTime(dateFrom);
  const timeToHumanize = humanizePointDueTime(dateTo);
  const dateFromHumanize = humanizePointDueDateItem(dateFrom);
  const typePoint = capitalizeFirstLetter(type);
  const pointFavorite = isFavorite ? 'event__favorite-btn--active' : '';
  const namePoint = getDestinationName(destination);


  return (
    `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${dateFromHumanize}">${dateFromHumanize}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${typePoint} ${namePoint}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${timeFromHumanize}">${timeFromHumanize}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${timeToHumanize}">${timeToHumanize}</time>
                  </p>
                  <p class="event__duration">30M</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                ${createSelectedOffersTemplate(offers, type)}
                </ul>
                <button class="event__favorite-btn ${pointFavorite}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`);
};

export default class EventsItemView {
  constructor({point}) {
    this.point = point;
  }

  getTemplate() {
    return createEventsItemTemplate(this.point);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
