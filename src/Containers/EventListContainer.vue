<template>
  <div>
    <event-list
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
    params: {
      type: Object,
      required: true
    }
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
        ? {
          borderRight: `3px solid ${this.eventData.eventInfo.category.color}`,
          background: 'rgba(59, 130, 246, .1)',
          borderRadius: '8px 2px 2px 8px'
        }
        : null
    },

    currentEventId () {
      return this.eventData.eventInfo ? this.eventData.eventInfo.id : null
    },

    /**
     * Filter event list by searchText parameter
     * @returns {*[]}
     */
    filteredEventList () {
      return this.eventList.filter(el => {
        return el.name
          .toLowerCase()
          .trim()
          .includes(this.searchText
            .toLowerCase()
            .trim())
          ? el
          : null
      })
    },

    /**
     * Filter dates by searchDates parameter
     * @returns {*[]}
     */
    filteredDates () {
      if (this.searchDates.length !== 2) return this.eventListDates
      const sortDates = this.searchDates
      sortDates.sort()
      return this.eventListDates.filter(date => {
        return (sortDates[0] <= date && sortDates[1] >= date)
      })
    },

    /**
     * Get unique dates of each event
     * @returns {*[]}
     */
    eventListDates () {
      if (this.eventList) {
        const dateList = this.eventList.map((el) => {
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
    },

    searchText () {
      return this.params.search
    },

    searchDates () {
      return this.params.date
    }
  }
}
</script>
