import dayjs from 'dayjs';

const DATE_POINT_EDITE_FORMAT = 'DD/MM/YY HH:mm';
const TIME_FORMAT = 'HH:mm';
const DATE_EVENTS_ITEM_FORMAT = 'MMM DD';

const humanizePointDueDateEdite = (dueDate) => dueDate ? dayjs(dueDate).format(DATE_POINT_EDITE_FORMAT) : '';

const humanizePointDueTime = (dueTime) => dueTime ? dayjs(dueTime).format(TIME_FORMAT) : '';

const humanizePointDueDateItem = (dueDate) => dueDate ? dayjs(dueDate).format(DATE_EVENTS_ITEM_FORMAT) : '';

export {humanizePointDueDateEdite, humanizePointDueTime, humanizePointDueDateItem};
