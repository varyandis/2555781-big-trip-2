import { render, replace } from '../framework/render.js';
import EventsItemView from '../view/events-item-view.js';
import ListSortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import PointEditView from '../view/point-edit-view.js';
import NoPointView from '../view/no-point-view.js';

export default class Board {
  #boardContainer = null;
  #pointsModel = null;

  #taskListComponent = new EventsListView();
  #sortComponent = new ListSortView();
  #noPointComponent = new NoPointView();
  #boardPoints = [];
  #boardOffers = [];
  #boardDestination = [];

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.point];
    this.#boardOffers = [...this.#pointsModel.offers];
    this.#boardDestination = [...this.#pointsModel.destination];
    this.#renderBoard();
  }

  #renderSort() {
    render(this.#sortComponent, this.#boardContainer);
  }

  #renderNoPoint() {
    render(this.#noPointComponent, this.#boardContainer);
  }

  #renderPointList() {

    render(this.#taskListComponent, this.#boardContainer);

    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i], this.#boardOffers, this.#boardDestination);
    }
  }

  #renderBoard() {
    if (this.#boardPoints.length === 0) {
      this.#renderNoPoint();
    }

    this.#renderSort();

    this.#renderPointList();
  }

  #renderPoint(point, offers, destination) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new EventsItemView({point, offers, destination, onEditClick: () => {
      replaceCardToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    }});

    const pointEditComponent = new PointEditView({point, offers, destination,
      onFormSubmit: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
    });
    function replaceCardToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToCard() {
      replace(pointComponent, pointEditComponent);
    }
    render(pointComponent, this.#taskListComponent.element);
  }
}
