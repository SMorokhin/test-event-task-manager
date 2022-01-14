import VerticalBurgerMenu from '../UI/VerticalBurgerMenu/VerticalBurgerMenu'
import EventDescriptionContainer from '../../Containers/EventDescriptionContainer'

export default {
  name: 'EventDescription',

  data () {
    return {
      listItemsProps: [{
        name: 'Удалить',
        method: 'removeEvent'
      }]
    }
  },

  inject: [
    'remove'
  ],

  props: {
    id: {
      required: true
    },
    eventInfo: {
      type: Object,
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
