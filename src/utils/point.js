import PointsModel from '../model/points-model';
import dayjs from 'dayjs';


const pointsModel = new PointsModel();
const offers = pointsModel.offers;
const destination = pointsModel.destination;


const getListOffer = (typePoint) => offers.find((item) => item.type === typePoint);

const getListDestination = (id) => destination.find((item) => item.id === id);

const getDestinationName = (destinationName) => destination.find((index) => index.id === destinationName).name;

const isPointFuture = (dateFrom) => dateFrom && dayjs().isBefore(dayjs(dateFrom));

const isPointPresent = (dateFrom, dateTo) => {
  const now = dayjs();
  return dateFrom && dateTo && now.isAfter(dateFrom) && now.isBefore(dateTo);
};

const isPointPast = (dateTo) => dateTo && dayjs().isAfter(dateTo);


export { getListOffer, getListDestination,getDestinationName, isPointFuture, isPointPresent, isPointPast

};
