<template>
  <div>
      <Table :characters="characters" :loaded="loaded" :favouritedCharacters="favouritedCharacters"  :fetchError="fetchError" />
      <Paging @pageUp='pageUp' @pageDown='pageDown' @changePage='setPage' :currentPage="currentPage" :lastPage="info.pages" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRefs, watch } from 'vue';
import Table from '../components/Table.vue';
import Paging from '../components/Paging.vue';
import { getCharacters, getCharactersById } from '../services/characters';

type PageEvent = {
  page: number
}

export default defineComponent({
  name: 'AllCharacters',
  components: { Table, Paging },
  props: {
    favouritedCharacters: { type: Array },
    searchPhrase: { type: String, default: '' },
    searchType: { type: String, default: 'Name' },
  },
  setup(props) {
    let characters = ref([]);
    let info = ref({});
    let currentPage = ref(1);
    let loaded = ref(false);
    let fetchError = ref(false);
    let { searchPhrase, searchType } = toRefs(props);


    const loadCharacters = async () => {
      fetchError.value = await false;
      try {
        if (searchType.value === 'Name') {
          const data = await getCharacters(currentPage.value, searchPhrase?.value || '');
          const json = await data.json();
          characters.value = json.data.characters.results;
          info.value = json.data.characters.info;
        } else if (searchType.value === 'Identifier') {
          const data = await getCharactersById([parseInt(searchPhrase?.value, 10)] || []);
          const json = await data.json();
          info.value = { pages: 1 }; // workaround because grapql api charactersById dont give infos data
          characters.value = json.data.charactersByIds;
        }
        // no serchByEpisode becouse of no good method from api imho should be filter on character api
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
    watch(searchPhrase, loadCharacters);
    watch(searchType, loadCharacters);

    const pageUp = () => { 
      currentPage.value++;
      loaded.value = false;
    };

    const pageDown = () => { 
      currentPage.value--;
      loaded.value = false;
    };

    const setPage = (event: PageEvent) => {
      currentPage.value = event.page;
      loaded.value = false;
    }
    
    return { characters, info, currentPage, pageUp, pageDown, loaded, fetchError, setPage }
  }
});
</script>

<style>

</style>

