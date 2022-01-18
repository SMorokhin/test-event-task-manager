<template>
  <loading-spinner v-if="loading" class="spin"/>
  <custom-modal v-else
                v-model="inputData"
                :dialog="dialog">
    <template v-slot:dialogTitle>
      <span class="text-h5">Create Event</span>
    </template>
    <template v-slot:controlButtons>
      <v-card-actions>
        <v-btn
          color="error"
          text
          @click="close"
        >
          Close
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="save"
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
import LoadingSpinner from '../../UI/loadingSpinner/LoadingSpinner'
import * as eventAPI from '../../../eventAPI'

export default {
  name: 'CreateEventDialog',

  components: {
    CustomModal,
    LoadingSpinner
  },

  inject: ['refresh'],

  data () {
    return {
      dialog: true,
      loading: true,
      inputData: null
    }
  },

  created () {
    this.loading = false
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
        this.loading = true
        await eventAPI.saveEvent({
          name: this.inputData.title,
          description: this.inputData.description,
          begDate: this.inputData.dateTime,
          endDate: this.inputData.dateTime,
          participant: this.inputData.selectedParticipant,
          eventTypeId: this.inputData.selectedEventCategory,
          repeat: this.inputData.repeat
        })
        this.clearFields()
        await this.refresh()
        this.loading = false
      } catch (e) {
        console.log(e)
      } finally {
        this.close()
      }
    },

    close () {
      this.dialog = false
      this.$router.back()
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
.spin {
  position: fixed;
}
</style>
