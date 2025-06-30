<template>
  <div class="min-h-screen bg-green-100 flex flex-col items-center p-6">
    <div class="w-full max-w-xl bg-white rounded-xl shadow-lg p-6">
      <h1 class="text-3xl font-bold text-center text-green-600 mb-6">
        🏋️‍♀️ Daftar Olahraga Harian
      </h1>

      <!-- Form Tambah -->
      <div class="flex gap-2 mb-6">
        <input
          v-model="newSport"
          placeholder="Tambah olahraga baru..."
          class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          @click="addSport"
          class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Tambah
        </button>
      </div>

      <!-- Daftar Olahraga -->
      <ul class="space-y-3">
        <li
          v-for="sport in sports"
          :key="sport.id"
          class="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg shadow-sm hover:bg-gray-100 transition"
        >
          <div class="flex items-center gap-3">
            <input
              type="checkbox"
              v-model="sport.completed"
              @change="updateSport(sport)"
              class="w-5 h-5"
            />
            <span :class="{ 'line-through text-gray-400': sport.completed }" class="text-lg">
              {{ sport.name }}
            </span>
          </div>
          <button
            @click="deleteSport(sport.id)"
            class="text-red-500 hover:text-red-700 transition"
          >
            Hapus
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      newSport: "",
      sports: [],
    };
  },
  methods: {
    async fetchSports() {
      try {
        const res = await axios.get("http://localhost:3000/sports");
        this.sports = res.data;
      } catch (err) {
        console.error("Gagal mengambil data:", err);
      }
    },
    async addSport() {
      if (!this.newSport.trim()) return;
      const newItem = {
        name: this.newSport,
        completed: false,
      };
      try {
        const res = await axios.post("http://localhost:3000/sports", newItem);
        this.sports.push(res.data);
        this.newSport = "";
      } catch (err) {
        console.error("Gagal menambahkan olahraga:", err);
      }
    },
    async deleteSport(id) {
      await axios.delete(`http://localhost:3000/sports/${id}`);
      this.sports = this.sports.filter(sport => sport.id !== id);
    },
    async updateSport(sport) {
      await axios.put(`http://localhost:3000/sports/${sport.id}`, sport);
    },
  },
  mounted() {
    this.fetchSports();
  },
};
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}
</style>
