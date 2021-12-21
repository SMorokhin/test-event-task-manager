import axios from './axios'

/**
 * Get event by ID
 * @param id
 * @returns {Promise<*|*[]>}
 */
export async function getEventDescription (id) {
  try {
    const response = await axios.get('/event', {
      params: {
        id
      }
    })
    return response.data.length ? response.data[0] : []
  } catch (e) {
    console.log(e)
  }
}

/**
 * Get color of event by event ID
 * @param eventId
 * @returns {Promise<*>}
 */
export async function getEventColor (eventId) {
  try {
    const response = await axios.get('/eventCategory', {
      params: {
        id: eventId
      }
    })
    return response.data.color
  } catch (e) {
    console.log(e)
  }
}

/**
 * Return event's category list
 * @returns {Promise<*>}
 */
export async function getEventType () {
  try {
    const response = await axios.get('/eventCategory')
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
    const response = await axios.get('/event')
    return response.data
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
    const response = await axios.get('/employee')
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
  try {
    await axios.post('/event', {
      name: obj.title,
      description: obj.description,
      begDate: obj.begDate,
      endDate: obj.endDate,
      participant: obj.participant,
      eventTypeId: obj.eventTypeId,
      repeat: obj.repeat
    })
    location.reload()
  } catch (e) {
    console.log(e)
  }
}
