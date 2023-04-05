/**
 * Gets last number from URL string
 * @param url
 * @returns the parsed number
 */
export const getLastIntFromURL = (url: string): number => {
  const URLArray = url.split(/[\/]/)
  const numberArray = URLArray.filter(Number)
  return parseInt(numberArray[numberArray.length - 1])
}
