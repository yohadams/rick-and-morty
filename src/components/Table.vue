<template>
  <div class="table-grid table-header">
    <div class="grid-padding">Photo</div>
    <div>Character ID</div>
    <div>Name</div>
    <div>Gender</div>
    <div>Species</div>
    <div>Last Episode</div>
    <div>Add To Favorites</div>
  </div>
  
  <div v-if="!fetchError && !noFavourites">
    <div v-for="character in characters" :key="character.id" class="table-grid" >
      <transition name="fade">
        <div v-if="loaded" :style="{ 'background-image': `url(${character.image})` }" class='img grid-padding'></div>
      </transition>

      <transition name="fade">
        <div v-if="loaded">{{ character?.id }}</div>
      </transition>

      <transition name="fade">
        <div v-if="loaded">{{ character?.name }}</div>
      </transition>

      <transition name="fade">
        <div v-if="loaded">{{ character?.gender }}</div>
      </transition>

      <transition name="fade">
        <div v-if="loaded">{{ character?.species }}</div>
      </transition>

      <transition name="fade">
        <div v-if="loaded">{{ getLastEpisode(character) }}</div>
      </transition>

      <transition name="fade">
        <div v-if="loaded">
          <button @click="toggleToFavourites(character)" class="favourite material-icons" 
            :class="{selected: isFavourited(character.id)}">star</button>
        </div>
      </transition>
    </div>
  </div>
  
  <div v-if="fetchError" class="fetch-error-message">
      <div>
        <div class="material-icons" style="justyf">error</div> 
        Error witch fetching data, please try again.
      </div>
  </div>

  <div v-if="noFavourites" class="fetch-error-message">
      <div>
        <div class="material-icons" style="justyf">error</div> 
        There is no favourites added, please add some on 'All Characters' tab.
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUpdated, ref } from 'vue';

type Character = {
  id: Number,
  name: String,
  gender: String,
  species: String,
  episode: Array<Episode>,
};

type Episode = {
  episode: String,
}

export default defineComponent({
  name: 'Table',
  props: {
    characters: { type: Array, reqired: true },
    favouritedCharacters: Array,
    loaded: Boolean,
    fetchError: Boolean,
    noFavourites: { type: Boolean, default: false }
  },
  setup(props, { emit }) {
    let favouritedCharactersLocal = ref(props.favouritedCharacters || []);

    const showFav = async () => {
      favouritedCharactersLocal.value = props.favouritedCharacters || [];
    }

    onUpdated(showFav);

    const toggleToFavourites = (selectedCharacter: Character) => {
      const selectedCharacterIndex: number = favouritedCharactersLocal.value.indexOf(selectedCharacter.id);
      if ( selectedCharacterIndex === -1) {
        favouritedCharactersLocal.value.push(selectedCharacter.id);
        localStorage.setItem('favouritedCharacters', JSON.stringify(favouritedCharactersLocal.value));
        emit('favoritesChanged');
      } else {
        favouritedCharactersLocal.value.splice(selectedCharacterIndex, 1);
        if (favouritedCharactersLocal.value.length) {
          localStorage.setItem('favouritedCharacters', JSON.stringify(favouritedCharactersLocal.value));
        } else {
          localStorage.removeItem('favouritedCharacters')
        }
        
        emit('favoritesChanged');
      }
    }

    const isFavourited = (id: number) =>  favouritedCharactersLocal.value.indexOf(id) !== -1;
    const getLastEpisode = (character: Character) => {
      if (character?.episode) {
        return character.episode[character.episode.length - 1].episode;
      }
      return '';
    }

    return { toggleToFavourites, isFavourited, getLastEpisode }
  }
});
</script>

<style scoped>
  .table-grid {
    display: grid;
    grid-auto-rows: 84px;
    grid-template-columns: 140px repeat(7, 1fr) 140px;
    align-items: center;
    justify-items: self-start;
    border-bottom: 1px solid var(--accent-color);
  }

  .grid-padding {
    grid-column-start: 2;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .table-header {
    background-color: var(--accent-color-opacity-25);
    grid-auto-rows: 54px;
    border-bottom: none;
    font-weight: 500;
  }

  .fetch-error-message {
    display: grid;
    grid-template-rows: 25vh;
    grid-template-columns: 140px 1fr 140px;
    justify-items: center;
    align-items: center;
  }

  .fetch-error-message div {
    grid-column-start: 2;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .fetch-error-message div > div {
    font-size: 3em;
  }

  .img {
    width: 43px;
    height: 68px;
    background: transparent no-repeat center;
    background-size: cover;
  }

  .favourite {
    width: 43px;
    height: 43px;
    border: 2px solid var(--secondary-color);
    border-radius: 8px;
    color: var(--secondary-color);
    background-color: var(--background-color);;
    cursor: pointer;
  }

  .selected {
    color: var(--background-color);;
    background-color: var(--secondary-color);
  }
  
  @media (max-width:1200px) { 
    .table-grid {
      grid-template-columns: 32px repeat(7, 1fr) 32px;
    }
  }

  @media (max-width:835px) { 
    .table-grid {
      grid-template-columns: 3px 50px 0.5fr 1fr 0.75fr 1fr 1fr .8fr 3px;
      column-gap: 8px;
      justify-items: center;
    }

    .table-grid > div {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      width: 100%;
    }
    
    .table-grid > div.img {
      width: 43px;
    }

    .fetch-error-message {
      grid-template-columns: 16px 1fr 16px;  
    }

  }

</style>
