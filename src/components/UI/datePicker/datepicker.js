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
      dates: ['2021-12-01', '2021-12-02'],
      menu: false
    }
  }
}
