import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../const.js';

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.FUTURE]: 'There are no future events now',
  API_ERROR: 'Failed to load latest route information'
};
const createNoPointTemplate = (filterType, API_ERROR) => {
  const noPointTextValue = NoPointsTextType[filterType];
  return `<section class="trip-events">
          <h2 class="visually-hidden">Trip events</h2>

          <p class="trip-events__msg">${API_ERROR ? NoPointsTextType.API_ERROR : noPointTextValue}</p>
        </section>`;
};

export default class NoPointView extends AbstractView {
  #filterType = null;
  #isApiError = false;

  constructor({filterType, isApiError}) {
    super();
    this.#filterType = filterType;
    this.#isApiError = isApiError;
  }

  get template() {
    return createNoPointTemplate(this.#filterType, this.#isApiError);
  }
}
