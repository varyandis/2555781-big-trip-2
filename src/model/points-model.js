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
// const a = this.#points.slice(0,1)
      // this.#points = a;
    } catch(err) {
      this.#points = [];
      this.#isApiError = true;
    }

    try {
      this.#destinations = await this.#tripApiService.destinations;
    } catch(err) {
      this.#destinations = [];
      this.#isApiError = true;
    }

    try {
      this.#offers = await this.#tripApiService.offers;
    } catch(err) {
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

  get point() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destination() {
    return this.#destinations;
  }

  get isApiError() {
    return this.#isApiError;
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    try {
      const response = await this.#tripApiService.updatePoint(update);
      const updatePoint = this.#adaptToClient(response);

      this.#points = [
        ...this.#points.slice(0, index),
        updatePoint,
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, updatePoint);
    } catch(err) {
      throw new Error('Can\'t update task');
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#tripApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);

      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    } catch(err) {
      throw new Error('Can\'t add point');
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#points.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    try {
      await this.#tripApiService.deletePoint(update);
      this.#points = [...this.#points.slice(0, index), ...this.#points.slice(index + 1)];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete point');
    }
  }
}
