<template>
  <v-app class="app">
    <v-main>
      <v-container class="container">
        <event-container :params="params">
          <div class="header-name">
            Events
          </div>
          <div class="d-flex mb-15">
            <div>
              <search v-model="searchText"/>
            </div>
            <div>
              <date-picker v-model="searchDates"/>
            </div>
            <v-btn color="warning"
                   text
                   class="ml-2"
                   @click="reset">
              Reset
            </v-btn>
            <div class="btn">
              <create-modal/>
            </div>
          </div>
          <div class="d-flex flex-row justify-lg-space-between">
            <event-list-container :params="params"/>
            <router-view/>
          </div>
        </event-container>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import DatePicker from './components/UI/datePicker/DatePicker.vue'
import Search from './components/UI/search/Search.vue'
import CreateModal from './components/UI/CreateModal/CreateModal'
import EventContainer from './Containers/EventContainer'
import EventListContainer from './Containers/EventListContainer'

const DEFAULT_REQUEST_ARGS = {
  date: [],
  search: ''
}

export default {
  name: 'App',

  components: {
    DatePicker,
    Search,
    CreateModal,
    EventContainer,
    EventListContainer
  },

  data () {
    return {
      searchText: '',
      searchDates: [],
      params: {
        ...DEFAULT_REQUEST_ARGS
      },
      eventData: []
    }
  },

  watch: {
    searchText: {
      immediate: true,
      handler () {
        this.params.search = this.searchText
      }
    },

    searchDates: {
      immediate: true,
      handler () {
        this.params.date = this.searchDates
      }
    }
  },

  methods: {
    reset () {
      this.params = {
        ...DEFAULT_REQUEST_ARGS
      }
      this.searchText = ''
    }
  }
}

</script>

<style>
.app {
  background: #E5E5E5 !important;
}

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
