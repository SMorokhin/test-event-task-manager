import * as eventAPI from '../../eventAPI'
import { mapGetters } from 'vuex'

export default {
  name: 'EventList',
  data () {
    return {
      eventInfo: [],
      date: null
    }
  },
  props: {
    searchText: {
      type: String,
      default: ''
    },
    searchDates: {
      type: Array,
      default: []
    }
  },
  async created () {
    await this.getEventsList()
    this.date = new Date()
  },
  methods: {
    async getEventsList () {
      this.eventInfo = await eventAPI.getEventsList()
    }
  },
  computed: {
    ...mapGetters({
      vEventList: 'event/vEventList'
    }),
    /**
     * Filter event list by searchText parameter
     * @returns {*[]}
     */
    filteredEventList () {
      return this.eventInfo.filter(el => {
        return el.name.toLowerCase().includes(this.searchText.toLowerCase()) ? el : null
      })
    },
    /**
     * Filter dates by searchDates parameter
     * @returns {*[]}
     */
    filteredDates () {
      if (this.searchDates.length !== 2) return this.eventListDates
      this.searchDates.sort()
      return this.eventListDates.filter(date => {
        return (this.searchDates[0] <= date && this.searchDates[1] >= date)
      })
    },
    /**
     * Get unique dates of each event
     * @returns {*[]}
     */
    eventListDates () {
      const dateList = this.eventInfo.map((el, idx) => {
        return el.endDate.slice(0, 10)
      })
      return dateList.filter((el, idx) => {
        return dateList.indexOf(el) === idx
      }).sort().reverse()
    },
    /**
     * Group list of events by date
     * @returns {{}}
     */
    groupEventList () {
      const result = {}
      this.filteredDates.forEach(date => {
        const tmp = this.filteredEventList.filter(el => {
          return el.endDate.slice(0, 10) === date
        })
        if (tmp.length) {
          result[date] = tmp
        }
      })
      return result
    }
  }
}
