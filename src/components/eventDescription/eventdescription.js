import axios from '../../axios'

export default {
  name: 'EventDescription',
  data () {
    return {
      eventInfo: [],
      eventColor: null
    }
  },
  watch: {
    '$route.params.id': {
      async handler () {
        await this.getEventDescription(this.$route.params.id)
        await this.getEventColor(this.eventInfo.eventTypeId)
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    async getEventDescription (id) {
      try {
        const response = await axios.get('/event', {
          params: {
            id
          }
        })
        this.eventInfo = response.data.length ? response.data[0] : []
      } catch (e) {
        console.log(e)
      }
    },
    async getEventColor (eventId) {
      try {
        const response = await axios.get('/eventCategory', {
          params: {
            id: eventId
          }
        })
        this.eventColor = response.data.color
      } catch (e) {
        console.log(e)
      }
    }
  }
}
