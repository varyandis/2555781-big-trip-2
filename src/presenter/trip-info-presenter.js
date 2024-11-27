
import {remove, render, RenderPosition, replace} from '../framework/render';
import TripMainInfoView from '../view/trip-main-info-view';

export default class TripInfoPresenter {
  #tripInfoContainerElement = null;
  #pointsModel = null;

  #tripInfoComponent = null;

  constructor({tripInfoContainerElement, pointsModel}) {
    this.#tripInfoContainerElement = tripInfoContainerElement;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);

  }

  init() {
    const prevTripInfoComponent = this.#tripInfoComponent;
    const points = this.#pointsModel.points;
    const destinations = this.#pointsModel.destinations;
    const offers = this.#pointsModel.offers;

    if (points.length !== 0) {
      this.#tripInfoComponent = new TripMainInfoView({
        points,
        destinations,
        offers
      });
    }

    if (prevTripInfoComponent === null) {
      if (points.length !== 0) {
        render(this.#tripInfoComponent, this.#tripInfoContainerElement, RenderPosition.AFTERBEGIN);
      }
      return;
    }

    if (points.length === 0) {
      remove(this.#tripInfoComponent);
      this.#tripInfoComponent = null;
    } else {
      replace(this.#tripInfoComponent, prevTripInfoComponent);
    }
    remove(prevTripInfoComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };
}
