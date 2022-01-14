<template>
  <loading-spinner v-if="loading"/>
  <event-description v-else-if="eventInfo"
                     :event-info="eventInfo"
                     :format-weekday-date="formatWeekdayDate"
                     :get-time-line="getTimeLine"
                     :id="id"/>
  <Error v-else
         :message-text="errorMessage"
         :error-description="errorDescription"/>
</template>

<script>
import * as eventAPI from '../eventAPI'
import EventDescription from '../components/eventDescription/EventDescription.vue'
import LoadingSpinner from '../components/UI/loadingSpinner/LoadingSpinner'
import Error from '../components/UI/Error/Error'

export default {
  name: 'EventDescriptionContainer',

  components: {
    EventDescription,
    LoadingSpinner,
    Error
  },

  data () {
    return {
      loading: true,
      eventInfo: null,
      errorMessage: 'Event by searched ID is not found.',
      errorDescription: null
    }
  },

  inject: ['refresh'],

  provide () {
    return {
      remove: this.remove
    }
  },

  props: {
    id: {
      required: true
    }
  },

  methods: {
    /**
     * Remove event from the list
     * @returns {Promise<void>}
     */
    async remove (id) {
      this.loading = true
      await eventAPI.removeEvent(id)
      await this.refresh()
      this.eventInfo = null
      this.loading = false
    }
  },

  watch: {
    id: {
      immediate: true,
      async handler (id) {
        try {
          this.eventInfo = await eventAPI.getEventDescription(id)
        } catch (e) {
          this.errorDescription = e
        } finally {
          this.loading = false
        }
      }
    }
  },

  computed: {
    /**
     * Get time interval of event activity
     * @returns {string}
     */
    getTimeLine () {
      if (this.eventInfo) {
        const from = this.eventInfo.from
        const till = this.eventInfo.till
        return from.getHours() +
          ':' +
          (from.getMinutes() < 10 ? '0' : '') + from.getMinutes() +
          ' - ' +
          till.getHours() +
          ':' +
          (till.getMinutes() < 10 ? '0' : '') + till.getMinutes()
      } else {
        return null
      }
    },

    formatWeekdayDate () {
      return this.eventInfo
        ? new Intl.DateTimeFormat('en-US', { weekday: 'long' })
          .format(this.eventInfo.date)
          .toUpperCase() + ' ' +
        new Intl.DateTimeFormat('en-US').format(this.eventInfo.date)
        : null
    }
  }

  // render () {
  //   return this.$scopedSlots.default({
  //     eventInfo: this.eventInfo,
  //     loaded: this.loaded,
  //     formatWeekdayDate: this.formatWeekdayDate,
  //     getTimeLine: this.getTimeLine,
  //     remove: this.remove
  //   })
  // }
}
</script>
