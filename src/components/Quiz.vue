<script setup lang="ts">
import { useQuizStore } from "../store/quiz";
import QuestionCard from "./QuestionCard.vue";
import ShowResults from "./ShowResults.vue";

const quizStore = useQuizStore();
</script>
<template>
  <div class="quiz-bg-animated min-h-screen flex items-center justify-center">
    <div
      class="quiz-card-glass w-full max-w-2xl rounded-3xl shadow-2xl p-0 sm:p-10 transition-all duration-500"
    >
      <QuestionCard v-if="!quizStore.showResultModal" />
      <ShowResults v-else />
    </div>
  </div>
</template>

<style scoped>
.quiz-bg-animated {
  width: 100vw;
  background: linear-gradient(120deg, #a1c4fd, #fbc2eb, #f9d423, #a1c4fd);
  background-size: 400% 400%;
  animation: gradientFlow 18s ease-in-out infinite;
  position: relative;
  overflow: hidden;
}
@keyframes gradientFlow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.quiz-card-glass {
  background: rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 41, 55, 0.18), 0 0 8px 2px rgba(100, 200, 255, 0.08);
  backdrop-filter: blur(16px);
  border: 1.5px solid rgba(255, 255, 255, 0.25);
}
</style>
