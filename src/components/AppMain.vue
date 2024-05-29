

<template>
    <main>
      <div class="container-fluid w-100 mybgc">
        <div class="container mymaxwidth p-4">
          <form action="/search" method="get">
              <input type="text" name="query" placeholder="Cerca una serie" required>
              <button type="submit">Search</button>
          </form>
          <div class="container mymaxwidth">
          
            <!-- Movies -->
            
          </div>
        </div>
      </div>
    </main>
  </template>
  
  <script>


  </script>
  
  <style scoped>
  .mybgc {
    background-color: black;
    height: 100vh;
  }
  
  .mymaxwidth {
    max-width: 75%;
  }
  </style>