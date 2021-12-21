import * as eventAPI from '../../eventAPI'
import { mapGetters } from 'vuex'

export default {
  name: 'EventList',
  data () {
    return {
      eventInfo: [],
      eventType: [],
      date: null
    }
  },
  async created () {
    await this.getEventsList()
    await this.getEventType()
    this.date = new Date()
  },
  methods: {
    async getEventsList () {
      this.eventInfo = await eventAPI.getEventsList()
    },
    async getEventType () {
      this.eventType = await eventAPI.getEventType()
    }
  },
  computed: {
    ...mapGetters({
      vEventList: 'event/vEventList'
    }),
    /**
     * Make formatted event list
     * @returns {*[]}
     */
    makeEventList () {
      const result = []
      if (this.eventInfo.length && this.eventType.length) {
        this.eventInfo.forEach(obj => {
          this.eventType.forEach(el => {
            if (obj.eventTypeId === el.id) {
              obj.color = el.color
            }
          })
          result.push(obj)
        })
      }
      return result
    },
    /**
     * Get unique dates of each event
     * @returns {*[]}
     */
    eventListDates () {
      const dateList = this.makeEventList.map((el, idx) => {
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
      this.eventListDates.forEach(date => {
        result[date] = this.makeEventList.filter(el => {
          return el.endDate.slice(0, 10) === date
        })
      })
      return result
    }
  }
}
