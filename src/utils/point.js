import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const MS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const ZERO_PAD = '0';
const TARGET_LENGTH = 2;

const getOffersByType = (typePoint, offers) => offers.find((item) => item.type === typePoint).offers;

const getDestinationById = (id, destinationsList) => destinationsList.find((item) => item.id === id);

const getDestinationNameById = (destinationId, destinationsList) => destinationsList.find((index) => index.id === destinationId).name;

const isPointFuture = (dateFrom) => dateFrom && dayjs().isBefore(dayjs(dateFrom));

const isPointPresent = (dateFrom, dateTo) => {
  const now = dayjs();
  return dateFrom && dateTo && now.isAfter(dateFrom) && now.isBefore(dateTo);
};

const isPointPast = (dateTo) => dateTo && dayjs().isAfter(dateTo);

const getTimeDifference = (dateFrom, dateTo) => {
  const start = new Date(dateFrom);
  const end = new Date(dateTo);

  const diffInMs = end - start;

  const totalMinutes = Math.floor(diffInMs / MS_IN_SECOND / SECONDS_IN_MINUTE);
  const totalHours = Math.floor(totalMinutes / MINUTES_IN_HOUR);
  const totalDays = Math.floor(totalHours / HOURS_IN_DAY);

  const hours = totalHours % HOURS_IN_DAY;
  const minutes = totalMinutes % MINUTES_IN_HOUR;

  if (totalDays > 0) {
    return `${String(totalDays).padStart(TARGET_LENGTH, ZERO_PAD)}D ${String(hours).padStart(TARGET_LENGTH, ZERO_PAD)}H ${String(minutes).padStart(TARGET_LENGTH, ZERO_PAD)}M`;
  } else if (totalHours > 0) {
    return `${String(hours).padStart(TARGET_LENGTH, ZERO_PAD)}H ${String(minutes).padStart(TARGET_LENGTH, ZERO_PAD)}M`;
  } else {
    return `${String(totalMinutes).padStart(TARGET_LENGTH, ZERO_PAD)}M`;
  }
};

const sortDay = (itemA, itemB) => itemB.basePrice - itemA.basePrice;

const sortDate = (itemA, itemB) => new Date(itemA.dateFrom) - new Date(itemB.dateFrom);

const sortTime = (itemA, itemB) => new Date(itemA.dateFrom) - new Date(itemA.dateTo) - (new Date(itemB.dateFrom) - new Date(itemB.dateTo));

export {
  getOffersByType,
  getDestinationById,
  getDestinationNameById,
  isPointFuture,
  isPointPresent,
  isPointPast,
  sortDay,
  getTimeDifference,
  sortTime,
  sortDate,
};
