import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class PointsModel extends Observable {
  #points = [];
  #tripApiService = null;
  #offers = [];
  #destinations = [];
  #isApiError = false;


  constructor({tripApiService}) {
    super();
    this.#tripApiService = tripApiService;
  }

  async init() {
    try {
      const points = await this.#tripApiService.points;
      this.#points = points.map(this.#adaptToClient);
      this.#destinations = await this.#tripApiService.destinations;
      this.#offers = await this.#tripApiService.offers;
    } catch(err) {
      this.#points = [];
      this.#destinations = [];
      this.#offers = [];
      this.#isApiError = true;
    }

    this._notify(UpdateType.INIT);
  }

  #adaptToClient(point) {
    const adaptedPoint = {...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'],
      dateTo: point['date_to'],
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  get isApiError() {
    return this.#isApiError;
  }

  async updatePoint(updateType, update) {
    const index = this.#findPointIndex(update.id);

    if (index === -1) {
      throw new Error('Cannot update: Point not found');
    }

    try {
      const response = await this.#tripApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);
      this.#replacePoint(index, updatedPoint);
      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Cannot update point');
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#tripApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    } catch(err) {
      throw new Error('Cannot add point');
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#findPointIndex(update.id);

    if (index === -1) {
      throw new Error('Cannot delete: Point not found');
    }

    try {
      await this.#tripApiService.deletePoint(update);
      this.#removePoint(index);
      this._notify(updateType);
    } catch(err) {
      throw new Error('Cannot delete point');
    }
  }

  #findPointIndex(id) {
    return this.#points.findIndex((point) => point.id === id);
  }

  #replacePoint(index, updatedPoint) {
    this.#points = [
      ...this.#points.slice(0, index),
      updatedPoint,
      ...this.#points.slice(index + 1),
    ];
  }

  #removePoint(index) {
    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];
  }
}
