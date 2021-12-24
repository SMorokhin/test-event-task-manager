<template>
  <div>
    <event-list
      v-if="true"
      :group-event-list="groupEventList"
      :current-event-id="currentEventId"
      :is-active-style="isActiveStyle"
    />
  </div>
</template>

<script>
import EventList from '../components/eventList/EventList.vue'

export default {
  components: {
    EventList
  },

  props: {
    searchText: {
      type: String,
      default: ''
    },
    searchDates: {
      type: Array,
      default: null
    }
  },

  provide () {
  },

  data () {
    return {
      date: null,
      eventList: {}
    }
  },

  inject: [
    'eventData'
  ],

  methods: {
    /**
     * Get dat of week by dateTime
     * @param date
     * @returns {string}
     */
    getDayOfWeek (date) {
      const options = { weekday: 'long' }
      const day = new Intl.DateTimeFormat('en-US', options).format(new Date(date))
      return day + ' ' + date
    }
  },
  watch: {
    eventData: {
      deep: true,
      immediate: true,
      handler () {
        this.eventList = this.eventData.eventList
      }
    }
  },
  computed: {
    isActiveStyle () {
      return this.eventData.eventInfo
        ? { borderRight: `3px solid ${this.eventData.eventInfo.category.color}` }
        : null
    },
    currentEventId () {
      return this.eventData.eventInfo ? this.eventData.eventInfo.id : null
    },
    isActive () {
      return this.isActiveStyle && this.currentEventId
    },
    /**
     * Filter event list by searchText parameter
     * @returns {*[]}
     */
    filteredEventList () {
      return this.eventList.filter(el => {
        return el.name.toLowerCase().includes(this.searchText.toLowerCase()) ? el : null
      })
    },
    /**
     * Filter dates by searchDates parameter
     * @returns {*[]}
     */
    filteredDates () {
      if (this.searchDates.length !== 2) return this.eventListDates
      // this.searchDates.sort()
      return this.eventListDates.filter(date => {
        return (this.searchDates[0] <= date && this.searchDates[1] >= date)
      })
    },
    /**
     * Get unique dates of each event
     * @returns {*[]}
     */
    eventListDates () {
      if (this.eventList) {
        const dateList = this.eventList.map((el, idx) => {
          return el.endDate.slice(0, 10)
        })
        return dateList.reduce((result, item) => {
          return result.includes(item) ? result : [...result, item]
        }, []).sort().reverse()
      }
      return null
    },
    /**
     * Group list of events by date
     * @returns {{}}
     */
    groupEventList () {
      const result = {}
      if (this.eventList) {
        this.filteredDates.forEach(date => {
          const fullDate = this.getDayOfWeek(date)
          const tmp = this.filteredEventList.filter(el => {
            return el.endDate.slice(0, 10) === date
          })
          if (tmp.length) {
            result[fullDate] = tmp
          }
        })
      }
      return result
    }
  }
}
</script>
