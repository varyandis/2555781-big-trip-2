import { render } from '../framework/render.js';
import EventsItemView from '../view/events-item-view.js';
import ListSortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import PointEditView from '../view/point-edit-view.js';
// import NewPointView from '../view/point-new-view.js';


export default class Board {
  taskListComponent = new EventsListView();

  constructor({boardContainer, pointsModel}) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    // console.log(this.pointsModel.getEvent())
    // console.log(this.pointsModel.getPoint())
    this.boardPoints = [...this.pointsModel.getPoint()];
    // console.log(this.boardPoints)
    // console.log(this.boardEvent)


    render(new ListSortView(), this.boardContainer);
    render(this.taskListComponent, this.boardContainer);
    // render(new PointEditView(), this.TaskListComponent.getElement());
    render(new PointEditView({point: this.boardPoints[0]}), this.taskListComponent.element);
    // render(new NewPointView(), this.TaskListComponent.getElement());

    for (let i = 0; i < this.boardPoints.length; i++) {
      render(new EventsItemView({point: this.boardPoints[i]}), this.taskListComponent.element);
    }

    // render(new EventsItemView(), this.TaskListComponent.getElement());
    // render(new EventsItemView(), this.TaskListComponent.getElement());
    // render(new EventsItemView(), this.TaskListComponent.getElement());
  }
}
