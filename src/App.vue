<template>
  <div id='header'>
    <div class="logo"></div>
    <Search :searchPhrase="searchPhrase" :searchType="searchType" @search="setSearchPhrase" />
  </div>
  <Tabs id='tabs' :selected="selectedTab" @tabToggle="changeTab" />
  <AllCharacters 
    v-if="selectedTab === 'all'" 
    id='table' 
    :favouritedCharacters="favouritedCharacters" 
    :searchPhrase="searchPhrase" 
    :searchType="searchType" />
  <Favorites v-if="selectedTab === 'fav'" id='table' :favouritedCharacters="favouritedCharacters" />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import AllCharacters from './pages/AllCharacters.vue';
import Favorites from './pages/Favorites.vue';
import Tabs from './components/Tabs.vue';
import Search from './components/Search.vue';

type Tabs = {
  type: string,
}

type Search = {
  type: string,
  phrase: string,
}

export default defineComponent({
  name: 'App',
  components: { AllCharacters, Favorites, Tabs, Search },
  setup() {
    let selectedTab = ref('all');
    let favouritedCharacters = ref(Array());
    let searchPhrase = ref('');
    let searchType = ref('Name');

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

    const setSearchPhrase = (search: Search) => {
      searchPhrase.value = search.phrase;
      searchType.value = search.type;
    }

    return { selectedTab, changeTab, favouritedCharacters, searchPhrase, searchType, setSearchPhrase }
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
    display: grid;
    grid-template-columns: 140px 240px 1fr;
    grid-template-rows: 1fr;
    padding-top: 32px;
    column-gap: 80px;
  }

  .logo {
    width: 240px;
    height: 70px;
    background-image: url('./assets/images/logo.svg');
    grid-column-start: 2;
  }

@media (max-width:1200px) { 
  #header {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    justify-items: center;
    align-items: center;
    column-gap: 8px;
    row-gap: 8px;
    padding-top: 0px;
  }

  .logo {
     grid-column-start: 1;
  }

  Search {
    grid-column-start: 1; 
  }
 }

 @media (max-width:500px) {
   #header {
    grid-template-columns: 4fr;
    grid-template-rows: 1fr 1fr;
    justify-items: center;
    align-items: center;
    column-gap: 8px;
    row-gap: 8px;
    padding-top: 0px;
  }

  .logo {
     grid-column-start: 1;

  }

  Search {
    grid-column-start: 1; 
  }
 }

#tabs {
  grid-area: tabs;
  display: grid;
  justify-items: center;
}

#table {
  grid-area: table;
  display: grid;
  grid-template-rows: 54px 1fr auto;
}


</style>
