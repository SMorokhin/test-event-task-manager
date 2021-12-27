<template>
  <div class="list-container" id="list-container">
    <div
      v-for="(el, idx) in groupEventList"
      :key="el.id"
    >
      <div class="date-header">{{ idx }}</div>
      <div v-for="data in el"
           :key="data.id"
           class="event-description"
           :style="data.id === currentEventId ? isActiveStyle : null">
        <router-link class="routerLink"
                     :to="{
          name: 'EventDescription',
          params: { id: data.id }
        }">
          <div>
            <div :style="{ background: data.category.color }"
                 class="pe-2 rounded-circle d-inline-block">&nbsp;
            </div>
            {{ data | getTimeLine }}
          </div>
          <div class="event-name">
            {{ data.name }}
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script src="./eventlist.js"></script>
<style scoped lang="scss" src="./eventlist.scss"/>
