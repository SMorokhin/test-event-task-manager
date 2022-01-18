<template>
  <v-dialog
    v-model="dialog"
    v-if="input"
    persistent
    max-width="700px"
  >
    <v-card>
      <v-card-title>
        <slot name="dialogTitle"/>
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
                v-model="input.title"
                @input="$emit('input', input)"
              ></v-text-field>
            </div>
          </div>
          <div class="d-flex">
            <div class="flex-column">
              Date
              <v-datetime-picker
                label="Select date and time"
                :text-field-props="textFieldProps"
                v-model="input.dateTime"
                @input="$emit('input', input)"
              >
                <template slot="dateIcon">
                  <v-icon>mdi-calendar</v-icon>
                </template>
                <template slot="timeIcon">
                  <v-icon>mdi-clock</v-icon>
                </template>
              </v-datetime-picker>
              <v-checkbox
                v-model="input.repeat"
                @input="$emit('input', input)"
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
              v-model="input.selectedEventCategory"
              @input="$emit('input', input)"
              :items="eventCategories"
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
              v-model="input.selectedParticipant"
              @input="$emit('input', input)"
              :items="participants"
            ></v-select>
          </div>
        </div>
        <div class="d-flex flex-column">
          Description
          <v-textarea
            solo
            v-model="input.description"
            @input="$emit('input', input)"
            name="input-7-4"
            label="Description"
          ></v-textarea>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <slot name="controlButtons"/>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import * as eventAPI from '../../../eventAPI'

export default {
  name: 'CustomModal',

  async created () {
    eventAPI.categories
      .then(response => {
        this.eventCategories = Object.values(response).map(el => {
          return {
            text: el.name,
            value: el.id
          }
        })
      })
    eventAPI.participants
      .then(response => {
        this.participants = response.data.map(el => {
          return {
            text: el.fls,
            value: el.id
          }
        })
      })
    this.input = this.initialInput
  },

  data () {
    return {
      input: null,
      eventCategories: [],
      participants: [],

      textFieldProps: {
        prependInnerIcon: 'mdi-calendar',
        solo: true
      }
    }
  },

  props: {
    dialog: {
      type: Boolean,
      required: true
    },
    initialInput: {
      type: Object,
      default: () => {
        return {
          title: null,
          description: null,
          dateTime: null,
          selectedParticipant: [],
          selectedEventCategory: null,
          repeat: false
        }
      }
    }
  }
}
</script>

<style scoped>
.v-input {
  width: 301px;
}
</style>
