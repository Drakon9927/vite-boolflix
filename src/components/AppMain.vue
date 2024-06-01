<template>
    <main>
        <div class="container-fluid w-100 mybgc">
            <div class="container mymaxwidth p-4">
                <div class="container mymaxwidth g-0">
                    <div v-for="item in results" :key="item.id" class="media-item">
                        <img :src="getPosterUrl(item.poster_path)" alt="Poster" />
                        <div class="media-info">
                            <h5>{{ item.title || item.name }}</h5>
                            <p>Titolo Originale: {{ item.original_title || item.original_name }}</p>
                            <p>Lingua: <img :src="getFlagUrl(item.original_language)" alt="Flag" /></p>
                            <p>Voto: 
                                <span v-for="star in getStars(item.vote_average)" :key="`full-${star}`" class="fa fa-star"></span>
                                <span v-for="star in getStarsEmpty(item.vote_average)" :key="`empty-${star}`" class="fa fa-star-o"></span>
                            </p>
                            <p>Overview: {{ item.overview }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { store } from '../store.js';

export default {
    computed: {
        results() {
            return store.results;
        }
    },
    methods: {
        getFlagUrl(code) {
            const languageToCountryMap = {
                'en': 'us', // Inglese -> USA
                'it': 'it', // Italiano -> Italia
                'de': 'de', // Tedesco -> Germania
                'fr': 'fr', // Francese -> Francia
                'es': 'es', // Spagnolo -> Spagna
                'pt': 'pt', // Portoghese -> Portogallo
                'ja': 'jp', // Giapponese -> Giappone
                'zh': 'cn', // Cinese -> Cina
                'ru': 'ru', // Russo -> Russia
                'ko': 'kr', // Coreano -> Corea del Sud
                'ar': 'sa', // Arabo -> Arabia Saudita
                
            };
            const countryCode = languageToCountryMap[code] || code; // Fallback al codice originale se non mappato
            return `https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`;
        },
        getStars(vote) {
            const fullStars = Math.ceil(vote / 2);
            return Array.from({ length: fullStars }, (_, i) => i + 1);
        },
        getStarsEmpty(vote) {
            const fullStars = Math.ceil(vote / 2);
            const emptyStars = 5 - fullStars;
            return Array.from({ length: emptyStars }, (_, i) => i + 1);
        },
        getPosterUrl(path) {
            return `https://image.tmdb.org/t/p/w342${path}`;
        }
    }
}
</script>

<style scoped>
.mybgc {
  background-color: black;
  height: 100%;
  min-height: 100vh;
}
.mymaxwidth {
  max-width: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around; 
}
.media-item {
  width: 20%; 
  height: auto; 
  margin: 10px; 
  position: relative; 
  overflow: hidden; 
  border-radius: 10px; 
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); 
  transition: transform 0.3s; 
}

.media-item img {
  width: 100%;
  height: 100%; 
  object-fit: cover; 
  border-top-left-radius: 10px; 
  border-top-right-radius: 10px;
}

.media-item:hover {
  transform: scale(1.05); 
  z-index: 50; 
}

.media-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.75); 
  color: white; 
  padding: 10px;
  display: none; 
  overflow: auto;
  max-height: 60%; 
}

.media-item:hover .media-info {
  display: block; 
}

.media-info img {
  width: 30px; 
  height: auto; 
}

.fa-star, .fa-star-o {
  color: gold; 
  margin-right: 2px; 
}
</style>