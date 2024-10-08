import { getRandomPoints } from '../mock/points.js';
import { mockOffers } from '../mock/offers.js';
import { mockDestination } from '../mock/destination.js';

export default class PointsModel {
  points = getRandomPoints();
  offers = mockOffers;
  destinations = mockDestination;

  getPoint() {
    return this.points;
  }
}
