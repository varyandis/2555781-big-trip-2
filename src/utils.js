import dayjs from 'dayjs';

const DATE_FORMAT = 'DD/MM/YYYY HH:mm';
const TIME_FORMAT = 'HH:mm';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

const humanizePointDueDate = (dueDate) => dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';

const humanizePointDueTime = (dueTime) => dueTime ? dayjs(dueTime).format(TIME_FORMAT) : '';


// console.log(humanizeTaskDueDate('2019-07-10T22:55:56.845Z'))

export {getRandomArrayElement, humanizePointDueDate, humanizePointDueTime};
