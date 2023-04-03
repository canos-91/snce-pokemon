/**
 * Gets random number between min and max (included)
 * @param min - minimun number
 * @param max - maximum number
 * @returns
 */
const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export { getRandomInt }
