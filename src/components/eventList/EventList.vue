<template>
  <div class="list-container" id="list-container">
    <div
      v-for="(el, idx) in this.groupEventList"
      :key="el.id"
    >
      <div class="date-header">{{ idx }}</div>
      <div
        v-for="data in el"
        :key="data.id"
        class="event-description"
        :class="{
          active: $route.params.id === data.id,
          active__success: $route.params.id === data.id && data.category.id === 1,
          active__warning: $route.params.id === data.id && data.category.id === 2,
          active__error: $route.params.id === data.id && data.category.id === 3
        }"
      >
        <router-link class="routerLink"
          :to="{
          name: 'EventDescription',
          params: { id: data.id }
        }">
          <div>
            <div :style="{ background: data.category.color }"
                 class="pe-2 rounded-circle d-inline-block"
            >&nbsp;</div>
            {{ data.begDate.slice(10) }} - {{ data.endDate.slice(10) }}</div>
          <div class="event-name"> {{ data.name }}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script src="./eventlist.js"></script>
<style scoped lang="scss" src="./eventlist.scss"/>
