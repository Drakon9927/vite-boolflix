<template>
  <main>
      <div class="container-fluid w-100 mybgc">
          <div class="container mymaxwidth p-4">
              <form @submit.prevent="searchMedia">
                  <input v-model="searchQuery" type="text" placeholder="Cerca un Film o una Serie TV..." required>
                  <button type="submit">Search</button>
              </form>
              <div class="container mymaxwidth">
                  <div v-for="item in results" :key="item.id" class="media-item">
                      <h5>{{ item.title || item.name }}</h5>
                      <p>Titolo Originale: {{ item.original_title || item.original_name }}</p>
                      <p>Lingua: <img :src="getFlagUrl(item.original_language)" alt="Flag"></p>
                      <p>Voto: {{ item.vote_average }}</p>
                  </div>
              </div>
          </div>
      </div>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  data() {
      return {
          searchQuery: '',
          results: [],
      };
  },
  methods: {
      async searchMedia() {
          const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=b3addd10630c4492d7ea5f06080ce9a0&query=${this.searchQuery}&include_adult=false&language=it-IT&page=1`;
          const tvUrl = `https://api.themoviedb.org/3/search/tv?api_key=b3addd10630c4492d7ea5f06080ce9a0&query=${this.searchQuery}&language=it-IT&page=1`;
          
          try {
              const [movieResponse, tvResponse] = await Promise.all([
                  axios.get(movieUrl),
                  axios.get(tvUrl)
              ]);
              this.results = [...movieResponse.data.results, ...tvResponse.data.results];
          } catch (error) {
              console.error("Error fetching the media:", error);
              this.results = []; 
          }
      },
      getFlagUrl(code) {
          // Nel caso 'us' sia il codice per le bandiere in lingua inglese
          if (code === 'en') code = 'us'; 
          return `https://flagcdn.com/w20/${code.toLowerCase()}.png`; 
      }
  }
}
</script>

<style scoped>
.mybgc {
  background-color: black;
  height: 100%;
}
.mymaxwidth {
  max-width: 75%;
}
.media-item {
  margin-top: 20px;
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
}
</style>