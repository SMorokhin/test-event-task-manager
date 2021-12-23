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
    /**
     * Remove event from the list
     * @returns {Promise<void>}
     */
    async removeEvent () {
      await eventAPI.removeEvent(this.$route.params.id)
      await this.getEventDescription(this.$route.params.id)
      this.$emit('removeEvent')
    }
  },
  computed: {
    /**
     * Get long name of day
     * @returns {string}
     */
    getLongDay () {
      const options = { weekday: 'long' }
      const date = new Date(this.eventInfo.endDate)
      const day = new Intl.DateTimeFormat('en-US', options).format(date)
      return day
    },
    /**
     * Get time interval of event activity
     * @returns {string}
     */
    getTimeLine () {
      return this.eventInfo.begDate.slice(10) +
        ' - ' +
        this.eventInfo.endDate.slice(10)
    }
  }
}
