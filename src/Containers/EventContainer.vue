<script>
import * as eventAPI from '../eventAPI'

export default {
  props: {
    params: {
      type: Object,
      required: true
    }
  },

  provide () {
    return {
      refresh: this.getEventsList,
      remove: this.removeEvent,
      getEventDescription: this.getEventDescription
    }
  },

  data () {
    return {
      events: []
    }
  },

  computed: {
    filteredEvents () {
      const predicates = []

      if (this.params.search) {
        predicates.push((x) => x.name
          .toLowerCase()
          .trim()
          .includes(this.params.search
            .toLowerCase()
            .trim()))
      }

      if (this.params.dates) {
        const { from, till } = this.params.dates
        predicates.push((x) => new Date(x.begDate) <= till && new Date(x.endDate) >= from)
      }

      const filteredEvents = predicates.length
        ? this.events.filter((x) =>
          predicates.every((predicate) => predicate(x))
        )
        : this.events

      filteredEvents.sort(this.sortByField('begDate'))
      return filteredEvents.reverse()
    },

    eventDates () {
      return this.filteredEvents.length
        ? new Set(this.filteredEvents.map(event => {
          return event.date
        }))
        : null
    },

    groupedEvents () {
      if (!this.eventDates) return null
      const res = {}

      this.eventDates.forEach(date => {
        const tmp = this.filteredEvents.filter(event => {
          return event.date === date
        })
        res[date] = tmp
      })
      return res
    }
  },

  watch: {
    params: {
      deep: true,
      immediate: true,
      handler () {
        this.getEventsList()
      }
    }
  },

  methods: {
    reset () {
    },

    sortByField (field) {
      return (a, b) => a[field] > b[field] ? 1 : -1
    },

    async removeEvent (eventInfoId) {
      const removedId = await eventAPI.removeEvent(eventInfoId)
      await this.getEventDescription(removedId)
      await this.getEventsList()
    },

    async getEventsList () {
      this.events = await eventAPI.getEventsList()
    },

    async getEventDescription (id) {
      const response = await eventAPI.getEventDescription(id)
      return response.pop()
    }
  },

  render () {
    return this.$scopedSlots.default({
      events: this.filteredEvents,
      groupedEvents: this.groupedEvents
    })
  }
}
</script>
