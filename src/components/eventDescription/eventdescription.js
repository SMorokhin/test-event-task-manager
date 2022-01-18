import VerticalBurgerMenu from '../UI/VerticalBurgerMenu/VerticalBurgerMenu'
import EventDescriptionContainer from '../../Containers/EventDescriptionContainer'

export default {
  name: 'EventDescription',

  data () {
    return {
      listItemsProps: [{
        name: 'Remove',
        method: 'removeEvent'
      },
      {
        name: 'Update',
        method: 'updateEvent'
      }]
    }
  },

  inject: [
    'remove',
    'update'
  ],

  props: {
    id: {
      required: true
    },
    eventInfo: {
      type: Object,
      required: true
    },
    participantsList: {
      type: String,
      required: true
    },
    formatWeekdayDate: {
      type: String,
      required: true
    },
    getTimeLine: {
      type: String,
      required: true
    }
  },

  components: {
    VerticalBurgerMenu,
    EventDescriptionContainer
  }
}
