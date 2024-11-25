import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const getOffersByType = (typePoint, offers) => offers.find((item) => item.type === typePoint).offers;

const getDestinationById = (id, destinationList) => destinationList.find((item) => item.id === id);

const getDestinationNameById = (destinationId, destinationList) => destinationList.find((index) => index.id === destinationId).name;

const getDestinationByName = (destinationName, destinationList) => destinationList.find((index) => index.name === destinationName);

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

  const totalMinutes = Math.floor(diffInMs / 1000 / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;

  if (totalDays > 0) {
    return `${String(totalDays).padStart(2, '0')}D ${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
  } else if (totalHours > 0) {
    return `${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
  } else {
    return `${String(totalMinutes).padStart(2, '0')}M`;
  }
};

const sortDay = (a, b) => b.basePrice - a.basePrice;

const sortDate = (a, b) => new Date(a.dateFrom) - new Date(b.dateFrom);

const sortTime = (a, b) => new Date(a.dateFrom) - new Date(a.dateTo) - (new Date(b.dateFrom) - new Date(b.dateTo));


export { getOffersByType,
  getDestinationById,
  getDestinationNameById,
  getDestinationByName,
  isPointFuture,
  isPointPresent,
  isPointPast,
  sortDay,
  getTimeDifference,
  sortTime,
  sortDate};

