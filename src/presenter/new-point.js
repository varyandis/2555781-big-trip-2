import {remove, render, RenderPosition} from '../framework/render.js';
import {UserAction, UpdateType} from '../const.js';
import PointEditView from '../view/point-edit-view.js';
import { FilterType } from '../const.js';
import NoPointView from '../view/no-point-view.js';
// import NewPointView from '../view/point-new-view.js';

export default class NewPointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #offers = null;
  #destination = null;
  #point = null;
  #boardContainer = null;
  #pointsModel = null
  #noPointComponent = null;

  #pointEditComponent = null;

  constructor({pointListContainer, onDataChange, onDestroy, pointsModel, boardContainer}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#pointsModel = pointsModel;
    this.#boardContainer = boardContainer;
  }

  init(offers, destination, point) {
    if (this.#pointEditComponent !== null) {
      return;
    }
    this.#point = point;
    this.#offers = offers;
    this.#destination = destination;

    this.#pointEditComponent = new PointEditView({
      point: this.#point,
      offers: this.#offers,
      destination: this.#destination,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
    });

    render(this.#pointEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointsModel.point.length === 0) {
      this.#noPointComponent = new NoPointView({
        filterType: FilterType.EVERYTHING,
        isApiError: this.#pointsModel.isApiError});
      render(this.#noPointComponent, this.#boardContainer);
    }

    if (this.#pointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);

  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(UserAction.ADD_POINT, UpdateType.MINOR, point);
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

  setSaving() {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  }
}
