import * as eventAPI from '../../eventAPI'

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
      this.eventInfo = await eventAPI.getEventDescription(id)
    },
    async getEventColor (eventId) {
      this.eventColor = await eventAPI.getEventColor(eventId)
    }
  }
}
