<template>
  <div>
      <Table :characters="characters" />
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import Table from '../components/Table.vue';
import { getCharacters } from '../services/characters';

export default {
  name: 'AllCharacters',
  components: { Table },
  setup() {
    let characters = ref([]);
    let info = ref({});
    let currentPage = ref(1);

    const loadCharacters = async () => {
      const data = await getCharacters(currentPage.value);
      const json = await data.json();
      characters.value = json.data.characters.results;
      info.value = json.data.characters.info;
    }

    onMounted(loadCharacters);
    
    return { characters, info, currentPage }
  }
};
</script>

<style>

</style>

