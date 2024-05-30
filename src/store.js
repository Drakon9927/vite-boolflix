import { reactive } from 'vue';
import axios from 'axios';

export const store = reactive({
    searchQuery: '',
    results: []
});

export const mutations = {
    setSearchQuery(query) {
        store.searchQuery = query;
    },
    setResults(results) {
        store.results = results;
    }
};

export const actions = {
    async searchMedia() {
        const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=b3addd10630c4492d7ea5f06080ce9a0&query=${store.searchQuery}&include_adult=false&language=it-IT&page=1`;
        const tvUrl = `https://api.themoviedb.org/3/search/tv?api_key=b3addd10630c4492d7ea5f06080ce9a0&query=${store.searchQuery}&language=it-IT&page=1`;

        try {
            const responses = await Promise.all([
                axios.get(movieUrl),
                axios.get(tvUrl)
            ]);
            mutations.setResults([...responses[0].data.results, ...responses[1].data.results]);
        } catch (error) {
            console.error("Error fetching the media:", error);
            mutations.setResults([]);  
        }
    }
};