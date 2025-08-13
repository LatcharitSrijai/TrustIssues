<script setup lang="ts">
import { useRoute, RouterLink } from "vue-router";
import { computed, ref } from "vue";
import { useNewsStore } from '@/stores/newsStore'
import Pagination from "@/components/Pagination.vue";

const route = useRoute();
const store = useNewsStore();
const news = computed(() => store.byId(Number(route.params.id)));

const perPage = ref(5);
const page = ref(1);

const totalPages = computed(() => {
  const len = news.value?.votes?.length ?? 0;
  return Math.max(1, Math.ceil(len / perPage.value));
});
const paginatedVotes = computed(() => {
  const list = news.value?.votes ?? [];
  const start = (page.value - 1) * perPage.value;
  return list.slice(start, start + perPage.value);
});
</script>

<template>
  <div v-if="news" class="space-y-8">
    <div>
      <RouterLink to="/" class="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:underline">
        ← Back to home
      </RouterLink>
    </div>

    <header class="space-y-3">
      <h1 class="text-3xl font-bold tracking-tight">{{ news.title }}</h1>
      <div class="flex flex-wrap items-center gap-3 text-sm">
        <span class="badge" :class="news.status==='fake' ? 'badge-red' : 'badge-green'">
          {{ news.status==='fake' ? 'Fake' : 'Not Fake' }}
        </span>
        <span class="text-zinc-500">Reporter: {{ news.reporter }} · {{ news.date }}</span>
      </div>
    </header>

    <!-- ภาพ: คงสัดส่วน 16:9 + จัดกึ่งกลาง -->
    <div class="overflow-hidden rounded-2xl border shadow-sm">
      <div class="relative aspect-[16/9]">
        <img :src="news.imageUrl" class="absolute inset-0 h-full w-full object-cover object-center" alt="" />
      </div>
    </div>

    <article class="prose prose-zinc max-w-none leading-7 text-zinc-800">
      {{ news.fullDetail }}
    </article>

    <section class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold">Votes & Comments</h2>
        <RouterLink :to="`/vote/${news.id}`" class="btn btn-primary h-9">+ Add your vote</RouterLink>
      </div>

      <div v-if="paginatedVotes.length === 0" class="card text-center text-zinc-500">No comments yet.</div>

      <div class="rounded-2xl border bg-white shadow-sm">
        <div v-for="(v,i) in paginatedVotes" :key="i" class="px-5 py-4">
          <p class="mb-2">
            <strong :class="v.type==='fake' ? 'text-red-600' : 'text-emerald-600'">{{ v.type.toUpperCase() }}</strong>
            — {{ v.comment || 'No comment provided.' }}
          </p>
          <img v-if="v.imageUrl" :src="v.imageUrl" class="max-w-xs rounded-lg border" alt="" />
          <div v-if="i < paginatedVotes.length-1" class="mt-4 divider"></div>
        </div>
      </div>

      <div class="flex items-center justify-between pt-2">
        <label class="flex items-center gap-2 text-sm text-zinc-600">
          Per page
          <select v-model.number="perPage" class="select w-28">
            <option :value="5">5</option>
            <option :value="10">10</option>
          </select>
        </label>
        <Pagination :current-page="page" :total-pages="totalPages" @update:page="(p:number)=>page=p"/>
      </div>
    </section>
  </div>
</template>
