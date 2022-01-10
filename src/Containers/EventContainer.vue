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

    sortedEvents () {
      const sortArr = this.filteredEvents
      sortArr.sort(this.sortByField('begDate'))
      return sortArr.reverse()
    },

    eventDates () {
      return this.sortedEvents.length
        ? new Set(this.sortedEvents.map(event => {
          const date = new Intl.DateTimeFormat('en-US')
            .format(new Date(event.begDate))
          const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' })
            .format(new Date(event.begDate))
            .toUpperCase()
          return weekday + ' ' + date
        }))
        : null
    }

    // groupedEvents () {
    //   const res = {}
    //
    //   this.eventDates.forEach(date => {
    //     const tmp = this.sortedEvents.filter(event => {
    //       return new Intl.DateTimeFormat()
    //         .format(new Date(event.begDate)) === new Intl.DateTimeFormat().format(new Date(date))
    //     })
    //     res[date] = tmp
    //   })
    //   return res
    // }
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
      this.eventInfo = (await eventAPI.getEventDescription(id)).pop()
    }
  },

  render () {
    return this.$scopedSlots.default({
      events: this.sortedEvents
    })
  }
}
</script>
