<template>
  <v-app class="app">
    <v-main
    >
      <event-container :params="params">
        <template v-slot:default="{ groupedEvents }">
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
                  <router-link
                    class="router-link"
                    :to="{ name: 'events.event.create' }">
                    <v-btn
                      color="blue"
                      textx
                    >
                      Create
                    </v-btn>
                  </router-link>
                </div>
              </div>
            </div>
            <div class="d-flex flex-row justify-lg-space-between">
              <div class="flex-column listItem">
                <event-list-group
                  v-for="group in groupedEvents"
                  :key="group.date"
                  :group="group"
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
import EventContainer from './Containers/EventContainer'
import EventListGroup from './components/eventList/eventListGroup/EventListGroup'

const DEFAULT_REQUEST_ARGS = {
  dates: null,
  search: null
}

export default {
  name: 'App',

  components: {
    DatePicker,
    Search,
    EventContainer,
    EventListGroup
  },

  data () {
    return {
      params: {
        ...DEFAULT_REQUEST_ARGS
      },
      inputCheck: null
    }
  },

  methods: {
    reset () {
      this.params = {
        ...DEFAULT_REQUEST_ARGS
      }
    }
  }
}
</script>

<style lang="scss">
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
  box-shadow: 0px 2px 12px rgba(37, 51, 66, 0.15);

  &::-webkit-scrollbar {
    width: 5px;
    background-color: #ffffff;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #8E9FAD;
  }

  &::-webkit-scrollbar-track {
    border-radius: 5px;
    background-color: #ffffff;
  }
}
</style>
