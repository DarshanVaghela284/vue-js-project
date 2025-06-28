import { defineStore } from "pinia";
import { ref, computed, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { questions } from "../utils/config";
import { Routes } from "../utils/routes";

let timerInterval: number | null = null;

export const useQuizStore = defineStore("quiz", () => {
    const currentIndex = ref(0);
    const selected = ref<number | null>(null);
    const score = ref(0);
    const showResultModal = ref(false);

    const timeLeft = ref(30);

    const currentQuestion = computed(() => questions[currentIndex.value]);
    const totalQuestions = computed(() => questions.length);

    const router = useRouter();

    function startTimer() {
        clearTimer();
        timeLeft.value = 30;

        timerInterval = setInterval(() => {
            if (timeLeft.value > 0) {
                timeLeft.value--;
            } else {
                nextQuestion();
            }
        }, 1000);
    }

    function clearTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }

    function selectOption(index: number) {
        const prevSelected = selected.value;
        selected.value = index;

        if (index === currentQuestion.value.answer) {
            if (prevSelected !== currentQuestion.value.answer) {
                score.value++;
            }
        } else {
            if (prevSelected === currentQuestion.value.answer) {
                score.value--;
            }
        }
    }

    function nextQuestion() {
        clearTimer()
        selected.value = null;
        if (currentIndex.value < totalQuestions.value - 1) {
            currentIndex.value++;
            startTimer();
        } else {
            showResultModal.value = true;
        }
    }

    function restartQuiz() {
        clearTimer()
        currentIndex.value = 0;
        selected.value = null;
        score.value = 0;
        showResultModal.value = false
        timeLeft.value = 30
    }

    function confirmViewResults() {
        clearTimer();
        showResultModal.value = false;
        router.push(Routes.quizSummary);
    }

    onUnmounted(() => clearTimer());

    return {
        currentIndex,
        selected,
        score,
        showResultModal,
        currentQuestion,
        totalQuestions,
        timeLeft,
        startTimer,
        clearTimer,
        selectOption,
        nextQuestion,
        confirmViewResults,
        restartQuiz,
    };
});
