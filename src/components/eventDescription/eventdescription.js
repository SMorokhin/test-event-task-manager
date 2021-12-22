import * as eventAPI from '../../eventAPI'
import VerticalBurgerMenu from '../UI/VerticalBurgerMenu/VerticalBurgerMenu'

export default {
  name: 'EventDescription',
  data () {
    return {
      eventInfo: {},
      listItemsProps: [{
        name: 'Удалить',
        method: 'removeEvent'
      }],
      loaded: false
    }
  },
  components: {
    VerticalBurgerMenu
  },
  async created () {
    await this.getEventDescription(this.$route.params.id)
    this.loaded = true
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
    },
    async removeEvent () {
      console.log('emitted')
      await eventAPI.removeEvent(this.$route.params.id)
    }
  },
  computed: {
    getLongDay () {
      const options = { weekday: 'long' }
      const date = new Date(this.eventInfo.endDate)
      const day = new Intl.DateTimeFormat('en-US', options).format(new Date(date))
      return day
    },
    getTimeLine () {
      return this.eventInfo.begDate.slice(10) +
        ' - ' +
        this.eventInfo.endDate.slice(10)
    }
  }
}
