
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
    const points = this.#pointsModel.point;
    const destinations = this.#pointsModel.destination;
    const offers = this.#pointsModel.offers;
console.log(offers)
    this.#tripInfoComponent = new TripMainInfoView({
      points,
      destinations,
      offers
    });

    if (prevTripInfoComponent === null) {
      render(this.#tripInfoComponent, this.#tripInfoContainerElement, RenderPosition.AFTERBEGIN);
      this.#componentDidRender = true;
      return;
    }

    if (this.#componentDidRender) {
      replace(this.#tripInfoComponent, prevTripInfoComponent);
    } else if (shouldComponentRender) {
      render(this.#tripInfoComponent, this.#tripInfoContainerElement, RenderPosition.AFTERBEGIN);
    }

    remove(prevTripInfoComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };
}
