<template>
  <div class="min-h-dvh flex flex-col bg-zinc-50 text-zinc-900">
    <!-- Header -->
    <header
      class="sticky top-0 z-50 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.03)]"
    >
      <div class="container-app h-16 flex items-center justify-between">
        <RouterLink to="/" class="group inline-flex items-center gap-2">
          <span class="text-lg font-semibold tracking-tight group-hover:opacity-90">
            TrustIssues
          </span>
          <span class="hidden sm:inline text-[11px] text-zinc-500 tracking-wide">
            SOCIAL ANTI-FAKE NEWS
          </span>
        </RouterLink>

        <nav class="flex items-center gap-1">
          <RouterLink to="/" class="nav-link">Home</RouterLink>
        </nav>
      </div>
    </header>

    <!-- Content -->
    <main class="container-app flex-1 py-10">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="mt-8 border-t bg-white/80">
      <div
        class="container-app py-8 text-sm text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-3"
      >
        <p>© {{ new Date().getFullYear() }} TrustIssues</p>
        <nav class="flex items-center gap-4">
          <a href="#" class="link">Terms</a>
          <a href="#" class="link">Privacy</a>
          <a href="#" class="link">Contact</a>
        </nav>
      </div>
    </footer>
  </div>
</template>
