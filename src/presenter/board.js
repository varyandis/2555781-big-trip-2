import { render } from '../framework/render.js';
import EventsItemView from '../view/events-item-view.js';
import ListSortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import PointEditView from '../view/point-edit-view.js';
// import NewPointView from '../view/point-new-view.js';


export default class Board {
  #boardContainer = null;
  #pointsModel = null;

  #taskListComponent = new EventsListView();
  #boardPoints = [];

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.point];

    render(new ListSortView(), this.#boardContainer);
    render(this.#taskListComponent, this.#boardContainer);
    render(new PointEditView({point: this.#boardPoints[0]}), this.#taskListComponent.element);

    for (let i = 0; i < this.#boardPoints.length; i++) {
      render(new EventsItemView({point: this.#boardPoints[i]}), this.#taskListComponent.element);
    }

  }
}
