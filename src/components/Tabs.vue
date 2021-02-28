<template>
  <div class="grid">
    <button class="bold grid-padding" @click="tabToggle('all')" :class="{ selected: selected === 'all' }">All Characters</button>
    <button class="bold" @click="tabToggle('fav')" :class="{ selected: selected === 'fav' }">Favorites</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Tabs',
  props: {
    selected: String,
  },
  setup(props, { emit }) {
    const tabToggle = (type: String) => { emit('tabToggle', { type }); };

    return { tabToggle };
  }
});
</script>

<style scoped>
  .grid {
    display: grid;
    width: 100%;
    column-gap: 80px;
    grid-template-columns: 140px 115px 74px 1fr;
    justify-items: self-start;
    align-items: center;
  }

  .grid-padding {
    grid-column-start: 2;
  }

  @media (max-width:835px) { 
    .grid {
      justify-items: center;
      grid-template-columns: 0px 115px 74px;
      column-gap: 16px;
    }
  }

  .grid > button {
    font-weight: 500;
    border: none;
    background-color: var(--background-color);
    font-size: 16px;
    cursor: pointer;
  }

  button.selected {
    color: var(--secondary-color);
    border-bottom: 3px solid var(--secondary-color);
    margin-bottom: -3px;
  }


</style>
