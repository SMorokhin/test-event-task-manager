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
  }
}
