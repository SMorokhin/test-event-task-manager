<template>
      <div
        class="date-picker"
        :style="{ width: this.width }"
      >
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="dates"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-combobox
            v-model="dates"
            multiple
            range
            prepend-inner-icon="mdi-calendar"
            readonly
            solo
            v-bind="attrs"
            v-on="on"
          ></v-combobox>
        </template>
        <v-date-picker
          v-model="dates"
          @input="$emit('input', dates)"
          multiple
          range
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="error"
            @click="menu = false; $refs.menu.save([])"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(dates)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </div>
</template>

<script src="./datepicker.js"></script>
<style scoped lang="scss" src="./datepicker.scss"></style>
