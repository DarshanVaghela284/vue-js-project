<script setup lang="ts">
import { useQuizStore } from "../store/quiz";

const quizStore = useQuizStore();
</script>

<template>
  <div class="h-screen content-center">
    <div
      class="summary-card-glass text-center py-12 px-6 rounded-2xl shadow-2xl animate-fade-in"
    >
      <h2 class="text-4xl font-extrabold mb-4 text-green-600 drop-shadow">
        Quiz Completed 🎉
      </h2>
      <p class="text-2xl mb-8 text-blue-800 font-semibold">
        You got <span class="text-green-500">{{ quizStore.score }}</span> out of
        <span class="text-blue-500">{{ quizStore.totalQuestions }}</span> correct!
      </p>
      <router-link
        to="/"
        class="restart-btn bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-600 text-white py-3 px-8 rounded-full font-bold shadow-lg transition-all duration-200"
        @click="quizStore.restartQuiz"
      >
        Restart Quiz
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.summary-card-glass {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 41, 55, 0.18), 0 0 8px 2px rgba(100, 200, 255, 0.08);
  backdrop-filter: blur(16px);
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  max-width: 420px;
  margin: 0 auto;
}
.restart-btn {
  box-shadow: 0 2px 16px 0 #34d39955, 0 0 0 2px #60a5fa55;
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
