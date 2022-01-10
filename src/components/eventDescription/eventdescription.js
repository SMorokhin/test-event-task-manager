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

  inject: ['refresh', 'remove'],

  props: {
    value: {
      type: Object,
      default: null
    }
  },

  components: {
    VerticalBurgerMenu
  },

  async created () {
    this.loaded = true
  },

  methods: {
    /**
     * Remove event from the list
     * @returns {Promise<void>}
     */
    async removeEvent () {
      this.loaded = false
      await this.remove(this.value.id)
      await this.refresh()
      this.eventInfo = null
      this.loaded = true
    }
  },

  watch: {
    value: {
      immediate: true,
      deep: true,
      handler () {
        this.eventInfo = this.value
      }
    }
  },

  computed: {
    /**
     * Get long name of day
     * @returns {string}
     */
    getLongDay () {
      const date = new Date(this.value.endDate)
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
      const from = new Date(this.value.begDate)
      const till = new Date(this.value.endDate)
      return from.getHours() +
        ':' +
        (from.getMinutes() < 10 ? '0' : '') + from.getMinutes() +
        ' - ' +
        till.getHours() +
        ':' +
        (till.getMinutes() < 10 ? '0' : '') + till.getMinutes()
    }
  }
}
