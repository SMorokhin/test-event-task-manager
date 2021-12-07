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
        @click="targetEvent(data.id)"
        :class="{ active: target === data.id}"
      >
        <div> {{ data.begDate }} - {{ data.endDate }} </div>
        <div class="event-name"> {{ data.name }} </div>
      </div>
    </div>
  </div>
</template>

<script src="./eventlist.js"></script>
<style scoped lang="scss" src="./eventlist.scss"/>
