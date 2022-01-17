<template>
    <custom-modal v-model="inputData">
      <template v-slot:dialogTitle>
        <span class="text-h5">Create Event</span>
      </template>
      <template v-slot:controlButtons>
        <v-card-actions>
          <v-btn
            color="blue darken-1"
            text
            @click="save()"
            :disabled="!formValid"
          >
            Create
          </v-btn>
        </v-card-actions>
      </template>
    </custom-modal>
</template>

<script>
import CustomModal from '../../UI/CreateModal/CustomModal'
import * as eventAPI from '../../../eventAPI'

export default {
  name: 'CreateEventDialog',

  components: {
    CustomModal
  },

  inject: ['refresh'],

  data () {
    return {
      inputData: null
    }
  },

  methods: {
    clearFields () {
      this.inputData.title = ''
      this.inputData.dateTime = null
      this.inputData.description = ''
      this.inputData.selectedEventCategory = ''
      this.inputData.selectedParticipant = []
      this.inputData.repeat = false
    },

    async save () {
      try {
        await eventAPI.saveEvent({
          name: this.inputData.title,
          description: this.inputData.description,
          begDate: this.inputData.dateTime,
          endDate: this.inputData.dateTime,
          participant: this.inputData.selectedParticipant.join(', '),
          eventTypeId: this.inputData.selectedEventCategory,
          repeat: this.inputData.repeat
        })
        this.clearFields()
        await this.refresh()
      } catch (e) {
        console.log(e)
      }
    }
  },

  computed: {
    /**
     * Validates input blocks
     * @returns {null|string}
     */
    formValid () {
      return this.inputData
        ? this.inputData.dateTime &&
        this.inputData.description &&
        this.inputData.selectedEventCategory &&
        this.inputData.title
        : null
    }
  }
}
</script>

<style scoped>

</style>
