import {render, RenderPosition} from '../src/framework/render.js';
// import {render, RenderPosition} from './render.js';
import TripMainInfoView from './view/info-view.js';
// import FilterPresenter from './presenter/filter.js';
import FilterPresenter from './presenter/filter.js';
import Board from './presenter/board.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';

const siteMainSortElement = document.querySelector('.trip-events');
const siteMainFiltersElement = document.querySelector('.trip-controls__filters');
const siteMainInfoElement = document.querySelector('.trip-main');
const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const BoardPresenter = new Board({boardContainer: siteMainSortElement, pointsModel});
const filterPresenter = new FilterPresenter({
  filterContainer: siteMainFiltersElement,
  filterModel,
  pointsModel
});
// const filters = generateFilter(pointsModel.point);

render(new TripMainInfoView(), siteMainInfoElement , RenderPosition.AFTERBEGIN);
// render(new TripFiltersView({filters,
//   currentFilterType: 'aleverythingl',
//   onFilterTypeChange: () => {}}), siteMainFiltersElement , RenderPosition.AFTERBEGIN);


filterPresenter.init();
BoardPresenter.init();
