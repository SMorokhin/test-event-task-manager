import axios from './axios'

/**
 * Get event by ID
 * @param id
 * @returns {Promise<*|*[]>}
 */
export async function getEventDescription (id) {
  try {
    let response = await axios.get('/event', {
      params: {
        id
      }
    })
    response = addEventCategoryToEvent(response.data)
    return response
  } catch (e) {
    console.log(e)
  }
}

/**
 * Returns merged data of event list with event category
 * @returns {Promise<*>}
 */
export async function addEventCategoryToEvent (eventList) {
  try {
    const response = await axios.get('/eventCategory')
    const eventType = response.data
    eventList.forEach(obj => {
      obj.category = eventType.find(el => {
        return el.id === obj.eventTypeId
      })
      delete obj.eventTypeId
    })
    return eventList
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
    let response = await axios.get('/event')
    response = addEventCategoryToEvent(response.data)
    return response
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
