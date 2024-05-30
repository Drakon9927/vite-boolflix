<template>
  <div id="app">
    <app-header @search="handleSearch"></app-header>
    <app-main :search-query="searchQuery"></app-main>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';

export default {
  components: {
    AppHeader,
    AppMain
  },
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    handleSearch(query) {
      this.searchQuery = query;
    }
  }
}
</script>

<style scoped>

</style>