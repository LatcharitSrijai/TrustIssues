import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import NewsDetailView from "@/views/NewsDetailView.vue";
import VoteView from "@/views/VoteView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/news/:id", name: "newsDetail", component: NewsDetailView },
  { path: "/vote/:id", name: "vote", component: VoteView },
];

export default createRouter({ history: createWebHistory(), routes ,scrollBehavior() { return { top: 0 } } });
