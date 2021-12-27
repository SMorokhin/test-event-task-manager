export default {
  name: 'Search',

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
  },

  watch: {
    '$attrs.value': {
      deep: true,
      immediate: true,
      handler () {
        this.modelValue = this.$attrs.value
      }
    }
  }
}
