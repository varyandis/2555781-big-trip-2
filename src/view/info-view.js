import AbstractView from '../framework/view/abstract-view.js';
import { getDestinationNameById } from '../utils/point.js';
import dayjs from 'dayjs';


const calculateTripDates = (points) => {
  if (points.length === 0) {
    return '';
  }

  const sortedPoints = points.slice().sort((a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom)));

  const tripStart = dayjs(sortedPoints[0].dateFrom).format('DD MMM');
  const tripEnd = dayjs(sortedPoints[sortedPoints.length - 1].dateTo).format('DD MMM');

  return `${tripStart}&nbsp;&mdash;&nbsp;${tripEnd}`;
};

function generateTripValue (points, offers) {
  let total = 0;

  points.forEach((point) => {
    total += point.basePrice;

    const currentOffersObject = offers.find((offer) => offer.type === point.type);

    point.offers.forEach((chosenOfferId) => {
      total += currentOffersObject.offers.find((offer) => offer.id === chosenOfferId).price;
    });
  });

  return total;
}

const createTemplateTitle = (points, destinationList) => {

  if (points.length === 0 || destinationList.length === 0) {
    return '';
  }

  const [titleBegin, titleMiddle, titleEnd] = [
    getDestinationNameById(points[0].destination, destinationList),
    points[1] ? getDestinationNameById(points[1].destination, destinationList) : '',
    getDestinationNameById(points[points.length - 1].destination, destinationList),
  ];

  switch (points.length) {
    case 1:
      return `<h1 class="trip-info__title">${titleBegin}</h1>`;
    case 2:
      return `<h1 class="trip-info__title">${titleBegin} &mdash; ${titleEnd}</h1>`;
    case 3:
      return `<h1 class="trip-info__title">${titleBegin} &mdash; ${titleMiddle} &mdash; ${titleEnd}</h1>`;
    default:
      return `<h1 class="trip-info__title">${titleBegin} &mdash; ... &mdash; ${titleEnd}</h1>`;
  }
};

const createTemplateCost = (points, offerList) => {
  if (points.length === 0) {
    return '';
  }
  return (`<p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${generateTripValue(points, offerList)}</span>
      </p>`);
};


const createTripMainInfoTemplate = (points, destinationList, offerList) => {

  const templateTitle = createTemplateTitle(points, destinationList);

  return (`<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
      ${templateTitle}
        <p class="trip-info__dates">${calculateTripDates(points)}</p>
      </div>
${createTemplateCost(points, offerList)}
    </section>`);
};

export default class TripMainInfoView extends AbstractView {
  #points = [];
  #destinations = [];
  #offers = [];

  constructor({points, destinations, offers}) {
    super();

    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;

  }

  get template() {
    return createTripMainInfoTemplate(this.#points, this.#destinations, this.#offers);
  }
}
