<template>
  <div class="todo-list-container">
    <h1>Aplikasi Todo List</h1>

    <div class="input-section">
      <input
        type="text"
        v-model="newTodoText"
        @keyup.enter="addTodoItem"
        placeholder="Tambahkan tugas baru..."
      />
      <button @click="addTodoItem">Tambah</button>
    </div>

    <div class="controls-section">
      <div class="filter-buttons">
        <button
          :class="{ 'active': todoStore.filter === 'all' }"
          @click="todoStore.setFilter('all')"
        >Semua</button>
        <button
          :class="{ 'active': todoStore.filter === 'active' }"
          @click="todoStore.setFilter('active')"
        >Belum Selesai</button>
        <button
          :class="{ 'active': todoStore.filter === 'completed' }"
          @click="todoStore.setFilter('completed')"
        >Selesai</button>
      </div>
      <button
        @click="todoStore.clearCompletedTodos"
        v-if="todoStore.allTodos.filter(todo => todo.completed).length > 0"
        class="clear-completed-btn"
      >Hapus Tugas Selesai</button>
    </div>

    <p class="summary">
      Total tugas yang belum selesai: <strong>{{ todoStore.unfinishedTodosCount }}</strong>
    </p>

    <div class="todos-section">
      <div v-if="todoStore.filteredTodos.length === 0" class="no-todos">
        Tidak ada tugas yang {{ getFilterStatusText(todoStore.filter) }}.
      </div>
      <TodoItem
        v-for="todo in todoStore.filteredTodos"
        :key="todo.id"
        :todo="todo"
        @toggle-completion="todoStore.toggleTodoCompletion"
        @delete-item="todoStore.deleteTodo"
        @edit-text="todoStore.editTodoText"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useTodoStore } from '../stores/todoStore';
import TodoItem from './TodoItem.vue';

const todoStore = useTodoStore();
const newTodoText = ref('');

const addTodoItem = () => {
  if (newTodoText.value.trim()) {
    todoStore.addTodo(newTodoText.value);
    newTodoText.value = '';
  }
};

const getFilterStatusText = (filter) => {
  if (filter === 'active') return 'belum selesai';
  if (filter === 'completed') return 'selesai';
  return ''; // 'all'
};

// Panggil loadTodos saat komponen di-mount untuk memastikan data dimuat
// Jika Anda sudah memanggilnya di main.js, ini tidak mutlak perlu,
// tapi lebih aman di sini juga jika store tidak langsung diakses di main.js.
onMounted(() => {
  todoStore.loadTodos();
});
</script>

<style scoped>
.todo-list-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.input-section {
  display: flex;
  margin-bottom: 20px;
}

.input-section input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
  font-size: 16px;
}

.input-section button {
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.input-section button:hover {
  background-color: #45a049;
}

.controls-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  flex-wrap: wrap; /* Untuk responsif jika tombol terlalu banyak */
  gap: 10px; /* Jarak antar item */
}

.filter-buttons button {
  padding: 8px 12px;
  margin-right: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f0f0f0;
  cursor: pointer;
  font-size: 14px;
}

.filter-buttons button.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.filter-buttons button:hover:not(.active) {
  background-color: #e2e6ea;
}

.clear-completed-btn {
  padding: 8px 12px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.clear-completed-btn:hover {
  background-color: #c82333;
}

.summary {
  text-align: right;
  margin-bottom: 15px;
  font-size: 14px;
  color: #555;
}

.todos-section {
  border-top: 1px solid #eee;
  padding-top: 10px;
}

.no-todos {
  text-align: center;
  color: #777;
  padding: 20px;
  font-style: italic;
}
</style>