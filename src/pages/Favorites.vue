<template>
  <div>
      <Table :characters="characters" :loaded="loaded" @favoritesChanged="loadCharacters" :favouritedCharacters="favouritedCharacters" :fetchError="fetchError" :noFavourites="noFavourites" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, onUpdated, watch } from 'vue';
import Table from '../components/Table.vue';
import { getCharactersById } from '../services/characters';

export default defineComponent({
  name: 'Favorites',
  components: { Table },
  props: {
    favouritedCharacters: Array,
  },
  setup(props) {
    let characters = ref(Array());
    let loaded = ref(false);
    let favouritedCharactersLocal = ref(Array());
    let fetchError = ref(false);
    let noFavourites = ref(false);

    const showFav = async () => {
      favouritedCharactersLocal.value = props.favouritedCharacters || [];
    }

    onUpdated(showFav);
    const loadCharacters = async () => {
      fetchError.value = await false;
      noFavourites.value = await false;

      if (favouritedCharactersLocal.value.length) {
        try {
          const data = await getCharactersById(favouritedCharactersLocal.value || []);
          const json = await data.json();
          characters.value = json.data.charactersByIds;
        } catch (error) {
          console.error(error);
          characters.value = [];
          fetchError.value = await true;
        }
      } else {
        noFavourites.value = await true;
      }
      
      loaded.value = await true
    }

    onMounted(loadCharacters);
    watch(favouritedCharactersLocal, loadCharacters)
    
    return { characters, loaded, loadCharacters, fetchError, noFavourites }
  }
});
</script>

