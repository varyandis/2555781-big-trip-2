import { getListOffer, getListDestination } from '../utils/point.js';
import { isTruthy } from '../utils/common.js';
import { capitalizeFirstLetter } from '../utils/common.js';
import { EVENT_TYPE } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
import { humanizePointDueDateEdite } from '../utils/date.js';

const createOffersTemplate = (offers, type, offerList) => {
  const listOffer = getListOffer(type, offerList);
  if (isTruthy(listOffer)) {
    return '';
  }

  return `<section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                    ${listOffer.map(({id, title, price}) => `<div class="event__offer-selector"><input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${id}" type="checkbox" name="event-offer-${type}" ${(offers.includes(id)) ? 'checked' : ''}>
            <label class="event__offer-label" for="event-offer-${type}-${id}">
                <span class="event__offer-title">${title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${price}</span>
            </label> </div>`
  ).join('')}</div>
          </section>`;
};


const createDestinationTemplate = (destination, destinationList) => {
  if (isTruthy(destination)) {
    return '';
  }

  const destinationPoint = getListDestination(destination, destinationList);
  const pictures = destinationPoint.pictures;
  return (
    `<section class="event__details">
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destinationPoint.description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${pictures.map(({src, description}) => `<img class="event__photo" src="${src}" alt="${description}">`).join('')}
          </div>
        </div>
      </section>
    </section>`
  );
};

const createDestinationListTemplate = (destinationList) => destinationList.map(({name}) => `<option value="${name}"></option>`);

const createEventTypeItem = (id) => EVENT_TYPE.map((type) => `<div class="event__type-item">
                          <input id="event-type-${type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${(type === 'flight') ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${id}">${capitalizeFirstLetter(type)}</label>
                        </div> `).join('');


const createPointEditTemplate = (point, offerList, destinationList) => {

  const {basePrice, dateFrom, dateTo, destination, id, offers, type} = point;
  const dateFromHumanize = humanizePointDueDateEdite(dateFrom);
  const dateToHumanize = humanizePointDueDateEdite(dateTo);
  const typePoint = capitalizeFirstLetter(type);

  return (
    `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${createEventTypeItem(id)}

                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-${id}">
                      ${typePoint}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="Chamonix" list="destination-list-${id}">
                    <datalist id="destination-list-${id}">${createDestinationListTemplate(destinationList)}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-${id}">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${dateFromHumanize}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-${id}">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${dateToHumanize}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-${id}">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}">
                  </div>
                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>

                    ${createOffersTemplate(offers, type, offerList)}

                  ${createDestinationTemplate(destination, destinationList)}
                </section>
              </form>
              </li>`
  );
};

export default class PointEditView extends AbstractView {
  #point = null;
  #offers = null;
  #destination = null;
  #handleFormSubmit = null;

  constructor({point, offers, destination, onFormSubmit}) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destination = destination;
    this.#handleFormSubmit = onFormSubmit;

    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#formSubmitHandler);
  }

  get template() {
    return createPointEditTemplate(this.#point, this.#offers, this.#destination);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };
}
