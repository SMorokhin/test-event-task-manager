<template>
  <div class="select">
    <v-text-field
      @input="$emit('input', modelValue)"
      v-model="modelValue"
      label="Search"
      solo
      :style="{ width: this.width }"
      prepend-inner-icon="mdi-magnify"
    ></v-text-field>
  </div>
</template>

<script src="./search.js"></script>
<style scoped lang="scss" src="./search.scss"/>
