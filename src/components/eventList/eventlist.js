export default {
  name: 'EventList',
  props: {
    groupEventList: {
      type: Object,
      required: true
    },
    currentEventId: {
      type: Number
    },
    isActiveStyle: {
      type: Object
    }
  },

  filters: {
    getTimeLine (value) {
      return value.begDate.slice(10) +
        ' - ' +
        value.endDate.slice(10)
    }
  }
}
