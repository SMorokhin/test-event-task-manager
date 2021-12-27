export default {
  name: 'DatePicker',

  props: {
    width: {
      type: String,
      default: '238px'
    }
  },

  data () {
    return {
      dates: [],
      menu: false
    }
  },

  methods: {
    clearDates () {
      this.dates = []
      this.$refs.menu.save([])
    }
  }
}
