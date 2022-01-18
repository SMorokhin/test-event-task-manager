<template>
  <loading-spinner v-if="loading"/>
  <event-description v-else-if="eventInfo"
                     :event-info="eventInfo"
                     :format-weekday-date="formatWeekdayDate"
                     :get-time-line="getTimeLine"
                     :participants-list="participantsList"
                     :id="id"/>
  <Error v-else
         :message-text="errorMessage"
         :error-description="errorDescription"/>
</template>

<script>
import * as eventAPI from '../eventAPI'
import * as timeFormat from '../js/timeFormat'
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
      loading: null,
      eventInfo: null,
      errorMessage: 'Event by searched ID is not found.',
      errorDescription: null,
      participants: null
    }
  },

  created () {
    eventAPI.participants
      .then(response => {
        this.participants = response.data.map(el => {
          return {
            text: el.fls,
            value: el.id
          }
        })
      })
  },

  inject: ['refresh'],

  provide () {
    return {
      remove: this.remove,
      update: this.update,
      getDescription: this.getDescription
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
      try {
        this.loading = true
        await eventAPI.removeEvent(id)
        this.eventInfo = null
        await this.refresh()
      } catch (e) {
        // this.error = e
        console.log(e)
      } finally {
        this.loading = false
      }
    },

    update () {
      this.$router.push({
        name: 'events.event.update',
        params: {
          id: this.id,
          event: this.eventInfo
        }
      })
    },

    async getDescription (id) {
      this.eventInfo = await eventAPI.getEventDescription(id)
    }
  },

  watch: {
    id: {
      immediate: true,
      async handler (id) {
        try {
          this.loading = true
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
    participantsList () {
      return this.participants.reduce((participantList, participant) => {
        if (this.eventInfo.participant.includes(participant.value)) {
          participantList.push(participant.text)
        }
        return participantList
      }, []).join(', ')
    },
    /**
     * Get time interval of event activity
     * @returns {string}
     */
    getTimeLine () {
      if (this.eventInfo) {
        return timeFormat.timeLine(this.eventInfo.from, this.eventInfo.till)
      } else {
        return null
      }
    },

    formatWeekdayDate () {
      if (this.eventInfo) {
        const [weekday, day] = timeFormat.getWeekdayDate(this.eventInfo.date)
        return `${weekday.toUpperCase()} ${day}`
      } else {
        return null
      }
    }
  }
}
</script>
