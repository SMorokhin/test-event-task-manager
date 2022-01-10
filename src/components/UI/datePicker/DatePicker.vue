<template>
  <div
    class="date-picker"
    :style="{ width: this.width }"
  >
    <v-menu
      ref="menu"
      v-model="active"
      :close-on-content-click="false"
      :return-value.sync="dates"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="dateRangeText"
          label="Select date range"
          prepend-inner-icon="mdi-calendar"
          readonly
          solo
          v-on="on"
        />
      </template>
      <v-date-picker
        v-model="pickerDateValue"
        range
        no-title
        scrollable
      >
        <v-spacer></v-spacer>
        <v-btn text color="error" @click="clear"> Clear </v-btn>
        <v-btn text color="primary" :disabled="dates.length < 2" @click="accept"> OK </v-btn>
      </v-date-picker>
    </v-menu>
  </div>
</template>

<script src="./datepicker.js"></script>
<style scoped lang="scss" src="./datepicker.scss"></style>
