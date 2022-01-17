import axios from './axios'

export const categories = Promise.resolve(axios.get('/event-categories')).then(response => {
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
  const events = await axios.get(`/events/${id}`)
  return mapToEvent(events.data, await categories)
}

/**
 * Get full list of events
 * @returns {Promise<*>}
 */
export async function getEventsList () {
  const events = await axios.get('/events')
  return joinEventsWithCategories(events.data, await categories)
}

/**
 * Save new event. Return new event with joined category
 * @param obj
 * @returns {Promise<void>}
 */
export async function saveEvent (obj) {
  await axios.post('/events', obj)
}

export async function updateEvent (id, obj) {
  await axios.patch(`/events/${id}`, obj)
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
