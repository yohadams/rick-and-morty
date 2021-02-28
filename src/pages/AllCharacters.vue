<template>
  <div>
      <Table :characters="characters" :loaded="loaded" :favouritedCharacters="favouritedCharacters"  :fetchError="fetchError" />
      <Paging @pageUp='pageUp' @pageDown='pageDown' :currentPage="currentPage" :lastPage="info.pages" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import Table from '../components/Table.vue';
import Paging from '../components/Paging.vue';
import { getCharacters } from '../services/characters';

export default defineComponent({
  name: 'AllCharacters',
  components: { Table, Paging },
  props: {
    favouritedCharacters: { type: Array },
  },
  setup() {
    let characters = ref([]);
    let info = ref({});
    let currentPage = ref(1);
    let loaded = ref(false);
    let fetchError = ref(false);

    const loadCharacters = async () => {
      fetchError.value = await false;
      try {
        const data = await getCharacters(currentPage.value);
        const json = await data.json();
        characters.value = json.data.characters.results;
        info.value = json.data.characters.info;
      } catch (error) {
        console.error(error);
        characters.value = [];
        info.value = {};
        fetchError.value = await true;
      }
        loaded.value = await true
    }

    onMounted(loadCharacters);
    watch(currentPage, loadCharacters)

    const pageUp = () => { 
      currentPage.value++;
      loaded.value = false;
    };

    const pageDown = () => { 
      currentPage.value--;
      loaded.value = false;
    };
    
    return { characters, info, currentPage, pageUp, pageDown, loaded, fetchError }
  }
});
</script>

<style>

</style>

