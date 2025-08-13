import { defineStore } from "pinia";
import type { News, Vote } from "@/types/news";
import { newsSeed } from "@/mock/newsdata";

export const useNewsStore = defineStore("news", {
  state: () => ({
    newsList: [...newsSeed] as News[],
  }),
  getters: {
    byId: (state) => (id: number) => state.newsList.find(n => n.id === id),
  },
  actions: {
    addVote(newsId: number, vote: Vote) {
      const news = this.newsList.find(n => n.id === newsId);
      if (news) news.votes.push(vote);
    },
  },
});
