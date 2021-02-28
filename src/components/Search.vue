<template>
  <div class="grid">
    <div class="label">Search by</div>
    <select name="seatchType" v-model="type">
      <option>Name</option>
      <option>Identifier</option>
      <option disabled>Episode</option>
    </select>
    <input type="text" v-model="phrase" />
    <button @click="search" class="material-icons">search</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Search',
  props: {
    searchPhrase: String,
    searchType: String,
  },
  setup(props, { emit }) {
    let phrase = ref(props.searchPhrase);
    let type = ref(props.searchType);

    const search = () => { emit('search', { type: type.value, phrase: phrase.value }); };

    return { search, phrase, type };
  }
});
</script>

<style scoped>
  .grid {
    display: grid;
    grid-template-columns: 123px 128px 212px 40px;
    grid-template-rows: 57px;
    justify-items: center;
    align-items: center;
  }
   

  .label {
    height: 55px;
    width: 100%;
    border: 1px solid var(--primary-color);
    display: grid;
    justify-items: center;
    align-items: center;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    font-weight: 500;
  }

  select {
    height: 57px;
    width: 100%;
    font-size: 16px;
    padding: 0 13px 0 16px;
    border: 1px solid var(--primary-color);
    cursor: pointer;
    font-weight: 500;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding-right: 25px;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TpSItHewg0iFDdbIgKuIoVSyChdJWaNXB5NIvaNKQpLg4Cq4FBz8Wqw4uzro6uAqC4AeIm5uToouU+L+k0CLGg+N+vLv3uHsHCK0aU82+CUDVLCOTTIj5wqoYeIWAKEIIIyoxU09lF3PwHF/38PH1Ls6zvM/9OUJK0WSATySeY7phEW8Qz2xaOud94girSArxOfG4QRckfuS67PIb57LDAs+MGLnMPHGEWCz3sNzDrGKoxNPEMUXVKF/Iu6xw3uKs1hqsc0/+wmBRW8lynWYUSSwhhTREyGigihosxGnVSDGRof2Eh3/E8afJJZOrCkaOBdShQnL84H/wu1uzNDXpJgUTQP+LbX+MAoFdoN207e9j226fAP5n4Err+ustYPaT9GZXix0B4W3g4rqryXvA5Q4w/KRLhuRIfppCqQS8n9E3FYChW2Bwze2ts4/TByBHXS3fAAeHwFiZstc93j3Q29u/Zzr9/QBjv3KhdBeJIQAAAAZiS0dEAIEASgAsOhBGqAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+UCHA0ZBH7nZYQAAAA7SURBVBjTY2z00mEgFjAxkACGomIWBgYGBo30if8JKbwxM5+RCcYgpBDFGbg0IIsz4ZLAxmfCZRI2mwBvdBQXS7cWiAAAAABJRU5ErkJggg==');
    background-repeat: no-repeat;
    background-position: calc(100% - 16px) 42%;
  }

  select option {
    font-size: 16px;
    border: 1px solid var(--primary-color);
    font-weight: 500;
  }

  select option:disabled {
    color: var(--accent-color);
  }

  input {
    height: 55px;
    width: calc(100% - 8px);
    border: 1px solid var(--primary-color);
    padding-left: 8px;
    font-size: 16px;
  }

  button {
    height: 57px;
    width: 100%;
    border: 1px solid var(--primary-color);
    background-color: var(--background-color);
    border-left: none;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    font-size: 24px;
    padding-right: 16px;
    color: var(--secondary-color);
    cursor: pointer;
  }

  @media (max-width: 550px) {
     .grid {
       grid-template-columns: 103px 108px 182px 30px;
     }

     button {
       padding-right: 0px;
     }
  }

</style>
