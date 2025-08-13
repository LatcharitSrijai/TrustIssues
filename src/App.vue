<template>
  <div class="min-h-dvh flex flex-col bg-zinc-50 text-zinc-900">
    <!-- Header -->
    <header class="sticky top-0 z-30 border-b bg-white/80 backdrop-blur shadow-sm">
      <div class="container-app h-16 flex items-center justify-between">
        <RouterLink to="/" class="flex flex-col leading-none">
          <span class="text-lg font-semibold tracking-tight">TrustIssues</span>
          <span class="brand-sub">Social Anti-Fake News</span>
        </RouterLink>

        <nav class="flex items-center gap-1">
          <RouterLink
            to="/"
            class="rounded-lg px-3 py-2 text-sm transition text-zinc-600 hover:bg-zinc-100"
            exact-active-class="bg-zinc-900 text-white"
          >
            Home
          </RouterLink>
        </nav>
      </div>
    </header>

    <!-- Content -->
    <main class="container-app flex-1 py-8">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="border-t bg-white/70">
      <div class="container-app py-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-sm text-zinc-500">© {{ new Date().getFullYear() }} TrustIssues</p>
        <div class="flex items-center gap-4 text-sm">
          <a class="text-zinc-500 hover:text-zinc-700 transition" href="#">Terms</a>
          <a class="text-zinc-500 hover:text-zinc-700 transition" href="#">Privacy</a>
          <a class="text-zinc-500 hover:text-zinc-700 transition" href="#">Contact</a>
        </div>
      </div>
    </footer>
  </div>
</template>
