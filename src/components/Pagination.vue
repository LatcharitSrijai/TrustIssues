<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ currentPage: number; totalPages: number }>();
const emit = defineEmits<{ (e: "update:page", page: number): void }>();

const max = computed(() => Math.max(1, props.totalPages))
function go(p: number) {
  if (p < 1 || p > max.value) return;
  emit("update:page", p);
}
</script>

<template>
  <nav class="select-none" aria-label="Pagination">
    <div class="inline-flex items-center gap-1 rounded-full border bg-white p-1 shadow-sm">
      <button
        class="px-3 py-1.5 rounded-full hover:bg-zinc-100 disabled:opacity-40"
        :disabled="props.currentPage===1"
        @click="go(props.currentPage-1)"
      >Prev</button>

      <template v-if="props.totalPages <= 7">
        <button
          v-for="p in props.totalPages" :key="p"
          class="px-3 py-1.5 rounded-full hover:bg-zinc-100 min-w-9"
          :class="p===props.currentPage ? 'bg-black text-white hover:bg-black' : ''"
          @click="go(p)"
        >{{ p }}</button>
      </template>

      <template v-else>
        <button class="px-3 py-1.5 rounded-full hover:bg-zinc-100 min-w-9"
                :class="props.currentPage===1?'bg-black text-white hover:bg-black':''" @click="go(1)">1</button>
        <span v-if="props.currentPage > 4" class="px-2">…</span>
        <button v-for="p in [props.currentPage-1, props.currentPage, props.currentPage+1].filter(p=>p>1&&p<props.totalPages)"
                :key="p" class="px-3 py-1.5 rounded-full hover:bg-zinc-100 min-w-9"
                :class="p===props.currentPage?'bg-black text-white hover:bg-black':''" @click="go(p)">{{ p }}</button>
        <span v-if="props.currentPage < props.totalPages - 3" class="px-2">…</span>
        <button class="px-3 py-1.5 rounded-full hover:bg-zinc-100 min-w-9"
                :class="props.currentPage===props.totalPages?'bg-black text-white hover:bg-black':''" @click="go(props.totalPages)">{{ props.totalPages }}</button>
      </template>

      <button
        class="px-3 py-1.5 rounded-full hover:bg-zinc-100 disabled:opacity-40"
        :disabled="props.currentPage===props.totalPages"
        @click="go(props.currentPage+1)"
      >Next</button>
    </div>
  </nav>
</template>
