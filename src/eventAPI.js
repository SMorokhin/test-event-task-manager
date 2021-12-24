import axios from './axios'

/**
 * Get event by ID
 * @param id
 * @returns {Promise<*|*[]>}
 */
export async function getEventDescription (id) {
  try {
    const [events, categories] = await Promise.all([
      axios.get('/events', {
        params: {
          id
        }
      }),
      axios.get('/event-categories')
    ])
    return joinEventsWithCategories(events.data, categories.data)
  } catch (e) {
    console.log(e)
  }
}

/**
 * Get event type list
 * @returns {Promise<any>}
 */
export async function getEventType () {
  try {
    const response = await axios.get('/event-categories')
    return response.data
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
    const [events, categories] = await Promise.all([
      axios.get('/events'),
      axios.get('/event-categories')
    ])
    return joinEventsWithCategories(events.data, categories.data)
  } catch (e) {
    console.log(e)
  }
}

/**
 * Get list of participants
 * @returns {Promise<*>}
 */
export async function getParticipants () {
  try {
    const response = await axios.get('/employees')
    return response.data
  } catch (e) {
    console.log(e)
  }
}

/**
 * Save new event
 * @param obj
 * @returns {Promise<void>}
 */
export async function saveEvent (obj) {
  const response = await axios.post('/events', {
    name: obj.title,
    description: obj.description,
    begDate: obj.begDate,
    endDate: obj.endDate,
    participant: obj.participant,
    eventTypeId: obj.eventTypeId,
    repeat: obj.repeat
  })
  console.log(response.data)
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
