
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
    const destination = this.#pointsModel.destination;
    const offers = this.#pointsModel.offers;

    // const shouldComponentRender = points.length > 0 && destination.length > 0 && offers.length > 0;

    this.#tripInfoComponent = new TripMainInfoView({
      points,
      destination,
      offers
    });

    if (prevTripInfoComponent === null) {
      render(this.#tripInfoComponent, this.#tripInfoContainerElement, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };
}
