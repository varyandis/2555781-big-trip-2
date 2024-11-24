import {remove, render, RenderPosition} from '../src/framework/render.js';
// import {render, RenderPosition} from './render.js';
import TripMainInfoView from './view/info-view.js';
// import FilterPresenter from './presenter/filter.js';
import NoPointView from './view/no-point-view.js';
import { FilterType } from './const.js';
import FilterPresenter from './presenter/filter.js';
import Board from './presenter/board.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import NewPointButtonView from './view/new-point-button-view.js';
import PointsApiService from './points-api-service.js';
import TripInfoPresenter from './presenter/info-presenter.js';

const AUTHORIZATION = `Basic ${Math.random().toString(16).slice(2)}`;
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';
const pointsModel = new PointsModel({
  tripApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const siteMainSortElement = document.querySelector('.trip-events');
const siteMainFiltersElement = document.querySelector('.trip-controls__filters');
const siteMainInfoElement = document.querySelector('.trip-main');

const filterModel = new FilterModel();
const boardPresenter = new Board({boardContainer: siteMainSortElement, pointsModel, filterModel, onNewPointDestroy: handleNewPointFormClose});
const filterPresenter = new FilterPresenter({
  filterContainer: siteMainFiltersElement,
  filterModel,
  pointsModel
});

const tripInfoPresenter = new TripInfoPresenter({
  tripInfoContainerElement: siteMainInfoElement,
  pointsModel
});

const noPoint = new NoPointView({
  filterType: FilterType.EVERYTHING,
  isApiError: pointsModel.isApiError});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
  if (pointsModel.point.length === 0) {

    render(noPoint, siteMainSortElement);
  }
}

function handleNewPointButtonClick() {
  boardPresenter.createPoint();
  remove(noPoint);
  newPointButtonComponent.element.disabled = true;
}

tripInfoPresenter.init();
filterPresenter.init();
boardPresenter.init();
pointsModel.init().finally(() => {
  render(newPointButtonComponent, siteMainInfoElement);
  if (pointsModel.isApiError) {
    newPointButtonComponent.element.disabled = true;
  }
});
