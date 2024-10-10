import { getRandomArrayElement } from '../utils.js';
// import { EVENTTYPE } from '../const.js';

const mockPoints = [
  {
    id: 'f1',
    basePrice: 1100,
    dateFrom: '2019-06-10T23:55:56.845Z',
    dateTo: '2019-07-11T23:23:13.375Z',
    destination: '1',
    isFavorite: true,
    offers: [
      '31','32','33',
    ],
    type: 'taxi'
  },
  {
    id: 'f2',
    basePrice: 800,
    dateFrom: '2018-05-10T19:55:56.845Z',
    dateTo: '2018-05-11T11:19:13.375Z',
    destination: '2',
    isFavorite: true,
    offers: [
      '31','32','33',
    ],
    type: 'bus'
  },
  {
    id: 'f3',
    basePrice: 700,
    dateFrom: '2017-01-10T20:55:56.845Z',
    dateTo: '2017-01-11T11:20:13.375Z',
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
    dateFrom: '2016-07-10T21:55:56.845Z',
    dateTo: '2016-07-11T11:21:13.375Z',
    destination: '4',
    isFavorite: true,
    offers: [
      '31', '33',
    ],
    type: 'ship'
  },
  {
    id: 'f5',
    basePrice: 500,
    dateFrom: '2015-12-10T18:55:56.845Z',
    dateTo: '2015-12-11T11:18:13.375Z',
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
    dateFrom: '2020-11-10T17:55:56.845Z',
    dateTo: '2020-11-11T11:17:13.375Z',
    destination: '6',
    isFavorite: true,
    offers: [
      '32',
    ],
    type: 'flight'
  },
  {
    id: 'f7',
    basePrice: 300,
    dateFrom: '2021-07-10T15:55:56.845Z',
    dateTo: '2021-07-11T11:15:13.375Z',
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
    dateFrom: '2022-07-10T14:55:56.845Z',
    dateTo: '2022-07-11T11:14:13.375Z',
    destination: '8',
    isFavorite: true,
    offers: [
      '31','32','33',
    ],
    type: 'sightseeing'
  },
  {
    id: 'f9',
    basePrice: 100,
    dateFrom: '2023-09-10T13:55:56.845Z',
    dateTo: '2023-09-11T11:13:13.375Z',
    destination: null,
    isFavorite: false,
    offers: [],
    type: 'restaurant'
  },
];

const getRandomPoint = () => getRandomArrayElement(mockPoints);

export {mockPoints, getRandomPoint };
