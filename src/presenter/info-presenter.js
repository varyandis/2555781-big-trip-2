
import {remove, render, RenderPosition, replace} from '../framework/render';
import TripMainInfoView from '../view/info-view';

export default class TripInfoPresenter {
  #tripInfoContainerElement = null;
  #pointsModel = null;

  #tripInfoComponent = null;
  #componentDidRender = false;

  constructor({tripInfoContainerElement, pointsModel}) {
    this.#tripInfoContainerElement = tripInfoContainerElement;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);

  }

  init() {
    const prevTripInfoComponent = this.#tripInfoComponent;
    const point = this.#pointsModel.point;
    const destination = this.#pointsModel.destination;
    const offers = this.#pointsModel.offers;
    this.#tripInfoComponent = new TripMainInfoView({
      point,
      destination,
      offers
    });

    if (prevTripInfoComponent === null) {
      render(this.#tripInfoComponent, this.#tripInfoContainerElement, RenderPosition.AFTERBEGIN);
      this.#componentDidRender = true;
      return;
    }

    if (this.#componentDidRender) {
      replace(this.#tripInfoComponent, prevTripInfoComponent);
    }

    remove(prevTripInfoComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };
}
