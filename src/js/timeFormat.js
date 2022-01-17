/**
 * Return time string in format: from hh:mm - till hh:mm
 * @param from
 * @param till
 * @returns {string}
 */
export function timeLine (from, till) {
  return from.getHours() +
    ':' +
    (from.getMinutes() < 10 ? '0' : '') + from.getMinutes() +
    ' - ' +
    till.getHours() +
    ':' +
    (till.getMinutes() < 10 ? '0' : '') + till.getMinutes()
}

/**
 * Returns fromated to long weekay + day in mm/dd/yyyy format
 * @param date
 * @returns {string[]}
 */
export function getWeekdayDate (date) {
  const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' })
    .format(date)
    .toUpperCase()
  const day = Intl.DateTimeFormat('en-US')
    .format(date)
  return [weekday, day]
}
