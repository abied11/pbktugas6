<template>
  <div id="app">
    <TodoList />
  </div>
</template>

<script setup>
import TodoList from './components/TodoList.vue';
</script>

<style>
/* Styling global untuk body, jika diperlukan */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>