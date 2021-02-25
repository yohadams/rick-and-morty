<template>
  <div id='header'></div>
  <div id='tabs'></div>
  <AllCharacters id='table' />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AllCharacters from './pages/AllCharacters.vue';

export default defineComponent({
  name: 'App',
  components: { AllCharacters }
});
</script>

<style>
@import './assets/css/global.css';

#app {
  min-height: 100vh;
  display: grid;
  grid-template-areas: 'header'
                       'tabs'
                       'table';
  grid-template-rows: 135px 78px auto;
  grid-template-columns: 1fr;
}

#header {
  grid-area: header;
  background-color: red;
}

#tabs {
  grid-area: tabs;
  background-color: blue;
}

#table {
  grid-area: table;
}
</style>
