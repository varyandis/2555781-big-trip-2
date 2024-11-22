import AbstractView from '../framework/view/abstract-view.js';


function generateTripValue (points, offers) {
console.log(points)
  let tripValue = 0;

  points.forEach((point) => {
    tripValue += point.basePrice;

    const currentOffersObject = offers.find((offer) => offer.type === point.type);

    point.offers.forEach((chosenOfferId) => {
      tripValue += currentOffersObject.offers.find((offer) => offer.id === chosenOfferId).price;
    });
  });

  return tripValue;
}

const createTripMainInfoTemplate = (points, offers) => {
  console.log(points)
  return (`<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

              <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value"></span>
            </p>
          </section>`);
};
export default class TripMainInfoView extends AbstractView {
  #points = [];
  #destinations = [];
  #offers = [];

  constructor({point, destination, offers}) {
    super();

    this.#points = point;
    this.#destinations = destination;
    this.#offers = offers;

  }

  get template() {

    return createTripMainInfoTemplate(this.#points, this.#destinations, this.#offers);
  }
}
