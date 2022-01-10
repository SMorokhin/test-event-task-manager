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
      remove: this.removeEvent
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

      return predicates.length
        ? this.events.filter((x) =>
          predicates.every((predicate) => predicate(x))
        )
        : this.events
    },

    eventDates () {
      const dateArray = this.filteredEvents ? this.filteredEvents.map(event => {
        const date = new Intl.DateTimeFormat('en-US').format(new Date(event.begDate))
        const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(event.begDate))
        return weekday + ' ' + date
      }) : null
      dateArray.sort()
      return new Set(dateArray)
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
    reset () {},

    async removeEvent (eventInfoId) {
      const removedId = await eventAPI.removeEvent(eventInfoId)
      await this.getEventDescription(removedId)
      await this.getEventsList()
    },

    async getEventsList () {
      this.events = await eventAPI.getEventsList()
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
      this.events.push(newEvent)
    }
  },

  render () {
    return this.$scopedSlots.default({
      events: this.filteredEvents
    })
  }
}
</script>
