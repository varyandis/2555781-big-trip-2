import {remove, render, RenderPosition} from '../framework/render.js';
import {UserAction, UpdateType} from '../const.js';
import PointEditView from '../view/point-edit-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class NewPointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #offers = null;
  #destinations = null;

  #noPointComponent = null;

  #pointEditComponent = null;
  #mode = Mode.DEFAULT;

  constructor({pointListContainer, onDataChange, onDestroy, noPointComponent}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#noPointComponent = noPointComponent;
  }

  init(offers, destinations, pointListContainer) {
    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointListContainer = pointListContainer;
    this.#offers = offers;
    this.#destinations = destinations;

    this.#pointEditComponent = new PointEditView({
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
    });

    render(this.#pointEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }
    this.#handleDestroy(this.#noPointComponent);

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
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }

  }

  setAborting() {
    const resetFormState = () => {
      if (this.#mode === Mode.EDITING) {
        this.#pointEditComponent.updateElement({
          isDisabled: false,
          isSaving: false,
          isDeleting: false,
        });
      }
    };
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.shake(resetFormState);
    } else {
      this.#pointEditComponent.shake();
    }
  }
}
