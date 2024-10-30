import { render} from '../framework/render.js';
import ListSortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point.js';
import { updateItem } from '../utils/common.js';

export default class Board {
  #boardContainer = null;
  #pointsModel = null;

  #pointListComponent = new EventsListView();
  #sortComponent = null;
  #noPointComponent = new NoPointView();
  #boardPoints = [];
  #boardOffers = [];
  #boardDestination = [];
  #pointPresenter = new Map();

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

  #handleSortTypeChange = (sortType) => {
    // - Сортируем задачи
    // - Очищаем список
    // - Рендерим список заново
  };


  #renderSort() {
    this.#sortComponent = new ListSortView({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#boardContainer);
  }

  #renderNoPoint() {
    render(this.#noPointComponent, this.#boardContainer);
  }

  #renderPointList() {

    render(this.#pointListComponent, this.#boardContainer);

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
    const pointPresenter = new PointPresenter({pointListContainer: this.#pointListComponent.element, onDataChange: this.#handlePointChange, onModeChange: this.#handleModeChange});
    pointPresenter.init(point, offers, destination);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #clearPointList() {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint, this.#boardOffers, this.#boardDestination);
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

}
