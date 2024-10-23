import AbstractView from '../framework/view/abstract-view.js';

const createNoPointTemplate = () => `<section class="trip-events">
          <h2 class="visually-hidden">Trip events</h2>

          <p class="trip-events__msg">Click New Event to create your first point</p>
        </section>`;

export default class NoPointView extends AbstractView {
  get template() {
    return createNoPointTemplate();
  }
}
