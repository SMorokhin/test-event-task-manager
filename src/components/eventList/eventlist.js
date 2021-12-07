import axios from '../../axios'
import { mapGetters } from 'vuex'

export default {
  name: 'EventList',
  data () {
    return {
      eventInfo: [],
      eventType: [],
      date: null,
      target: null
    }
  },
  async created () {
    await this.getEventsList()
    await this.getEventType()
    this.date = new Date()
  },
  methods: {
    async getEventsList () {
      try {
        const response = await axios.get('/event')
        this.eventInfo = response.data
      } catch (e) {
        console.log(e)
      }
    },
    async getEventType () {
      try {
        const response = await axios.get('/eventCategory')
        this.eventType = response.data
      } catch (e) {
        console.log(e)
      }
    },
    targetEvent (id) {
      if (this.target !== id) {
        this.target = id
        this.$router.push(`/${id}`)
      }
    },
    setTarget () {
      this.target = this.groupEventList[0][1][0].id
      return this.target
    }
  },
  computed: {
    ...mapGetters({
      vEventList: 'event/vEventList'
    }),
    makeEventList () {
      const result = []
      if (this.eventInfo.length && this.eventType.length) {
        const eventInfo = this.eventInfo
        eventInfo.forEach(obj => {
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
    eventListDates () {
      const eventList = this.makeEventList
      const result = []
      eventList.forEach(obj => {
        const str = obj.endDate.slice(0, 10)
        if (result.indexOf(str) === -1) {
          result.push(str)
        }
      })
      result.sort().reverse()
      return result
    },
    groupEventList () {
      const result = {}
      this.eventListDates.forEach(obj => {
        const tmp = []
        this.makeEventList.forEach(el => {
          if (obj === el.endDate.slice(0, 10)) {
            tmp.push(el)
          }
        })
        result[obj] = tmp
      })
      return result
    }
  }
}
