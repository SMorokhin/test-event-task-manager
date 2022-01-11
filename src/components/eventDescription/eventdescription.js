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

  inject: ['refresh', 'remove', 'getEventDescription'],

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
    this.eventInfo = await this.getEventDescription(this.$attrs.id)
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
     * Get time interval of event activity
     * @returns {string}
     */
    getTimeLine () {
      const from = new Date(this.eventInfo.begDate)
      const till = new Date(this.eventInfo.endDate)
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
