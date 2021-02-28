<template>
  <div class="grid">
    <button class="bold" @click="tabToggle('all')" :class="{ selected: selected === 'all' }">All Characters</button>
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
    column-gap: 80px;
    grid-template-columns: 115px 74px;
    margin-left: 140px;
    justify-items: self-start;
    align-items: center;
  }

  .grid > button {
    font-weight: 500;
    border: none;
    background: white;
    font-size: 16px;
    cursor: pointer;
  }

  button.selected {
    color: var(--secondary-color);
    border-bottom: 3px solid var(--secondary-color);
    margin-bottom: -3px;
  }


</style>
