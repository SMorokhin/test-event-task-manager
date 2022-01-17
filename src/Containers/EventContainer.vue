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
      getEventDescription (id) {
        return eventAPI.getEventDescription(id)
      }
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
        const search = new RegExp(this.params.search, 'i')
        predicates.push((x) => search.test(x.name))
      }

      if (this.params.dates) {
        const { from, till } = this.params.dates
        predicates.push((x) => x.from >= from && x.till <= till)
      }

      const filteredEvents = predicates.length
        ? this.events.filter((x) =>
          predicates.every((predicate) => predicate(x))
        )
        : this.events

      filteredEvents.sort((a, b) => a.date - b.date)
      return filteredEvents
    },

    groupedEvents () {
      return this.filteredEvents.reduce((groups, event) => {
        const group = groups[event.date] || (groups[event.date] = {
          date: event.date,
          events: []
        })

        group.events.push(event)
        return groups
      }, {})
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
    async removeEvent (eventInfoId) {
      await eventAPI.removeEvent(eventInfoId)
      await this.getEventsList()
    },

    async getEventsList () {
      this.events = await eventAPI.getEventsList()
    }
  },

  render () {
    return this.$scopedSlots.default({
      groupedEvents: this.groupedEvents
    })
  }
}
</script>
