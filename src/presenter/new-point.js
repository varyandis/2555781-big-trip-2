import {remove, render, RenderPosition} from '../framework/render.js';
import {UserAction, UpdateType} from '../const.js';

import NewPointView from '../view/point-new-view.js';

const BLANK_POINT = {
  basePrice: 1100,
  dateFrom: '',
  dateTo: '',
  destination: '1',
  isFavorite: false,
  offers: [
    '31','32','33',
  ],
  type: 'flight'
};

export default class NewPointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #offers = null;
  #destination = null;
  #point = null;


  #pointEditComponent = null;

  constructor({pointListContainer, onDataChange, onDestroy}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init(offers, destination, point = BLANK_POINT) {
    if (this.#pointEditComponent !== null) {
      return;
    }
    this.#point = point;
    this.#offers = offers;
    this.#destination = destination;

    this.#pointEditComponent = new NewPointView({
      point: this.#point,
      offers: this.#offers,
      destination: this.#destination,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick
    });

    render(this.#pointEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    const generatedId = Math.random().toString(16).slice(2);
    const newPoint = {id: generatedId, ...point};

    this.#handleDataChange(UserAction.ADD_POINT, UpdateType.MINOR, newPoint);
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
