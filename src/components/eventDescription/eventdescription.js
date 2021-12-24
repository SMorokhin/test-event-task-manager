import VerticalBurgerMenu from '../UI/VerticalBurgerMenu/VerticalBurgerMenu'

export default {
  name: 'EventDescription',
  data () {
    return {
      listItemsProps: [{
        name: 'Удалить',
        method: 'removeEvent'
      }],
      loaded: false,
      isLoading: false,
      eventInfo: null
    }
  },
  inject: [
    'removeEvent',
    'getEventDescription',
    'eventData'
  ],
  components: {
    VerticalBurgerMenu
  },
  async created () {
    // await this.getEventDescription(this.$route.params.id)
    this.eventInfo = this.eventData.eventInfo
    this.loaded = true
  },
  watch: {
    '$route.params.id': {
      async handler () {
        await this.getDescription(this.$route.params.id)
      },
      immediate: true,
      deep: true
    },
    eventData: {
      deep: true,
      immediate: true,
      handler () {
        this.eventInfo = this.eventData.eventInfo
      }
    }
  },
  methods: {
    async getDescription (id) {
      await this.getEventDescription(id)
    },
    /**
     * Remove event from the list
     * @returns {Promise<void>}
     */
    async remove () {
      await this.removeEvent(this.eventInfo.id)
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
