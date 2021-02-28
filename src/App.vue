<template>
  <div id='header'>
    <div class="logo"></div>
  </div>
  <Tabs id='tabs' :selected="selectedTab" @tabToggle="changeTab" />
  <AllCharacters v-if="selectedTab === 'all'" id='table' :favouritedCharacters="favouritedCharacters" />
  <Favorites v-if="selectedTab === 'fav'" id='table' :favouritedCharacters="favouritedCharacters" />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import AllCharacters from './pages/AllCharacters.vue';
import Favorites from './pages/Favorites.vue';
import Tabs from './components/Tabs.vue';

type Tabs = {
  type: string
}

export default defineComponent({
  name: 'App',
  components: { AllCharacters, Favorites, Tabs },
  setup() {
    let selectedTab = ref('all');
    let favouritedCharacters = ref(Array());

    const loadFavourites = async () => {
      let favouritedCharacterArray = localStorage.getItem('favouritedCharacters');
      if (favouritedCharacterArray) {
        try {
          favouritedCharacters.value = JSON.parse(favouritedCharacterArray);
        } catch (error) {
          console.error(error)
        }
      } else {
        localStorage.setItem('favouritedCharacters', JSON.stringify([]))
      }
    };

    const changeTab = (event: Tabs) => {
      selectedTab.value = event.type;
      loadFavourites();
    }

    onMounted(loadFavourites);


    return { selectedTab, changeTab, favouritedCharacters }
  }
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
}

#table {
  grid-area: table;
}
</style>
