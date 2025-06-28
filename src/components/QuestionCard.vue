<script setup lang="ts">
import { useQuizStore } from "../store/quiz";
import { onMounted, onBeforeUnmount, computed } from "vue";

const quizStore = useQuizStore();

onMounted(() => {
  quizStore.startTimer?.();
});
onBeforeUnmount(() => {
  quizStore.clearTimer?.();
});

const currentQuestion = computed(() => quizStore.currentQuestion);
const options = computed(() => currentQuestion.value.options || []);
const selected = computed(() => quizStore.selected);

const progress = computed(
  () => ((quizStore.currentIndex + 1) / quizStore.totalQuestions) * 100
);

function getOptionClass(index: number) {
  if (selected.value === null) {
    return "bg-white/30 hover:bg-blue-200/80 border border-blue-200 shadow hover:scale-105 hover:ring-2 hover:ring-blue-200";
  }
  if (index === selected.value && index === currentQuestion.value.answer) {
    return "bg-gradient-to-r from-green-400 to-green-500 text-white shadow-xl scale-105 ring-2 ring-green-300";
  }
  if (index === selected.value && index !== currentQuestion.value.answer) {
    return "bg-gradient-to-r from-red-400 to-red-500 text-white shadow-xl scale-105 ring-2 ring-red-300";
  }
  return "bg-white/30 hover:bg-blue-200/80 border border-blue-200 shadow hover:scale-105 hover:ring-2 hover:ring-blue-200";
}
</script>

<template>
  <div
    class="flex flex-col items-center justify-center rounded-2xl p-0 sm:p-8 transition-all duration-500"
  >
    <!-- Neon Progress Bar -->
    <div class="w-full mb-8 mt-2">
      <div class="h-4 bg-blue-100 rounded-full overflow-hidden shadow-inner relative">
        <div
          class="h-full neon-bar transition-all duration-700"
          :style="{ width: progress + '%' }"
        ></div>
        <span
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-blue-700 drop-shadow"
        >
          {{ quizStore.currentIndex + 1 }} / {{ quizStore.totalQuestions }}
        </span>
      </div>
    </div>

    <!-- Timer and Question -->
    <div class="flex justify-between items-center mb-4 text-sm text-gray-600 w-full">
      <span class="font-bold text-blue-600 drop-shadow">Quiz Progress</span>
      <span class="timer flex items-center gap-1 text-pink-600 font-bold animate-pulse">
        <svg
          class="w-5 h-5 animate-spin-slow"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-opacity="0.2"
            stroke-width="4"
          />
          <path
            d="M12 6v6l4 2"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        {{ quizStore.timer ?? quizStore.timeLeft }}s
      </span>
    </div>

    <p
      class="question text-2xl font-bold mb-8 text-blue-800 drop-shadow-lg tracking-tight text-center"
    >
      {{ currentQuestion.text }}
    </p>

    <!-- Options -->
    <ul class="options space-y-4 mb-8 w-full">
      <li
        v-for="(option, index) in options"
        :key="index"
        :class="[
          'cursor-pointer py-3 px-6 rounded-xl transition-all duration-200 text-lg font-medium transform shadow-md hover:shadow-xl neon-option',
          getOptionClass(index),
        ]"
        @click="quizStore.selectOption(index)"
        tabindex="0"
        @keyup.enter="quizStore.selectOption(index)"
        role="button"
        :aria-pressed="selected === index"
      >
        <span class="inline-block align-middle transition-transform duration-200">{{
          option
        }}</span>
      </li>
    </ul>

    <!-- Next Button -->
    <transition name="fade">
      <button
        v-if="selected !== null"
        class="next-btn bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-700 text-white py-2 px-8 rounded-full shadow-xl text-lg font-bold transition-all duration-200 animate-bounce neon-btn"
        @click="quizStore.nextQuestion"
      >
        Next
      </button>
    </transition>
  </div>
</template>

<style scoped>
.neon-bar {
  background: linear-gradient(90deg, #f472b6 0%, #60a5fa 50%, #34d399 100%);
  box-shadow: 0 0 12px 2px #60a5fa88, 0 0 24px 4px #f472b688;
  border-radius: 9999px;
}
.neon-option:hover,
.neon-option:focus {
  box-shadow: 0 0 0 3px #60a5fa55, 0 2px 16px 0 #f472b655;
  background: linear-gradient(90deg, #e0e7ff 0%, #f0fdfa 100%);
  color: #2563eb;
  transform: scale(1.04);
}
.neon-btn {
  box-shadow: 0 2px 16px 0 #f472b655, 0 0 0 3px #60a5fa55;
}
.timer svg {
  color: #ec4899;
}
@keyframes spin-slow {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.animate-spin-slow {
  animation: spin-slow 2s linear infinite;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
