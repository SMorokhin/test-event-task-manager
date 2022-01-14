import axios from './axios'

export const cCategories = Promise.resolve(axios.get('/event-categories')).then(response => {
  return response.data.reduce((map, category) => {
    return Object.assign(map, {
      [category.id]: category
    })
  }, {})
})

export const participants = axios.get('/employees')

/**
 * Get event by ID
 * @param id
 * @returns {Promise<*|*[]>}
 */
export async function getEventDescription (id) {
  const events = await axios.get('/events/' + id)
  const categories = await cCategories
  return mapToEvent(events.data, categories)
}

/**
 * Get full list of events
 * @returns {Promise<*>}
 */
export async function getEventsList () {
  const events = await axios.get('/events')
  const categories = await cCategories
  return joinEventsWithCategories(events.data, categories)
}

/**
 * Save new event. Return new event with joined category
 * @param obj
 * @returns {Promise<void>}
 */
export async function saveEvent (obj) {
  await axios.post('/events', {
    ...obj
  })
}

/**
 * Remove event from list by event id
 * @param eventId
 * @returns {Promise<void>}
 */
export async function removeEvent (eventId) {
  await axios.delete(`/events/${eventId}`)
}

/**
 * Returns merged data of event list with event category
 * @returns {Promise<*>}
 */
function joinEventsWithCategories (events, categories) {
  return events.map(evt => mapToEvent(evt, categories))
}

function mapToEvent (definition, categories) {
  const {
    eventTypeId,
    begDate,
    endDate,
    ...data
  } = definition

  const from = new Date(begDate)
  const till = new Date(endDate)
  return {
    ...data,
    from,
    till,
    date: new Date(from.getTime()).setHours(0, 0, 0, 0),
    category: categories[eventTypeId]
  }
}

// /**
//  * Returns event object with joined long intl weekday and intl full year
//  * @param events
//  * @returns {*}
//  */
// function joinEventsWithIntlDateColor (events) {
//   const today = new Intl.DateTimeFormat().format(new Date())
//   console.log(events)
//   return events.map(event => {
//     const intlDate = new Intl.DateTimeFormat(US_LOCALES)
//       .format(new Date(event.begDate))
//     const weekday = new Intl.DateTimeFormat(US_LOCALES, { weekday: LONG_WEEKDAY })
//       .format(new Date(event.begDate))
//       .toUpperCase()
//     if (today === intlDate) {
//       event.date = 'TODAY ' + intlDate
//       event.dateColor = DATE_COLOR
//     } else {
//       event.date = weekday + ' ' + intlDate
//       event.dateColor = null
//     }
//   })
// }
