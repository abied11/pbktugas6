import { defineStore } from 'pinia';

// Nama untuk kunci LocalStorage Anda
const LOCAL_STORAGE_KEY = 'vue-pinia-todo-app';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [], // Array untuk menyimpan objek tugas: { id: number, text: string, completed: boolean }
    nextId: 1, // Untuk ID unik setiap tugas
    filter: 'all', // 'all', 'active', 'completed'
  }),

  // Getters: Untuk mendapatkan data dari state dan menghitung nilai-nilai
  getters: {
    // Menghitung jumlah tugas yang belum selesai
    unfinishedTodosCount: (state) => {
      return state.todos.filter(todo => !todo.completed).length;
    },
    // Mengambil semua tugas (bisa juga difilter di komponen jika perlu)
    allTodos: (state) => state.todos,

    // Getter baru: Mengembalikan tugas yang difilter berdasarkan nilai 'filter'
    filteredTodos: (state) => {
      if (state.filter === 'active') {
        return state.todos.filter(todo => !todo.completed);
      } else if (state.filter === 'completed') {
        return state.todos.filter(todo => todo.completed);
      }
      return state.todos; // 'all'
    },
  },

  // Actions: Untuk memodifikasi state
  actions: {
    // Menambahkan tugas baru
    addTodo(text) {
      if (text.trim()) { // Pastikan teks tidak kosong
        this.todos.push({
          id: this.nextId++,
          text: text.trim(),
          completed: false,
        });
        this.saveTodos(); // Simpan ke LocalStorage setelah perubahan
      }
    },

    // Menghapus tugas berdasarkan ID
    deleteTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
      this.saveTodos(); // Simpan ke LocalStorage setelah perubahan
    },

    // Menandai tugas sebagai selesai atau belum selesai (toggle)
    toggleTodoCompletion(id) {
      const todo = this.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        this.saveTodos(); // Simpan ke LocalStorage setelah perubahan
      }
    },

    // Action baru: Mengatur filter
    setFilter(newFilter) {
      this.filter = newFilter;
    },

    // Action baru: Mengedit teks tugas
    editTodoText(id, newText) {
      const todo = this.todos.find(todo => todo.id === id);
      if (todo && newText.trim()) {
        todo.text = newText.trim();
        this.saveTodos();
      }
    },

    // Action baru: Menghapus semua tugas yang sudah selesai
    clearCompletedTodos() {
      this.todos = this.todos.filter(todo => !todo.completed);
      this.saveTodos();
    },

    // Action untuk menyimpan todos ke LocalStorage
    saveTodos() {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.todos));
    },

    // Action untuk memuat todos dari LocalStorage
    loadTodos() {
      const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedTodos) {
        this.todos = JSON.parse(storedTodos);
        // Pastikan nextId diperbarui setelah memuat data
        if (this.todos.length > 0) {
          this.nextId = Math.max(...this.todos.map(todo => todo.id)) + 1;
        } else {
          this.nextId = 1;
        }
      }
    },
  },
});