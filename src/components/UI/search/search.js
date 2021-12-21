export default {
  name: 'Search',
  model: {
    value: ''
  },
  props: {
    width: {
      type: String,
      default: '238px'
    }
  },
  data () {
    return {
      modelValue: ''
    }
  }
}
