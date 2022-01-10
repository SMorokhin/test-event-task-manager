<template>
  <v-app class="app">
    <v-main
    >
      <event-container :params="params">
        <template v-slot:default="{ events }">
          <v-container>
            <div class="flex-row mb-15">
              <div class="header-name">Events</div>
              <div class="toolbar">
              <div>
                <search v-model="params.search"/>
              </div>
              <div>
                <date-picker v-model="params.dates"/>
              </div>
              <v-btn color="warning" text class="ml-2" @click="reset">
                Reset
              </v-btn>
              <div class="btn">
                <create-modal/>
              </div>
              </div>
            </div>
            <div class="d-flex flex-row justify-lg-space-between">
              <div class="flex-column listItem">
                <event-list-item
                  @isActive="onIsActive"
                  v-for="event in events"
                  :key="event.id"
                  :value="event"
                  :active="event.id === active"
                />
              </div>
              <router-view/>
            </div>
          </v-container>
        </template>
      </event-container>
    </v-main>
  </v-app>
</template>

<script>
import DatePicker from './components/UI/datePicker/DatePicker.vue'
import Search from './components/UI/search/Search.vue'
import CreateModal from './components/UI/CreateModal/CreateModal'
import EventContainer from './Containers/EventContainer'
import EventListItem from './components/eventListItem/EventListItem'

const DEFAULT_REQUEST_ARGS = {
  dates: null,
  search: null
}

export default {
  name: 'App',

  components: {
    DatePicker,
    Search,
    CreateModal,
    EventContainer,
    EventListItem
  },

  data () {
    return {
      params: {
        ...DEFAULT_REQUEST_ARGS
      },
      active: null
    }
  },

  methods: {
    checkLoad (value) {
      console.log(value)
      console.log('loaded')
    },

    onIsActive (value) {
      this.active = value
    },

    reset () {
      this.params = {
        ...DEFAULT_REQUEST_ARGS
      }
    }
  }
}
</script>

<style>
.toolbar {
  display: flex;
}

.app {
  background: #e5e5e5 !important;
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
}

.btn {
  margin-left: auto;
}

.listItem {
  background: white;
  width: 340px;
  border-radius: 8px;
  padding-left: 28px;
  padding-right: 21px;
  padding-top: 28px;
  overflow-y: scroll;
  max-height: 657px;
}
</style>
