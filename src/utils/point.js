import PointsModel from '../model/points-model';


const pointsModel = new PointsModel();
const offers = pointsModel.offers;
const destination = pointsModel.destination;


const getListOffer = (typePoint) => offers.find((item) => item.type === typePoint);

const getListDestination = (id) => destination.find((item) => item.id === id);

const getDestinationName = (destinationName) => destination.find((index) => index.id === destinationName).name;


export { getListOffer, getListDestination,getDestinationName

};
