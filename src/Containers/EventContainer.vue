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
    return {
      removeEvent: this.removeEvent,
      getEventsList: this.getEventsList,
      getEventDescription: this.getEventDescription,
      eventData
    }
  },

  data () {
    return {
      searchText: null,
      searchDates: null,
      eventList: null,
      eventInfo: null
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
    }
  },

  computed: {
  }
  //
  // render (h) {
  //   return h(this.$slots.default, {
  //     props: {
  //       events: this.events,
  //       reset: this.reset
  //     }
  //   })
  // }
}
</script>
