import { getRandomPoint } from '../mock/points.js';
import { mockOffers } from '../mock/offers.js';
import { mockDestination } from '../mock/destination.js';
import { POINTS_COUNT } from '../const.js';
import Observable from '../framework/observable.js';

export default class PointsModel extends Observable {
  #points = Array.from({length: POINTS_COUNT}, getRandomPoint);
  #tripApiService = null;
  #offers = mockOffers;
  #destinations = mockDestination;

  constructor({tripApiService}) {
    super();
    // console.log(pointsApiService)
    this.#tripApiService = tripApiService;

    this.#tripApiService.points.then((point) => {
      console.log(point);
      // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
      // а ещё на сервере используется snake_case, а у нас camelCase.
      // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
      // Есть вариант получше - паттерн "Адаптер"
    });
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
