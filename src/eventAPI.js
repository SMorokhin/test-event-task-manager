import axios from './axios'

export const CATEGORIES = Promise.resolve(axios.get('/event-categories')).then(response => {
  return response.data
})

export const PARTICIPANTS = Promise.resolve(axios.get('/employees')).then(response => {
  return response.data
})

/**
 * Get event by ID
 * @param id
 * @returns {Promise<*|*[]>}
 */
export async function getEventDescription (id) {
  try {
    const [events] = await Promise.all([
      axios.get('/events', {
        params: {
          id
        }
      })
    ])
    const categories = await CATEGORIES
    return joinEventsWithCategories(events.data, categories)
  } catch (e) {
    console.log(e)
  }
}

/**
 * Get full list of events
 * @returns {Promise<*>}
 */
export async function getEventsList () {
  try {
    const [events] = await Promise.all([
      axios.get('/events')
    ])
    const categories = await CATEGORIES
    return joinEventsWithCategories(events.data, categories)
  } catch (e) {
    console.log(e)
  }
}

/**
 * Save new event. Return new event with joined category
 * @param obj
 * @returns {Promise<void>}
 */
export async function saveEvent (obj) {
  const [response, categories] = await Promise.all([axios.post('/events', {
    ...obj
  }),
  axios.get('/event-categories')])
  return joinEventsWithCategories([response.data], categories.data)
}

/**
 * Remove event from list by event id
 * @param eventId
 * @returns {Promise<void>}
 */
export async function removeEvent (eventId) {
  try {
    await axios.delete(`/events/${eventId}`)
    return eventId
  } catch (e) {
    console.log('Ошибка удаления, элемент не найден:\n', e)
  }
}

/**
 * Returns merged data of event list with event category
 * @returns {Promise<*>}
 */
async function joinEventsWithCategories (events, categories) {
  const map = categories.reduce((map, category) => {
    return Object.assign(map, {
      [category.id]: category
    })
  }, {})
  return events.map(evt => {
    const {
      eventTypeId,
      ...data
    } = evt
    return {
      ...data,
      category: map[eventTypeId]
    }
  })
}
