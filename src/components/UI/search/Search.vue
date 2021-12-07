<template>
  <div class="select">
    <v-text-field
      label="Search"
      solo
      :style="{ width: this.width}"
      prepend-inner-icon="mdi-magnify"
    ></v-text-field>
  </div>
</template>

<script src="./search.js"></script>
<style scoped lang="scss" src="./search.scss"/>
