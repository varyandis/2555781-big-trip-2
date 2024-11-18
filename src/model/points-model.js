import Observable from '../framework/observable.js';

export default class PointsModel extends Observable {
  #points = [];
  #tripApiService = null;
  #offers = [];
  #destinations = [];

  constructor({tripApiService}) {
    super();
    this.#tripApiService = tripApiService;
  }

  async init() {
    try {
      const points = await this.#tripApiService.points;
      this.#points = points.map(this.#adaptToClient);
    } catch(err) {
      this.#points = [];
    }

    try {
      this.#destinations = await this.#tripApiService.destinations;
    } catch(err) {
      this.#destinations = [];
    }

    try {
      this.#offers = await this.#tripApiService.offers;
    } catch(err) {
      this.#offers = [];
    }
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

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
