import { getListOffer, getListDestination, getDestinationDescription } from '../utils/point.js';
import { isTruthy } from '../utils/common.js';
import { capitalizeFirstLetter } from '../utils/common.js';
import { EVENT_TYPE } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
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


const createDestinationTemplate = (destination, destinationList, selectedDestination) => {
  if (isTruthy(destination)) {
    return '';
  }

  const destinationPoint = getDestinationDescription(selectedDestination, destinationList);
  const descripton = destinationPoint.description;
  const pictures = destinationPoint.pictures;

  return (
    `<section class="event__details">
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${descripton}</p>

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

const createEventTypeItem = (id, typePoint) => EVENT_TYPE.map((type) => `<div class="event__type-item">
                          <input id="event-type-${type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${(type === typePoint) ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${id}">${capitalizeFirstLetter(type)}</label>
                        </div> `).join('');


const createPointEditTemplate = (point, offerList, destinationList) => {
  const {basePrice, dateFrom, dateTo, destination, id, selectedType, selectedOffers, selectedDestination} = point;
  const dateFromHumanize = humanizePointDueDateEdite(dateFrom);
  const dateToHumanize = humanizePointDueDateEdite(dateTo);


  return (
    `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${selectedType}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        ${createEventTypeItem(id, selectedType)}

                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-${id}">
                      ${selectedType}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${selectedDestination}" list="destination-list-${id}">
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

                    ${createOffersTemplate(selectedOffers, selectedType, offerList)}

                  ${createDestinationTemplate(destination, destinationList, selectedDestination)}
                </section>
              </form>
              </li>`
  );
};

export default class PointEditView extends AbstractStatefulView {
  #offers = null;
  #destination = null;
  #handleFormSubmit = null;

  constructor({point, offers, destination, onFormSubmit}) {
    super();
    this._setState(PointEditView.parsePointToState(point, destination));
    this.#offers = offers;
    this.#destination = destination;
    this.#handleFormSubmit = onFormSubmit;

    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#formSubmitHandler);

    this.element.querySelector('.event__type-group').addEventListener('click', this.#selectedTypeHandler);

    this.element.querySelector('.event__input--destination').addEventListener('change', this.#selectedDestinationHandler);
  }

  get template() {
    return createPointEditTemplate(this._state, this.#offers, this.#destination);
  }

  #selectedTypeHandler = (evt) => {
    if (evt.target.classList.contains('event__type-input')) {
      this.updateElement({
        selectedType: evt.target.value,
        selectedOffers: []
      });
    }
  };

  #selectedDestinationHandler = (evt) => {
    this.updateElement({
      selectedDestination: evt.target.value
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointEditView.parsePointToState(this._state, this.#destination));
  };

  static parsePointToState(point, destination) {
    return {...point,
      selectedType: point.type,
      selectedOffers: point.offers,
      selectedDestination: getListDestination(point.destination, destination).name
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};

    // delete point.selectedType;
    // delete task.isRepeating;

    return point;
  }

}
