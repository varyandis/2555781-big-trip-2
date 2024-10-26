import { render, replace } from '../framework/render.js';
import PointEditView from '../view/point-edit-view.js';
import EventsItemView from '../view/events-item-view.js';

export default class PointPresenter {

  #taskListContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;
  #offers = null;
  #destination = null;


  constructor({taskListContainer}) {
    this.#taskListContainer = taskListContainer;
  }

  init(point, offers, destination) {

    this.#point = point;
    this.#offers = offers;
    this.#destination = destination;
    this.#pointComponent = new EventsItemView({
      point: this.#point,
      offers: this.#offers,
      destination: this.#destination,
      onEditClick: this.#handleEditClick
    });

    this.#pointEditComponent = new PointEditView({
      point: this.#point,
      offers: this.#offers,
      destination: this.#destination,
      onFormSubmit: this.#handleFormSubmit
    });
    render(this.#pointComponent, this.#taskListContainer);

  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #replaceCardToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToCard() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }


  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToCard();
  };

}
