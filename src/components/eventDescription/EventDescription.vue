<template>
  <div class="description-container">
    <div v-if="eventInfo">
      <v-row justify="space-between">
        <v-col cols="auto">
          <div class="head__name">
            {{ eventInfo.name }}
          </div>
          <div class="d-flex">
            <div class="head__day">
              {{ formatWeekdayDate }}
            </div>
            <div class="head__time">
              <div :style="{ background: eventInfo.category.color }"
                   class="pe-md-2 rounded-circle d-inline-block"
              >&nbsp;
              </div>
              {{ getTimeLine }}
            </div>
          </div>
        </v-col>
        <v-col cols="auto">
          <vertical-burger-menu
            @removeEvent="remove(id)"
            @updateEvent="update"
            :list-items="listItemsProps">
          </vertical-burger-menu>
        </v-col>
      </v-row>
      <v-row class="participant-container">
        <v-col v-if="participantsList.length">
          {{ participantsList }}
        </v-col>
        <v-col v-else>
          No participants for this event
        </v-col>
      </v-row>
      <v-row>
        <v-col class="description-content">
          {{ eventInfo.description }}
        </v-col>
      </v-row>
    </div>
    <div v-else>
      Event by searched ID is not found.
    </div>
   <router-view/>
  </div>
</template>
<script src="./eventdescription.js"></script>
<style scoped lang="scss" src="./eventdescription.scss"/>
