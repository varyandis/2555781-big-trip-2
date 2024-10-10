import dayjs from 'dayjs';
import { mockOffers } from './mock/offers.js';
import { mockDestination } from './mock/destination.js';

const DATE_POINT_EDITE_FORMAT = 'DD/MM/YY HH:mm';
const TIME_FORMAT = 'HH:mm';
const DATE_EVENTS_ITEM_FORMAT = 'MMM DD';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

const humanizePointDueDateEdite = (dueDate) => dueDate ? dayjs(dueDate).format(DATE_POINT_EDITE_FORMAT) : '';

const humanizePointDueTime = (dueTime) => dueTime ? dayjs(dueTime).format(TIME_FORMAT) : '';

const humanizePointDueDateItem = (dueDate) => dueDate ? dayjs(dueDate).format(DATE_EVENTS_ITEM_FORMAT) : '';

const capitalizeFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1);

// console.log(humanizeTaskDueDate('2019-07-10T22:55:56.845Z'))

const getListOffers = (typePoint) => mockOffers.find((item) => item.type === typePoint);

const getListDestination = (id) => mockDestination.find((item) => item.id === id);

const isTruthy = (value) => value === null || value === '';

export {getRandomArrayElement, humanizePointDueDateEdite, humanizePointDueTime, humanizePointDueDateItem, capitalizeFirstLetter, getListOffers, getListDestination,isTruthy

};
