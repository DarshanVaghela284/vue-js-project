<script setup>
import { useQuizStore } from "../store/quiz";

const quizStore = useQuizStore();
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm"
  >
    <div
      class="glass-modal w-[340px] rounded-2xl shadow-2xl p-8 text-center relative animate-fade-in"
    >
      <h2 class="text-2xl font-bold mb-4 text-blue-700 drop-shadow">View Results?</h2>
      <p class="mb-6 text-gray-700">
        You've completed the quiz. Would you like to see your score?
      </p>
      <div class="flex justify-around gap-4">
        <button
          class="btn-glass bg-gradient-to-r from-blue-500 to-pink-400 hover:from-blue-600 hover:to-pink-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg transition-all duration-200"
          @click="quizStore.confirmViewResults"
        >
          Yes
        </button>
        <router-link
          to="/"
          class="btn-glass bg-gray-200 hover:bg-gray-300 text-blue-700 px-6 py-2 rounded-full font-semibold shadow transition-all duration-200"
          @click="quizStore.restartQuiz"
        >
          No
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.glass-modal {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 41, 55, 0.18), 0 0 8px 2px rgba(100, 200, 255, 0.08);
  backdrop-filter: blur(16px);
  border: 1.5px solid rgba(255, 255, 255, 0.25);
}
.btn-glass {
  box-shadow: 0 2px 16px 0 #60a5fa33, 0 0 0 2px #f472b633;
}
.animate-fade-in {
  animation: fadeIn 0.7s;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
