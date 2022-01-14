<template>
  <div>
    <div class="header-date"
         :class="{ 'header-date--today': isToday }">
      {{ formatDateWeekday }}
    </div>
    <event-list-item v-for="event in group.events"
                     :key="event.id"
                     :event="event"/>
  </div>
</template>

<script>
import EventListItem from '../eventListItem/EventListItem'

const MILLISECONDS_DAY = 86400000

export default {
  name: 'EventListGroup',

  components: {
    EventListItem
  },

  data () {
    return {
      today: new Date().setHours(0, 0, 0, 0)
    }
  },

  props: {
    group: {
      type: Object,
      required: true
    }
  },

  computed: {
    isToday () {
      return this.today === this.group.date
    },

    formatDateWeekday () {
      const tomorrow = this.today + MILLISECONDS_DAY
      const yesterday = this.today - MILLISECONDS_DAY

      const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' })
        .format(this.group.date)
        .toUpperCase()
      const day = Intl.DateTimeFormat('en-US')
        .format(this.group.date)

      switch (this.group.date) {
        case yesterday:
          return `YESTERDAY ${day}`
        case tomorrow:
          return `TOMORROW ${day}`
        case this.today:
          return `TODAY ${day}`
        default:
          return `${weekday} ${day}`
      }
    }
  }
}
</script>

<style scoped lang="scss">
.header-date {
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  color: #868E96;

  &--today {
    color: #3B82F6;
  }
}

.router-link {
  cursor: pointer;
  text-decoration: none;
  font-size: 12px;
}
</style>
