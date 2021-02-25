<template>
  <div class="table-grid table-header">
    <div>Photo</div>
    <div>Character ID</div>
    <div>Name</div>
    <div>Gender</div>
    <div>Species</div>
    <div>Last Episode</div>
    <div>Add To Favorites</div>
  </div>
  <div v-for="character in characters" :key="character.id" class="table-grid">
    <div :style="{ 'background-image': `url(${character.image})` }" class='img'></div>
    <div>{{ character.id }}</div>
    <div>{{ character.name }}</div>
    <div>{{ character.gender }}</div>
    <div>{{ character.species }}</div>
    <div>{{ character.episode[character.episode.length - 1].episode }}</div>
    <div></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Table',
  props: {
    characters: { type: Array, reqired: true },
  },
  setup(props) {
    console.log(props.characters)
    console.log('aaaaa')
  }
});
</script>

<style>
  .table-grid {
    display: grid;
    grid-auto-rows: 84px;
    grid-template-columns: repeat(7, 1fr);
    align-items: center;
    justify-items: center;
    outline: 1px solid var(--accent-color);
  }

  .table-header {
    background-color: var(--accent-color-opacity-25);
    grid-auto-rows: 54px;
  }

  .img {
    width: 43px;
    height: 68px;
    background: transparent no-repeat center;
    background-size: cover;
  }

  
</style>
