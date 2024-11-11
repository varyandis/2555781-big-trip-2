import { render} from '../framework/render.js';
import ListSortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point.js';
import { SortType } from '../const.js';
import { sortDay, sortTime, sortDate } from '../utils/point.js';

export default class Board {
  #boardContainer = null;
  #pointsModel = null;

  #pointListComponent = new EventsListView();
  #sortComponent = null;
  #noPointComponent = new NoPointView();
  #pointPresenter = new Map();
  #currentSortType = SortType.DAY;

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.PRICE:
        return [...this.#pointsModel.point].sort(sortDay);
      case SortType.TIME:
        return [...this.#pointsModel.point].sort(sortTime);
    }
    return this.#pointsModel.point;
  }

  get offers() {
    return this.#pointsModel.offers;
  }

  get destination() {
    return this.#pointsModel.destination;
  }

  init() {
    this.#renderBoard();
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
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

    for (let i = 0; i < this.points.length; i++) {
      this.#renderPoint(this.points[i], this.offers, this.destination);
    }
  }

  #renderBoard() {
    if (this.points.length === 0) {
      this.#renderNoPoint();
    }
    this.points.sort(sortDate);
    this.#renderSort();
    this.#renderPointList();
  }

  #renderPoint(point, offers, destination) {
    const pointPresenter = new PointPresenter({pointListContainer: this.#pointListComponent.element, onDataChange: this.#handleViewAction, onModeChange: this.#handleModeChange});
    pointPresenter.init(point, offers, destination);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #clearPointList() {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  };

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };
}
