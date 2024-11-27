import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../const.js';

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.FUTURE]: 'There are no future events now',
  API_ERROR: 'Failed to load latest route information',
  LOADING: 'Loading...'
};
const createNoPointTemplate = (filterType, isApiError, isLoading) => {
  if (isLoading) {
    return `<p class="trip-events__msg">${NoPointsTextType.LOADING}</p>`;
  }
  if (isApiError) {
    return `<p class="trip-events__msg">${NoPointsTextType.API_ERROR}</p>`;
  }
  const noPointTextValue = NoPointsTextType[filterType];
  return `<p class="trip-events__msg">${noPointTextValue}</p>`;
};

export default class NoPointView extends AbstractView {
  #filterType = null;
  #isApiError = false;
  #isLoading = false;

  constructor({filterType, isApiError, isLoading}) {
    super();
    this.#filterType = filterType;
    this.#isApiError = isApiError;
    this.#isLoading = isLoading;
  }

  get template() {
    return createNoPointTemplate(this.#filterType, this.#isApiError, this.#isLoading);
  }
}
