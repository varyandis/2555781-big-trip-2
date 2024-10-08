import { getRandomArrayElement } from '../utils.js';
// import { EVENTTYPE } from '../const.js';

const mockEvents = [
  {
    id: 'f1',
    basePrice: 1100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: '1',
    isFavorite: false,
    offers: [
      '31','32','33',
    ],
    type: 'taxi'
  },
  {
    id: 'f2',
    basePrice: 800,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: '2',
    isFavorite: false,
    offers: [
      '31','32','33',
    ],
    type: 'bus'
  },
  {
    id: 'f3',
    basePrice: 700,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: '3',
    isFavorite: false,
    offers: [
      '31','32','33',
    ],
    type: 'train'
  },
  {
    id: 'f4',
    basePrice: 600,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: '4',
    isFavorite: false,
    offers: [
      '31', '33',
    ],
    type: 'ship'
  },
  {
    id: 'f5',
    basePrice: 500,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: '5',
    isFavorite: false,
    offers: [
      '32','33',
    ],
    type: 'drive'
  },
  {
    id: 'f6',
    basePrice: 400,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: '6',
    isFavorite: false,
    offers: [
      '32',
    ],
    type: 'flight'
  },
  {
    id: 'f7',
    basePrice: 300,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: '7',
    isFavorite: false,
    offers: [
      '31','32','33',
    ],
    type: 'check-in'
  },
  {
    id: 'f8',
    basePrice: 200,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: '8',
    isFavorite: false,
    offers: [
      '31','32','33',
    ],
    type: 'sightseeing'
  },
  {
    id: 'f9',
    basePrice: 100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: '9',
    isFavorite: false,
    offers: [
      '31', '33',
    ],
    type: 'restaurant'
  },
];

const getRandomEvents = () => getRandomArrayElement(mockEvents);

export {mockEvents, getRandomEvents};
