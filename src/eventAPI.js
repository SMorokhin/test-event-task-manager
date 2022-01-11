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
    const joinedEvent = joinEventsWithCategories(events.data, categories)
    joinEventsWithIntlDateColor(await joinedEvent)
    return joinedEvent
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
    const joinedEvents = joinEventsWithCategories(events.data, categories)
    joinEventsWithIntlDateColor(await joinedEvents)
    return joinedEvents
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

function joinEventsWithIntlDateColor (events) {
  const today = new Intl.DateTimeFormat().format(new Date())
  return events.map(event => {
    const date = new Intl.DateTimeFormat('en-US')
      .format(new Date(event.begDate))
    const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' })
      .format(new Date(event.begDate))
      .toUpperCase()
    if (today === date) {
      event.date = 'TODAY ' + date
      event.dateColor = '#3B82F6'
    } else {
      event.date = weekday + ' ' + date
      event.dateColor = null
    }
  })
}
