<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="700px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
      >
        Create
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Create Event</span>
      </v-card-title>
      <v-card-text>
        <div class="d-flex justify-lg-space-between">
          <div class="d-flex">
            <div class="d-flex flex-column">
              Title
              <v-text-field
                label="Title"
                solo
                required
                v-model="title"
              ></v-text-field>
            </div>
          </div>
          <div class="d-flex">
            <div class="flex-column">
              Date
              <v-datetime-picker
                label="Select date and time"
                :text-field-props="textFieldProps"
                v-model="dateTime"
              >
                <template slot="dateIcon">
                  <v-icon>mdi-calendar</v-icon>
                </template>
                <template slot="timeIcon">
                  <v-icon>mdi-clock</v-icon>
                </template>
              </v-datetime-picker>
              <v-checkbox
                v-model="repeat"
                label="Repeat"
              ></v-checkbox>
            </div>
          </div>
        </div>
        <div class="d-flex justify-lg-space-between">
          <div class="flex-column">
            Category
            <v-select
              solo
              v-model="selectedEventCategory"
              :items="eventCategory.map(e => e.name)"
            ></v-select>
          </div>
          <div class="flex-column">
            Participants
            <v-select
              prepend-inner-icon="mdi-magnify"
              solo
              chips
              multiple
              attach
              deletable-chips
              v-model="selectedParticipant"
              :items="participants.map(e => e.fls)"
            ></v-select>
          </div>
        </div>
        <div class="d-flex flex-column">
          Description
          <v-textarea
            solo
            v-model="description"
            name="input-7-4"
            label="Description"
          ></v-textarea>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          text
          @click="dialog = false"
        >
          Close
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="save()"
          :disabled="!formValid"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import * as eventAPI from '../../../eventAPI'

export default {
  name: 'CreateModal',

  components: {},

  data () {
    return {
      dialog: false,
      repeat: false,
      title: '',
      description: '',
      selectedParticipant: [],
      selectedEventCategory: '',
      dateTime: null,
      textFieldProps: {
        prependInnerIcon: 'mdi-calendar',
        solo: true
      },
      eventCategory: [],
      participants: []
    }
  },

  inject: [
    'addNewEventToEventList',
    'getEventDescription',
    'saveEvent'
  ],

  async created () {
    await this.getEventType()
    await this.getParticipants()
  },

  methods: {
    clearFields () {
      this.title = ''
      this.dateTime = null
      this.description = ''
      this.selectedEventCategory = ''
      this.selectedParticipant = []
      this.repeat = false
    },

    async getEventType () {
      this.eventCategory = await eventAPI.getEventType()
    },

    async getParticipants () {
      this.participants = await eventAPI.getParticipants()
    },

    async save () {
      this.dialog = false
      await this.saveEvent({
        name: this.title,
        description: this.description,
        begDate: this.begDateTimeToIsoString,
        endDate: this.endDateTimeToIsoString,
        participant: this.participantsList,
        eventTypeId: this.getEventTypeId,
        repeat: this.repeat
      })
      this.clearFields()
    }
  },

  computed: {
    /**
     * Returns string of participants which was selected by one line, devided by ','
     * @returns {*}
     */
    participantsList () {
      const len = this.selectedParticipant.length - 1
      return this.selectedParticipant.reduce((acc, el, idx) =>
        idx === len ? acc + el : acc + el + ', ', '')
    },

    /**
     * Returns event's ID by event name
     * @returns {null|*}
     */
    getEventTypeId () {
      if (this.selectedEventCategory) {
        const result = this.eventCategory.find(el => {
          return el.name === this.selectedEventCategory
            ? el.id
            : null
        })
        return result.id
      } return null
    },

    /**
     * Parsing beg date to "yyyy-mm-dd hh:mm" format
     * @returns {string|null}
     */
    begDateTimeToIsoString () {
      if (this.dateTime !== null) {
        return this.dateTime[0].toISOString().slice(0, 10) + ' ' + this.dateTime[1]
      } return null
    },

    /**
     * Parsing end date to "yyyy-mm-dd hh:mm" format
     * @returns {string|null}
     */
    endDateTimeToIsoString () {
      if (this.dateTime !== null) {
        return this.dateTime[0].toISOString().slice(0, 10) + ' ' + this.dateTime[2]
      } return null
    },

    /**
     * Validates input blocks
     * @returns {null|string}
     */
    formValid () {
      return this.dateTime &&
        this.description &&
        this.selectedEventCategory &&
        this.title
    }
  }
}
</script>

<style scoped>
.v-input {
  width: 301px;
}
</style>
