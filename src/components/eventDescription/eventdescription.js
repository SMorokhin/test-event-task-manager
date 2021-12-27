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
    // this.eventInfo = this.eventData.eventInfo
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
      const date = new Date(this.eventInfo.endDate)
      // get day format m/d/yyyy
      const day = new Intl.DateTimeFormat('en-US').format(date)
      // get name of week
      const WeekDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date)
      return WeekDay + ' ' + day
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
