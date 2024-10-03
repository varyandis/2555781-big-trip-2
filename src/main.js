import {render, RenderPosition} from './render.js';
import TripMainInfoView from './view/info-view.js';
import TripFiltersView from './view/filters-view.js';
import ListSortView from './view/sort-view.js';
import EventsListView from './view/events-list-view.js';
import EventsItemView from './view/events-item.js';
import PointEditView from './view/point-edit-view.js';
import NewPointView from './view/point-new-view.js';

const siteHeaderElement = document.querySelector('.trip-main');
const siteHeaderFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');

const siteMainElement = document.querySelector('.page-main');
const siteMainSortElement = siteMainElement.querySelector('.page-body__container');

// const siteHeaderElement = siteMainElement.querySelector('.trip-events');

// render(new MessageView(), siteHeaderElement);
render(new TripMainInfoView(), siteHeaderElement, RenderPosition.AFTERBEGIN);
render(new TripFiltersView(), siteHeaderFiltersElement, RenderPosition.AFTERBEGIN);
render(new ListSortView(), siteMainSortElement);
render(new EventsListView(), siteMainSortElement);

const siteMainItemElement = siteMainElement.querySelector('.trip-events__list');

render(new PointEditView(), siteMainItemElement);

render(new NewPointView(), siteMainItemElement);

render(new EventsItemView(), siteMainItemElement);
render(new EventsItemView(), siteMainItemElement);
render(new EventsItemView(), siteMainItemElement);


