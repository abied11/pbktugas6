<template>
  <div :class="['todo-item', { 'completed': todo.completed }]">
    <input
      type="checkbox"
      :checked="todo.completed"
      @change="toggleCompletion"
    />
    <span
      v-if="!isEditing"
      :class="{ 'done': todo.completed }"
      @dblclick="startEditing"
      class="todo-text"
    >{{ todo.text }}</span>
    <input
      v-else
      type="text"
      v-model="editedText"
      @keyup.enter="finishEditing"
      @keyup.esc="cancelEditing"
      @blur="finishEditing"
      class="edit-input"
      v-focus
    />
    <button @click="deleteItem">Hapus</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch, nextTick } from 'vue';

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['toggle-completion', 'delete-item', 'edit-text']);

const isEditing = ref(false);
const editedText = ref('');

// Custom directive untuk fokus otomatis pada input
const vFocus = {
  mounted: (el) => el.focus(),
};

const toggleCompletion = () => {
  emit('toggle-completion', props.todo.id);
};

const deleteItem = () => {
  emit('delete-item', props.todo.id);
};

const startEditing = () => {
  isEditing.value = true;
  editedText.value = props.todo.text;
  // nextTick memastikan DOM sudah diperbarui sebelum mencoba fokus
  nextTick(() => {
    // input akan difokuskan oleh v-focus directive
  });
};

const finishEditing = () => {
  if (editedText.value.trim() && editedText.value !== props.todo.text) {
    emit('edit-text', props.todo.id, editedText.value);
  }
  isEditing.value = false;
};

const cancelEditing = () => {
  isEditing.value = false;
};

// Opsional: Untuk memastikan editedText sinkron jika todo.text diubah dari luar
// watch(() => props.todo.text, (newVal) => {
//   if (!isEditing.value) {
//     editedText.value = newVal;
//   }
// });
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.todo-item input[type="checkbox"] {
  margin-right: 10px;
  transform: scale(1.2); /* Memperbesar checkbox sedikit */
}

.todo-item .todo-text {
  flex-grow: 1;
  padding: 5px; /* Tambahkan padding agar bisa diklik lebih mudah */
  cursor: pointer; /* Menandakan bisa diklik/diedit */
}

.todo-item .done {
  text-decoration: line-through;
  color: #888;
}

.todo-item .edit-input {
  flex-grow: 1;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  margin-right: 10px; /* Jaga jarak dengan tombol hapus */
}

.todo-item button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
  font-size: 14px;
}

.todo-item button:hover {
  background-color: #d32f2f;
}
</style>