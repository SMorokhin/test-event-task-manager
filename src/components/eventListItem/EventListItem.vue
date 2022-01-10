<template>
  <router-link
    class="router-link"
    :to="{
          name: 'EventDescription',
          params: {
            id: value.id,
            value: value },
        }">
    <div class="item">
      <div
        class="item__content"
        @click="isActive"
        :class="{ active: active }"
        :style="active ? activeItemBorder : null">
        <div class="item__date"
             :style="isToday">{{ eventDate }}</div>
        <div class="item__time">{{ timeLine }}</div>
        <div class="item__name">{{ value.name }}</div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'EventListItem',

  data () {
    return {
      activeItemBorder: {
        borderRight: `3px solid ${this.value.category.color}`
      }
    }
  },

  props: {
    value: {
      type: Object,
      required: true
    },

    active: {
      type: Boolean,
      required: true
    },

    index: {
      type: Number,
      required: true
    }
  },

  methods: {
    isActive () {
      this.$emit('isActive', this.value.id)
    }
  },

  computed: {
    timeLine () {
      const from = new Date(this.value.begDate)
      const till = new Date(this.value.endDate)
      return from.getHours() +
        ':' +
        (from.getMinutes() < 10 ? '0' : '') + from.getMinutes() +
        ' - ' +
        till.getHours() +
        ':' +
        (till.getMinutes() < 10 ? '0' : '') + till.getMinutes()
    },

    eventDate () {
      const date = new Intl.DateTimeFormat('en-US')
        .format(new Date(this.value.begDate))
      const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' })
        .format(new Date(this.value.begDate))
        .toUpperCase()
      return weekday + ' ' + date
    },

    isToday () {
      return new Intl.DateTimeFormat().format(new Date()) === Intl.DateTimeFormat().format(new Date(this.value.begDate))
        ? { color: '#3B82F6' }
        : null
    }
  }
}
</script>

<style scoped lang="scss">
.active {
  background: rgba(59, 130, 246, .1);
  border-radius: 8px 2px 2px 8px;
  color: black;
}
.router-link{
  cursor: pointer;
  text-decoration: none;
  font-size: 12px;
}
.item {
  margin-bottom: 4px;

  &__content {
    padding: 4px;
  }
  &__content:hover{
    background: rgba(59, 130, 246, .1);
    border-radius: 8px 2px 2px 8px;
  }

  &__date {
    color: #868E96;
    text-align: center;
    font-size: 13px;
    font-weight: 700;
  }

  &__time {
    color: black;
  }

  &__name {
    color: #BDBDBD;
  }
}
</style>
