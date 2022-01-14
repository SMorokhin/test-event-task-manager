<template>
  <router-link
    class="router-link"
    :to="{
          name: 'EventDescriptionContainer',
          params: { id: event.id },
        }">
    <div class="item"
         :class="{ 'active': isActive }"
         :style="isActive ? { borderRight: `3px solid ${ event.category.color}` } : null">
      <div class="item__time">{{ timeLine }}</div>
      <div class="item__name">{{ event.name }}</div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'EventListItem',

  props: {
    event: {
      type: Object,
      required: true
    }
  },

  computed: {
    isActive () {
      return parseInt(this.$route.params.id) === this.event.id
    },

    timeLine () {
      return this.event.from.getHours() +
        ':' +
        (this.event.from.getMinutes() < 10 ? '0' : '') + this.event.from.getMinutes() +
        ' - ' +
        this.event.till.getHours() +
        ':' +
        (this.event.till.getMinutes() < 10 ? '0' : '') + this.event.till.getMinutes()
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

.item {
  padding: 3px;
  margin-bottom: 4px;
  cursor: pointer;
  text-decoration: none;
  font-size: 12px;

  &:hover {
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
