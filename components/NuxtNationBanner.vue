<script setup lang="ts">
const preferNoBanner = () => {
  localStorage.setItem('preferNoNuxtNationBanner', 'true')
  document.querySelector('html')?.classList.add('hide-banner')
}

if (process.server) {
  useHead({
    script: [
      {
        key: 'prehydrate-template-banner',
        innerHTML: `
            if (localStorage.getItem('preferNoNuxtNationBanner') === 'true') {
              document.querySelector('html').classList.add('hide-banner')
            }`.replace(/\s+/g, ' '),
        type: 'text/javascript'
      }
    ]
  })
}
</script>

<template>
  <div class="relative w-full bg-white dark:bg-black z-50 border-b border-b-gray-300 dark:border-b-gray-700 template-banner">
    <div class="flex flex-wrap justify-center items-center gap-2 p-2 w-4/5 mx-auto">
      <NuxtLink to="https://nuxtnation.com/?ref=nuxt" target="_blank" class="text-sm text-center items-center text-black dark:text-white justify-center">
        <span class="font-semibold">
          🎤 Nuxt Nation is coming
        </span>
        - The largest online Nuxt Conference is happening on October 18-19, 2023.
      </NuxtLink>
      <NuxtLink to="https://nuxtnation.com/?ref=nuxt" target="_blank" class="inline-flex items-center px-2 py-1 font-medium text-xs border rounded border-gray-400 hover:border-gray-600 dark:border-gray-700 dark:hover:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900">
        <span>Register</span>
        <Icon name="material-symbols:arrow-outward-rounded" class="inline-block w-4 h-4" />
      </NuxtLink>
    </div>
    <div class="absolute top-2 right-1">
      <AppButton class="font-semibold" variant="link" size="xs" icon="carbon:close" @click="preferNoBanner" />
    </div>
  </div>
</template>

<style>
.hide-banner .template-banner{
  display: none;
}
</style>
