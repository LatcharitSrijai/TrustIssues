import { defineStore } from "pinia";
import type { News, Vote } from "@/types/news";
import { newsSeed } from "@/mock/newsdata";


function computedStatusFromVotes(n: News): "fake" | "not-fake" {
  const fake = n.votes.filter(v => v.type === "fake").length;
  const notFake = n.votes.filter(v => v.type === "not-fake").length;


  if (fake === 0 && notFake === 0) return n.status;
  return notFake >= fake ? "not-fake" : "fake";
}

export const useNewsStore = defineStore("news", {
  state: () => ({

    newsList: newsSeed.map(n => ({ ...n, status: computedStatusFromVotes(n) })) as News[],
  }),
  getters: {
    byId: (state) => (id: number) => state.newsList.find(n => n.id === id),
  },
  actions: {
    addVote(newsId: number, vote: Vote) {
      const news = this.newsList.find(n => n.id === newsId);
      if (!news) return;

      news.votes.push(vote);

      news.status = computedStatusFromVotes(news);
    },
  },
});
