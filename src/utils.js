import dayjs from 'dayjs';
import PointsModel from './model/points-model.js';

const DATE_POINT_EDITE_FORMAT = 'DD/MM/YY HH:mm';
const TIME_FORMAT = 'HH:mm';
const DATE_EVENTS_ITEM_FORMAT = 'MMM DD';

const pointsModel = new PointsModel();
const offers = pointsModel.getOffers();
const destination = pointsModel.getDestination();

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

const humanizePointDueDateEdite = (dueDate) => dueDate ? dayjs(dueDate).format(DATE_POINT_EDITE_FORMAT) : '';

const humanizePointDueTime = (dueTime) => dueTime ? dayjs(dueTime).format(TIME_FORMAT) : '';

const humanizePointDueDateItem = (dueDate) => dueDate ? dayjs(dueDate).format(DATE_EVENTS_ITEM_FORMAT) : '';

const capitalizeFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const getListOffer = (typePoint) => offers.find((item) => item.type === typePoint);

const getListDestination = (id) => destination.find((item) => item.id === id);

const getDestinationName = (destinationName) => destination.find((index) => index.id === destinationName).name;

const isTruthy = (value) => value === null || value === '' || value.length === 0;

export {getRandomArrayElement, humanizePointDueDateEdite, humanizePointDueTime, humanizePointDueDateItem, capitalizeFirstLetter, getListOffer, getListDestination,isTruthy, getDestinationName

};
