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
  }
}
