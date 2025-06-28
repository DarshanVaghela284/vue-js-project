import { createRouter, createWebHistory } from "vue-router"
import StartQuiz from "./components/StartQuiz.vue"
import Quiz from "./components/Quiz.vue"

import SummaryCard from "./components/SummaryCard.vue"
import { Routes } from "./utils/routes"

const routes = [
    {
        path: Routes.root,
        component: StartQuiz
    },
    {
        path: Routes.quiz,
        component: Quiz
    },
    {
        path: Routes.quizSummary,
        component: SummaryCard
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(),
})

export default router