function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

const capitalizeFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const isTruthy = (value) => value === null || value === '' || value.length === 0;

export {getRandomArrayElement, capitalizeFirstLetter, isTruthy};
