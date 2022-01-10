export default {
  name: 'DatePicker',

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    value: {
      type: Object,
      validator (value) {
        return value == null || (value.from instanceof Date && value.till instanceof Date)
      }
    },

    width: {
      type: String,
      default: '238px'
    }
  },

  data () {
    return {
      active: false,
      dates: []
    }
  },

  computed: {
    pickerDateValue: {
      get () {
        return this.dates
      },

      set (value) {
        this.dates = value.sort()
      }
    },

    dateRangeText () {
      return this.value
        ? new Intl.DateTimeFormat('ru-RU')
          .format(this.value.from) +
        ' - ' +
        new Intl.DateTimeFormat('ru-RU')
          .format(this.value.till)
        : null
    }
  },

  watch: {
    value (value) {
      if (value) {
        this.dates = [
          value.from,
          value.till
        ]
      } else {
        this.dates = []
      }
    }
  },

  methods: {
    accept () {
      this.emit({
        from: new Date(this.dates[0]),
        till: new Date(this.dates[1])
      })
    },

    clear () {
      this.dates = []
      this.emit(null)
    },

    emit (args) {
      this.active = false
      this.$emit('change', args)
    }
  }
}
