<template>
  <loading-spinner v-if=" loading" class="spin"/>
  <custom-modal v-else
                v-model="inputData"
                :initial-input="initialInput"
                :dialog="dialog">
    <template v-slot:dialogTitle>
      <span class="text-h5">Update Event</span>
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
          @click="update"
          :disabled="!formValid"
        >
          Update
        </v-btn>
      </v-card-actions>
    </template>
  </custom-modal>
</template>

<script>
import CustomModal from '../../UI/CreateModal/CustomModal'
import * as eventAPI from '../../../eventAPI'
import LoadingSpinner from '../../UI/loadingSpinner/LoadingSpinner'

export default {
  name: 'UpdateEventDialog',

  data () {
    return {
      dialog: true,
      initialInput: null,
      inputData: {},
      loading: false
    }
  },

  created () {
    this.initialInput = {
      title: this.event.name,
      description: this.event.description,
      dateTime: this.event.from,
      // предполагается, что будет с бэка приходить массив чисел, а не строка, перечисляющая участников, следовательно
      // такой конструкции не будет.
      selectedParticipant: this.event.participant,
      selectedEventCategory: this.event.category.id,
      repeat: this.event.repeat
    }
  },

  components: {
    CustomModal,
    LoadingSpinner
  },

  props: {
    event: {
      type: Object,
      required: true
    }
  },

  inject: ['refresh', 'getDescription'],

  methods: {
    async update () {
      try {
        await eventAPI.updateEvent(this.event.id, {
          name: this.inputData.title,
          description: this.inputData.description,
          begDate: this.inputData.dateTime,
          endDate: this.inputData.dateTime,
          participant: this.inputData.selectedParticipant,
          eventTypeId: this.inputData.selectedEventCategory,
          repeat: this.inputData.repeat
        })
        await this.refresh()
        await this.getDescription(this.event.id)
      } catch (e) {
        console.log(e)
      } finally {
        this.$router.back()
      }
    },

    close () {
      this.dialog = false
      this.$router.back()
    }
  },

  computed: {
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

<style scoped lang="scss">
.spin {
  position: fixed;
}
</style>
