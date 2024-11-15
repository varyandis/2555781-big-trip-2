// import { createElement } from '../render.js';
import AbstractView from '../framework/view/abstract-view.js';
import { TYPE_SORT } from '../const.js';
import { capitalizeFirstLetter } from '../utils/common.js';

const createSortTemplate = (currentSortType) => TYPE_SORT.map((type) => `<div class="trip-sort__item  trip-sort__item--${type}">
                <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}" ${currentSortType === type ? 'checked' : ''} ${type === 'event' || type === 'offers' ? 'disabled' : ''}  data-sort-type="${type}">
                <label class="trip-sort__btn" for="sort-${type}">${capitalizeFirstLetter(type)}</label>
              </div>`).join('');


const createListSortTemplate = (currentSortType) => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
${createSortTemplate(currentSortType)}
</form>`;

export default class ListSortView extends AbstractView{
  #handleSortTypeChange = null;
  #currentSortType = null;

  constructor({currentSortType, onSortTypeChange}) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createListSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
