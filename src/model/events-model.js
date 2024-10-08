import { getRandomEvents } from '../mock/events.js';

export default class EventsModel {
  event = getRandomEvents();
  getEvent() {
    return this.event;
  }
}
