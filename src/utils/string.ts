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

/**
 * Formats date
 * @param date
 * @param time
 * @returns
 */
export const formatDate = (date: Date | string, time = true) => {
  if (!(date instanceof Date)) {
    date = new Date(date)
  }
  const today = new Date()

  let options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
  }
  if (date.getFullYear() !== today.getFullYear())
    options = {
      ...options,
      year: 'numeric',
    }
  if (time) options = { ...options, hour: '2-digit', minute: '2-digit' }

  return date.toLocaleDateString('en-US', options)
}
