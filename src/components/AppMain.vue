<template>
    <main>
        <div class="container-fluid w-100 mybgc">
            <div class="container mymaxwidth p-4">
                <div class="container mymaxwidth g-0">
                    <div v-for="item in results" :key="item.id" class="media-item">
                        <h5>{{ item.title || item.name }}</h5>
                        <p>Titolo Originale: {{ item.original_title || item.original_name }}</p>
                        <p>Lingua: <img :src="getFlagUrl(item.original_language)" alt="Flag"></p>
                        <p>Voto: 
                          <span v-for="star in getStars(item.vote_average)" :key="'full-' + star" class="fa fa-star"></span>
                          <span v-for="star in getStarsEmpty(item.vote_average)" :key="'empty-' + star" class="fa fa-star-o"></span>
                        </p>
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
            if (code === 'en') code = 'us';
            return `https://flagcdn.com/w20/${code.toLowerCase()}.png`;
        },
        getStars(vote) {
            const fullStars = Math.ceil(vote / 2);
            return Array.from({ length: fullStars }, (_, i) => i + 1);
        },
        getStarsEmpty(vote) {
            const fullStars = Math.ceil(vote / 2);
            const emptyStars = 5 - fullStars;
            return Array.from({ length: emptyStars }, (_, i) => i + 1);
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
  max-width: 75%;
  display: flex;
  flex-wrap: wrap;
}
.media-item {
  max-width: 25%;
  height: 40%;
  margin: 5px;
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
}
.fa-star, .fa-star-o {
    color: gold;
  }
</style>