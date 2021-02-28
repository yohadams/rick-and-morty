<template>
  <div class="grid">
    <button @click='pageDown' class="material-icons">arrow_left</button>
    <button class='selected'> {{ currentPage }}</button>
    <button>  2  </button>
    <button>  3  </button>
    <button>  4  </button>
    <button>  ...  </button>
    <button>{{ lastPage }} </button>
    <button @click='pageUp' class="material-icons">arrow_right</button>
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

    return { pageUp, pageDown };
  }
});
</script>

<style scoped>
  .grid {
    display: grid;
    column-gap: 8px;
    grid-template-columns: repeat(8, 40px);
    margin-left: 140px;
    margin-top: 40px;
    margin-bottom: 61px;
    justify-items: center;
    align-items: center;
  }

  .grid > button {
    border: 1px solid var(--primary-color);
    background: white;
    border-radius: 4px;
    width: 40px;
    height: 40px;
    cursor: pointer;
  }

  .grid > button.selected {
    background-color: var(--secondary-color);
    color: white;
  }
</style>
