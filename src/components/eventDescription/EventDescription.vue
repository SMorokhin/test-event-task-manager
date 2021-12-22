<template>
  <div class="description-container">
    <div v-if="loaded">
      <v-row justify="space-between">
        <v-col cols="auto">
          <div class="head">
            {{ this.eventInfo.name }}
          </div>
          <div class="d-flex">
            <div class="head__day">
              {{ this.getLongDay }}&nbsp;{{ this.eventInfo.begDate.slice(0, 10) }}
            </div>
            <div class="head__time">
              <div :style="{ background: eventInfo.category.color }"
                   class="pe-md-5 rounded-circle d-inline-block"
              >&nbsp;</div>
              {{ this.getTimeLine }}
            </div>
          </div>
        </v-col>
        <v-col cols="auto">
          <vertical-burger-menu
            @removeEvent="removeEvent"
            :list-items="listItemsProps">
          </vertical-burger-menu>
        </v-col>
      </v-row>
      <v-row class="participant-container">
        <v-col>
          {{ this.eventInfo.participant }}
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          {{ this.eventInfo.description }}
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script src="./eventdescription.js"></script>
<style scoped lang="scss" src="./eventdescription.scss"/>
