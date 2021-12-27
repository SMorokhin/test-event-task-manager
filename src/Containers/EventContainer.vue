<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import * as eventAPI from '../eventAPI'

const eventData = {}

export default {
  props: {
    params: {
      type: Object,
      required: true
    }
  },

  provide () {
    Object.defineProperty(eventData, 'eventList', {
      enumerable: true,
      get: () => this.eventList
    })
    Object.defineProperty(eventData, 'eventInfo', {
      enumerable: true,
      get: () => this.eventInfo
    })
    Object.defineProperty(eventData, 'eventCategory', {
      enumerable: true,
      get: () => this.eventCategory
    })
    Object.defineProperty(eventData, 'participants', {
      enumerable: true,
      get: () => this.participants
    })
    return {
      removeEvent: this.removeEvent,
      getEventsList: this.getEventsList,
      getEventDescription: this.getEventDescription,
      addNewEventToEventList: this.addNewEventToEventList,
      saveEvent: this.saveEvent,
      eventData
    }
  },

  data () {
    return {
      searchText: null,
      searchDates: null,
      eventList: null,
      eventInfo: null,
      eventCategory: [],
      participants: []
    }
  },

  watch: {
    params: {
      deep: true,
      immediate: true,
      handler () {
      }
    }
  },

  async created () {
    await this.getEventsList()
    await this.getEventDescription(this.$route.params.id)
    await this.getEventType()
    await this.getParticipants()
  },

  methods: {
    reset () {
    },

    async removeEvent (eventInfoId) {
      this.$loading(true)
      const removedId = await eventAPI.removeEvent(eventInfoId)
      await this.getEventDescription(removedId)
      await this.getEventsList()
      this.$loading(false)
    },

    async getEventsList () {
      this.$loading(true)
      this.eventList = await eventAPI.getEventsList()
      this.$loading(false)
    },

    async getEventDescription (id) {
      this.eventInfo = (await eventAPI.getEventDescription(id)).pop()
    },

    async saveEvent (obj) {
      const response = await eventAPI.saveEvent({
        ...obj
      })
      this.eventInfo = response.pop()
      this.addNewEventToEventList(this.eventInfo)
      await this.$router.push(`/${this.eventInfo.id}`)
    },

    addNewEventToEventList (newEvent) {
      this.eventList.push(newEvent)
    },

    async getEventType () {
      this.eventCategory = await eventAPI.getEventType()
    },

    async getParticipants () {
      this.participants = await eventAPI.getParticipants()
    }
  }
}
</script>
