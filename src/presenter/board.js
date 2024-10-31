import { render} from '../framework/render.js';
import ListSortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point.js';
import { updateItem } from '../utils/common.js';
import { SortType } from '../const.js';
import { sortDay, sortTime, sortDate } from '../utils/point.js';

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
  #currentSortType = SortType.DAY;
  #sourcedBoardPoints = [];

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.point];
    this.#boardOffers = [...this.#pointsModel.offers];
    this.#boardDestination = [...this.#pointsModel.destination];

    this.#sourcedBoardPoints = [...this.#pointsModel.point];
    this.#renderBoard();
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointList();
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

    // this.#boardPoints.sort(sortDate);

    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i], this.#boardOffers, this.#boardDestination);
    }
  }

  #renderBoard() {
    // render(this.#pointListComponent, this.#boardContainer);
    if (this.#boardPoints.length === 0) {
      this.#renderNoPoint();
    }
    this.#boardPoints.sort(sortDate);
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
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint, this.#boardOffers, this.#boardDestination);
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        this.#boardPoints.sort(sortDay);
        break;
      case SortType.TIME:
        this.#boardPoints.sort(sortTime);
        break;
      default:
        this.#boardPoints = this.#boardPoints.sort(sortDate);
    }
    this.#currentSortType = sortType;
  }

}
