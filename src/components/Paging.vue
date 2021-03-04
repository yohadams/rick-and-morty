<template>
  <div class="grid">
    <button @click='pageDown' :disabled="currentPage === 1" class="material-icons arrows">arrow_left</button>
    <button @click="setPage(1)" :id="1" :class='{ selected: currentPage === 1 }'>1</button>
    <button disabled v-if="currentPage > 3">...</button>
    <button 
      v-if="currentPage - 1 !== 1 && currentPage - 1 !== 0" 
      @click="setPage(currentPage - 1)">{{ currentPage - 1 }}</button>
    <button 
      v-if="currentPage !== 1 && currentPage !== lastPage" 
      @click="setPage(currentPage)"
      :class='{ selected: currentPage }'>{{ currentPage }}</button>
    <button 
      v-if="currentPage + 1 !== lastPage && currentPage + 1 < lastPage"
      @click="setPage(currentPage + 1)">{{ currentPage + 1 }}</button>
    <button disabled v-if="currentPage < lastPage - 3">...</button>
    <button @click="setPage(lastPage)" :id="lastPage" :class='{ selected: currentPage === lastPage}' v-if="lastPage !== 1">{{ lastPage }} </button>
    <button @click='pageUp' :disabled="currentPage === lastPage" class="material-icons arrows">arrow_right</button>
  </div>
    
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Paging',
  props: {
    currentPage: Number,
    lastPage: Number,
  },
  setup(props, { emit }) {
    const pageUp = () => { emit('pageUp'); };
    const pageDown = () => { emit('pageDown'); };
    const setPage = (page: number) => { 
      emit('changePage', { page }) 
      }
    return { pageUp, pageDown, setPage };
  }
});
</script>

<style scoped>
  .grid {
    display: grid;
    column-gap: 8px;
    grid-template-columns: repeat(9, 40px);
    margin-left: 140px;
    margin-top: 40px;
    margin-bottom: 61px;
    justify-items: center;
    align-items: center;
  }

  @media (max-width:920px) { 
    .grid {
      margin-left: 0px;
        justify-self: center;
    }
  }

  .grid > button {
    border: 1px solid var(--primary-color);
    background-color: var(--background-color);
    border-radius: 4px;
    width: 40px;
    height: 40px;
    cursor: pointer;
  }

  .grid > button:disabled {
    cursor: default;
  }

  .grid > button.selected {
    background-color: var(--secondary-color);
    color: white;
  }

  .arrows {
    color: var(--secondary-color);
  }

  .arrows:disabled {
    color: var(--primary-color);
  }
</style>
