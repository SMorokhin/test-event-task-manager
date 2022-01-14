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
        <v-card :disabled="!loaded">
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
                  :items="itemCategoriesSelect"
                ></v-select>
              </div>
              <div class="flex-column">
                Participants
                <v-select
                  prepend-inner-icon="mdi-magnify"
                  solo
                  chips
                  multiple
                  deletable-chips
                  v-model="selectedParticipant"
                  :items="itemParticipantsSelect"
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

  async created () {
    this.eventCategories = Object.values(await eventAPI.cCategories)
    eventAPI.participants
      .then(response => {
        this.participants = response.data
      })
    this.loaded = true
  },

  data () {
    return {
      dialog: false,
      repeat: false,
      loaded: false,
      title: '',
      description: '',
      selectedParticipant: [],
      selectedEventCategory: '',
      dateTime: null,
      eventCategories: [],
      participants: [],

      textFieldProps: {
        prependInnerIcon: 'mdi-calendar',
        solo: true
      }
    }
  },

  inject: ['refresh'],

  methods: {
    clearFields () {
      this.title = ''
      this.dateTime = null
      this.description = ''
      this.selectedEventCategory = ''
      this.selectedParticipant = []
      this.repeat = false
    },

    async save () {
      this.loaded = false
      await eventAPI.saveEvent({
        name: this.title,
        description: this.description,
        begDate: this.dateTime,
        endDate: this.dateTime,
        participant: this.participantsList,
        eventTypeId: this.selectedEventCategory,
        repeat: this.repeat
      })
      this.clearFields()
      await this.refresh()
      this.loaded = true
      this.dialog = false
    }
  },

  computed: {
    itemCategoriesSelect () {
      return this.eventCategories.map(el => {
        return {
          text: el.name,
          value: el.id
        }
      })
    },

    itemParticipantsSelect () {
      return this.participants.map(el => {
        return {
          text: el.fls,
          value: el.id
        }
      })
    },

    /**
     * Returns string of participants which was selected by one line, devided by ','
     * Нет необходимости, теперь передаются id участников, в данном ВС пропала необходимость
     * но необходимо переделать логику и структуру файла db.json в json-server
     * По хорошему. рпосто отсылаю id, а что поместить оп данному id выбирается на бэке
     * @returns {*}
     */
    participantsList () {
      const len = this.selectedParticipant.length - 1
      return this.selectedParticipant.reduce((acc, el, idx) =>
        idx === len ? acc + el : acc + el + ', ', '')
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
