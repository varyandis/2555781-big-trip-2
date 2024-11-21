import he from 'he';
import { getListOffer, getListDestination, getDestinationName } from '../utils/point.js';
import { isTruthy } from '../utils/common.js';
import { capitalizeFirstLetter } from '../utils/common.js';
import { EVENT_TYPE } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizePointDueDateEdite } from '../utils/date.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: '',
  dateTo: '',
  destination: '',
  isFavorite: false,
  offers: [],
  type: 'flight',
};

const ResetButtonTitle = {
  CANCEL: 'Cancel',
  DELETE: 'Delete',
  DELETING: 'Deleting...'
};

const createOffersTemplate = (offers, type, offerList, isDisabled) => {
  const listOffer = getListOffer(type, offerList);
  if (isTruthy(listOffer)) {
    return '';
  }

  return `<section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    <div class="event__available-offers">
                    ${listOffer.map(({id, title, price}) => `<div class="event__offer-selector"><input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${id}" type="checkbox" name="event-offer-${type}" ${(offers.includes(id)) ? 'checked' : ''} data-selected-offers="${id}" ${isDisabled ? 'disabled' : ''}>
            <label class="event__offer-label" for="event-offer-${type}-${id}">
                <span class="event__offer-title">${title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${price}</span>
            </label> </div>`
  ).join('')}</div>
          </section>`;
};


const createDestinationTemplate = (destination, destinationList) => {
  const destinationPoint = getListDestination(destination, destinationList);

  if (isTruthy(destination) || !destinationPoint.description) {
    return '';
  }

  const pictures = destinationPoint.pictures;

  return (
    `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destinationPoint.description}</p>
${(pictures.length === 0) ? '' : `<div class="event__photos-container">
          <div class="event__photos-tape">
            ${pictures.map(({src, description}) => `<img class="event__photo" src="${src}" alt="${description}">`).join('')}
          </div>
        </div>`}

      </section>`
  );
};

const createDestinationListTemplate = (destinationList) => destinationList.map(({name}) => `<option value="${name}"></option>`);

const createEventTypeItem = (id, typePoint, isDisabled) => EVENT_TYPE.map((type) => `<div class="event__type-item">
                          <input id="event-type-${type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${(type === typePoint) ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
                          <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${id}">${he.encode(capitalizeFirstLetter(type))}</label>
                        </div> `).join('');

const createResetButton = (id, isDeleting) => {
  if (!id) {
    return (`<button class="event__reset-btn" type="reset">${ResetButtonTitle.CANCEL}</button>`);
  }
  return `<button class="event__reset-btn" type="reset">${isDeleting ? 'Deleting...' : 'Delete'}</button>`;
};

const createPointEditTemplate = (point, offerList, destinationList) => {
  const {basePrice, dateFrom, dateTo, destination, id, type, offers, isDisabled, isSaving, isDeleting} = point;
  const dateFromHumanize = humanizePointDueDateEdite(dateFrom);
  const dateToHumanize = humanizePointDueDateEdite(dateTo);

  return (
    `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox" ${isDisabled ? 'disabled' : ''}>

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        ${createEventTypeItem(id, type, isDisabled)}

                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-${id}">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${(!destination) ? '' : getDestinationName(destination, destinationList)}" list="destination-list-${id}" ${isDisabled ? 'disabled' : ''}>
                    <datalist id="destination-list-${id}">${createDestinationListTemplate(destinationList)}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-${id}">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${dateFromHumanize}" ${isDisabled ? 'disabled' : ''}>
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-${id}">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${dateToHumanize}" ${isDisabled ? 'disabled' : ''}>
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-${id}">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}" type="number" ${isDisabled ? 'disabled' : ''}>
                  </div>
                  <button class="event__save-btn  btn  btn--blue" type="submit">${isSaving ? 'Saving...' : 'Save'}</button>
                  ${createResetButton(id, isDeleting)}
                  ${(point.id) ? (`<button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>`) : ''}
                </header>
                <section class="event__details">
                  ${createOffersTemplate(offers, type, offerList, isDisabled)}

                  ${createDestinationTemplate(destination, destinationList)}
                </section>
              </form>
              </li>`
  );
};

export default class PointEditView extends AbstractStatefulView {
  #offers = null;
  #destination = null;
  #handleFormSubmit = null;
  #handleDeleteClick = null;
  #initialPoint = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #isNew = true;
  #handleCloseButtonClick = null;

  constructor({point = BLANK_POINT, offers, destination, onFormSubmit, onDeleteClick, onCloseButtonClick}) {
    super();

    this._setState(PointEditView.parsePointToState(point, destination));
    this.#offers = offers;
    this.#destination = destination;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;
    this.#initialPoint = point;
    this.#handleCloseButtonClick = onCloseButtonClick;
    this._restoreHandlers();
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }
    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }


  _restoreHandlers() {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('.event__rollup-btn')
      ?.addEventListener('click', this.#handleCloseButtonClick);

    this.element.querySelector('.event__type-group').addEventListener('click', this.#selectedTypeHandler);

    this.element.querySelector('.event__input--destination').addEventListener('input', this.#selectedDestinationHandler);
    this.element.querySelector('.event__input--destination').addEventListener('blur', this.#destinationBlurHandler);

    this.element.querySelector('.event__section--offers')?.addEventListener('change', this.#selectedOffersHandler);

    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);

    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceChangeHandler);

    this.#setDatepicker();
  }

  get template() {
    return createPointEditTemplate(this._state, this.#offers, this.#destination, this.#isNew);
  }

  #selectedTypeHandler = (evt) => {
    if (evt.target.classList.contains('event__type-input')) {
      this.updateElement({
        type: evt.target.value,
        offers: []
      });
    }
  };

  #priceChangeHandler = (evt) => {
    const price = Number(evt.target.value);
    if (!isNaN(price) && price >= 0) {
      this._setState({
        basePrice: price
      });
    } else {
      evt.target.value = this._state.basePrice;
    }
  };

  #selectedOffersHandler = (evt) => {
    const offerId = evt.target.dataset.selectedOffers;
    const isSelected = evt.target.checked;

    this._setState({
      offers: isSelected ? [...this._state.offers, offerId] : this._state.offers.filter((id) => id !== offerId)
    });
  };

  #destinationBlurHandler = (evt) => {
    const currentDestination = this.#destination.find((destination) => destination.id === this._state.destination);
    if (currentDestination) {
      evt.target.value = currentDestination.name;
    }

  };

  #selectedDestinationHandler = (evt) => {
    const nextDestination = this.#destination.find((destination) => destination.name === evt.target.value);
    if (nextDestination) {
      this.updateElement({
        destination: nextDestination.id,
      });
    }
  };

  #dueDateChangeHandlerFrom = ([userDate]) => {
    this._setState({
      dateFrom: userDate,
    });
    this.#datepickerTo.set('minDate');
  };

  #dueDateChangeHandlerTo = ([userDate]) => {
    this._setState({
      dateTo: userDate,
    });
    this.#datepickerFrom.set('maxDate');
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointEditView.parseStateToPoint(this._state, this.#destination));
  };

  #formEscHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this.#initialPoint, this.#destination);

  };

  #setDatepicker() {

    this.#datepickerTo = flatpickr(
      this.element.querySelector('input[name="event-start-time"]'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        maxDate: this._state.dateTo,
        defaultDate: this._state.dateFrom,
        onChange: this.#dueDateChangeHandlerFrom,
      }
    );

    this.#datepickerFrom = flatpickr(
      this.element.querySelector('input[name="event-end-time"]'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        minDate: this._state.dateFrom,
        defaultDate: this._state.dateTo,
        onChange: this.#dueDateChangeHandlerTo,
      }
    );
  }

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(PointEditView.parseStateToPoint(this._state, this.#destination));
  };

  static parsePointToState(point) {
    return {...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }

}
