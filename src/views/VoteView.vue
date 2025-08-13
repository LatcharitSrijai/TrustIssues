<script setup lang="ts">
import { useRoute, useRouter, RouterLink } from "vue-router";
import { ref } from "vue";
import { useNewsStore } from '@/stores/newsStore'

const route = useRoute();
const router = useRouter();
const store = useNewsStore();
const newsId = Number(route.params.id);

const voteType = ref<"fake"|"not-fake">("fake");
const comment = ref("");
const imageUrl = ref("");

function submitVote() {
  store.addVote(newsId, {
    type: voteType.value,
    comment: comment.value.trim(),
    imageUrl: imageUrl.value.trim() || undefined
  });
  router.push(`/news/${newsId}`);
}
</script>

<template>
  <section class="space-y-6">
    <div>
      <RouterLink to="/" class="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:underline">
        ← Back to home
      </RouterLink>
    </div>

    <div class="card max-w-xl space-y-4">
      <h1 class="text-2xl font-bold tracking-tight">Vote on News</h1>

      <label class="block space-y-1.5">
        <span class="text-sm text-zinc-600">Your vote</span>
        <select v-model="voteType" class="select">
          <option value="fake">Fake</option>
          <option value="not-fake">Not Fake</option>
        </select>
      </label>

      <label class="block space-y-1.5">
        <span class="text-sm text-zinc-600">Comment</span>
        <textarea v-model="comment" rows="4" class="textarea" placeholder="Why do you think so?"></textarea>
      </label>

      <label class="block space-y-1.5">
        <span class="text-sm text-zinc-600">Image URL (optional)</span>
        <input v-model="imageUrl" class="input" placeholder="https://..." />
      </label>

      <div class="pt-1">
        <button @click="submitVote" class="btn btn-primary">Submit</button>
      </div>
    </div>
  </section>
</template>
