<template>
    <header class="w-100">
        <div class="d-flex row g-0">
            <div class="col-6">
                <h1>BoolFlix</h1>
            </div>
            <div class="col-6">
                <form @submit.prevent="searchMedia">
                    <input class="input-search" v-model="searchQuery" type="text" placeholder="Cerca un Film o una Serie TV..." required>
                    <button type="submit">Search</button>
                </form>
            </div>
        </div>
    </header>
</template>

<script>
import { store, actions } from '../store.js';

export default {
    computed: {
        searchQuery: {
            get() { return store.searchQuery; },
            set(value) { store.searchQuery = value; }
        }
    },
    methods: {
        searchMedia() {
            actions.searchMedia();
        }
    }
}
</script>

<style scoped>
header {
    height: 5rem;
    padding: 10px;
    background-color: red;
}

.col-6 button {
    font-size: 15px;
    padding: 18px 18px;
    background-color: white; 
    color: black;
    border: none;
    cursor: pointer;
}

.input-search {
    font-size: 20px;
    padding: 12px;
    width: 50%;
    border: 2px solid #ccc;
}

.input-search:focus {
    border-color: #007bff;
}

.media-item {
    background-color: white;
    margin-top: 10px;
    padding: 10px;
    border-radius: 5px;
}


.fa-star, .fa-star-o {
    color: gold;
  }
</style>