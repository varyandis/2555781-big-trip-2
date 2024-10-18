import { getRandomPoint } from '../mock/points.js';
import { mockOffers } from '../mock/offers.js';
import { mockDestination } from '../mock/destination.js';
import { POINTS_COUNT } from '../const.js';

export default class PointsModel {
  points = Array.from({length: POINTS_COUNT}, getRandomPoint);
  offers = mockOffers;
  destinations = mockDestination;

  getPoint() {
    return this.points;

  }

  getOffers() {
    return this.offers;
  }

  getDestination() {
    return this.destinations;
  }
}
