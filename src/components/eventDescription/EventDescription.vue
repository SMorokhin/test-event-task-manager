<template>
  <div class="description-container">
    <div v-if="eventInfo">
      <div class="head">
        {{ this.eventInfo.name }}
      </div>
      <div class="d-flex">
        {{ this.eventInfo.begDate }} - {{ this.eventInfo.endDate }}
      </div>
      <div>
        {{ this.eventInfo.participant }}
      </div>
      <div>
        {{ this.eventInfo.description }}
      </div>
    </div>
  </div>
</template>
<script src="./eventdescription.js"></script>
<style scoped lang="scss" src="./eventdescription.scss"/>
