// import { createElement } from '../render.js';
import AbstractView from '../framework/view/abstract-view.js';
import { TYPE_SORT } from '../const.js';
import { capitalizeFirstLetter } from '../utils/common.js';

const createSortTemplate = () => TYPE_SORT.map((type, index) => `<div class="trip-sort__item  trip-sort__item--${type}">
                <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}" ${type === 'event' || type === 'offers' ? 'disabled' : ''} ${index === 0 ? 'checked' : ''} data-sort-type="${type}">
                <label class="trip-sort__btn" for="sort-${type}">${capitalizeFirstLetter(type)}</label>
              </div>`).join('');


const createListSortTemplate = () => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
${createSortTemplate()}
</form>`;

export default class ListSortView extends AbstractView{
  #handleSortTypeChange = null;

  constructor({onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createListSortTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
