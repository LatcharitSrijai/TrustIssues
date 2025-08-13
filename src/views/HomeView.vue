<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useNewsStore } from '@/stores/newsStore'
import { RouterLink } from "vue-router";
import Pagination from "@/components/Pagination.vue";

const store = useNewsStore();
const filterStatus = ref<"all"|"fake"|"not-fake">("all");
const itemsPerPage = ref(6);
const page = ref(1);
watch([filterStatus, itemsPerPage], () => (page.value = 1));

const filtered = computed(() => {
  if (filterStatus.value === "all") return store.newsList;
  return store.newsList.filter(n => n.status === filterStatus.value);
});
const totalPages = computed(() =>
  Math.max(1, Math.ceil(filtered.value.length / itemsPerPage.value))
);
const paginated = computed(() => {
  const start = (page.value - 1) * itemsPerPage.value;
  return filtered.value.slice(start, start + itemsPerPage.value);
});
</script>

<template>
  <section class="space-y-6">
    <header class="space-y-3">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Latest News</h1>
        <p class="text-sm text-zinc-600">Total {{ filtered.length }} articles</p>
      </div>

      <div class="toolbar">
        <label class="flex items-center gap-2">
          <span class="text-sm text-zinc-500">Filter</span>
          <select v-model="filterStatus" class="select w-36">
            <option value="all">All</option>
            <option value="fake">Fake</option>
            <option value="not-fake">Not Fake</option>
          </select>
        </label>
        <label class="flex items-center gap-2">
          <span class="text-sm text-zinc-500">Per page</span>
          <select v-model.number="itemsPerPage" class="select w-28">
            <option :value="6">6</option>
            <option :value="9">9</option>
            <option :value="12">12</option>
          </select>
        </label>
      </div>
    </header>

    <div v-if="paginated.length===0" class="card text-center text-zinc-500">
      No news matched your filter.
    </div>

    <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="n in paginated" :key="n.id"
        class="news-card card-hover"
        :class="n.status==='fake' ? 'news-card-fake' : 'news-card-safe'"
      >
        <!-- แถบสถานะซ้าย -->
        <div
          class="news-card-bar"
          :class="n.status==='fake' ? 'news-card-bar-fake' : 'news-card-bar-safe'"
        />

        <div class="space-y-1.5">
          <h2 class="line-clamp-2 text-base font-semibold tracking-tight hover:underline">
            {{ n.title }}
          </h2>
          <p class="text-sm text-zinc-500">Reporter: {{ n.reporter }} · {{ n.date }}</p>
        </div>

        <p class="mt-3 mb-4 line-clamp-3 text-sm text-zinc-700">
          {{ n.shortDetail }}
        </p>

        <div class="flex items-center justify-between">
          <span class="badge" :class="n.status==='fake' ? 'badge-red' : 'badge-green'">
            {{ n.status==='fake' ? 'Fake' : 'Not Fake' }}
          </span>
          <RouterLink :to="`/news/${n.id}`" class="btn btn-primary h-9 px-3">View</RouterLink>
        </div>
      </article>
    </div>

    <div class="flex justify-center">
      <Pagination :current-page="page" :total-pages="totalPages" @update:page="(p:number)=>page=p"/>
    </div>
  </section>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
}
</style>
