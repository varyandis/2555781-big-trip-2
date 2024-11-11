import { getRandomPoint } from '../mock/points.js';
import { mockOffers } from '../mock/offers.js';
import { mockDestination } from '../mock/destination.js';
import { POINTS_COUNT } from '../const.js';
import Observable from '../framework/observable.js';

export default class PointsModel extends Observable {
  #points = Array.from({length: POINTS_COUNT}, getRandomPoint);
  #offers = mockOffers;
  #destinations = mockDestination;

  get point() {
    return this.#points;

  }

  get offers() {
    return this.#offers;
  }

  get destination() {
    return this.#destinations;
  }
}
