import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './assets/style.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

// Import store untuk memanggil action loadTodos
import { useTodoStore } from './stores/todoStore';

// Panggil loadTodos setelah Pinia diinisialisasi, sebelum mount
app.mount('#app');

// Setelah app dimount, store sudah tersedia.
// Kita bisa memuat data setelah Pinia terpasang ke aplikasi.
// Atau bisa juga memanggilnya di hook onMounted di komponen root (App.vue)
// Untuk kesederhanaan, kita panggil di sini
const todoStore = useTodoStore();
todoStore.loadTodos();