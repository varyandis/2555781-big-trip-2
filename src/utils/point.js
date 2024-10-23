import dayjs from 'dayjs';

const getListOffer = (typePoint, offers) => offers.find((item) => item.type === typePoint).offers;

const getListDestination = (id, destinationList) => destinationList.find((item) => item.id === id);

const getDestinationName = (destinationName, destinationList) => destinationList.find((index) => index.id === destinationName).name;

const isPointFuture = (dateFrom) => dateFrom && dayjs().isBefore(dayjs(dateFrom));

const isPointPresent = (dateFrom, dateTo) => {
  const now = dayjs();
  return dateFrom && dateTo && now.isAfter(dateFrom) && now.isBefore(dateTo);
};

const isPointPast = (dateTo) => dateTo && dayjs().isAfter(dateTo);


export { getListOffer, getListDestination,getDestinationName, isPointFuture, isPointPresent, isPointPast};

