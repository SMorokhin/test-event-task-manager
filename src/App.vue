<template>
  <v-app style="background: #E5E5E5">
    <v-main>
      <v-container class="container">
        <div class="header-name">
          Events
        </div>
        <div class="d-flex mb-15">
          <div>
            <search v-model="searchText"></search>
          </div>
          <div>
            <date-picker v-model="searchDates"></date-picker>
          </div>
          <div class="btn">
            <create-modal @getEventsList="pGetEventsList"></create-modal>
          </div>
        </div>
        <div class="d-flex flex-row justify-lg-space-between">
          <event-list
            ref="cGetEventsList"
            :search-text="searchText"
            :search-dates="searchDates"
          ></event-list>
          <router-view @removeEvent="pGetEventsList"/>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import EventList from './components/eventList/EventList.vue'
import DatePicker from './components/UI/datePicker/DatePicker.vue'
import Search from './components/UI/search/Search.vue'
import CreateModal from './components/UI/CreateModal/CreateModal'

export default {
  name: 'App',
  components: {
    EventList,
    DatePicker,
    Search,
    CreateModal
  },
  data: () => ({
    searchText: '',
    searchDates: []
  }),
  computed: {
  },
  methods: {
    pGetEventsList () {
      this.$refs.cGetEventsList.getEventsList()
    }
  }
}
</script>

<style>
.container {
  width: 1068px;
  box-sizing: border-box;
  padding: 0;
}

.header-name {
  width: 1068px;
  margin-top: 68px;
  margin-bottom: 41px;
  font-size: 24px;
  font-width: 500;
}

.btn {
  margin-left: auto;
}
</style>
