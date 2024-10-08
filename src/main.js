import {render, RenderPosition} from './render.js';
import TripMainInfoView from './view/info-view.js';
import TripFiltersView from './view/filters-view.js';
import Board from './presenter/board.js';
import PointsModel from './model/events-model.js';

const siteMainSortElement = document.querySelector('.trip-events');
const siteMainFiltersElement = document.querySelector('.trip-controls__filters');
const siteMainInfoElement = document.querySelector('.trip-main');
const pointsModel = new PointsModel();

render(new TripMainInfoView(), siteMainInfoElement , RenderPosition.AFTERBEGIN);
render(new TripFiltersView(), siteMainFiltersElement , RenderPosition.AFTERBEGIN);

const BoardPresenter = new Board({boardContainer: siteMainSortElement, pointsModel});

BoardPresenter.init();
