import * as eventAPI from '../../eventAPI'

export default {
  name: 'EventDescription',
  data () {
    return {
      eventInfo: {}
    }
  },
  watch: {
    '$route.params.id': {
      async handler () {
        await this.getEventDescription(this.$route.params.id)
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    async getEventDescription (id) {
      const result = await eventAPI.getEventDescription(id)
      this.eventInfo = result.pop()
    }
  }
}
