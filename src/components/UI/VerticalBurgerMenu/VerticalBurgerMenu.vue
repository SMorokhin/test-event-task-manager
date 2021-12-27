<template>
  <v-menu
    bottom
    left
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        dark
        icon
        v-bind="attrs"
        v-on="on"
      >
        <v-icon class="icon-color">mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="item in listItems"
        :key="item.name">
        <v-list-item-title
          class="list-item-title"
          @click="emittedEvent(item.method)">{{ item.name }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'VerticalBurgerMenu',

  props: {
    listItems: {
      type: Array,
      required: true
    }
  },

  methods: {
    emittedEvent (method) {
      this.$emit(method)
    }
  }
}
</script>

<style scoped>
.list-item-title {
  cursor: pointer;
}

.icon-color {
  color: #343A40 !important;
}
</style>
