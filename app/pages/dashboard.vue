<script setup lang="ts">
definePageMeta({
  layout: 'dashboard-layout',
  middleware: ['auth'],
})
</script>

<template>
  <div>
    <NuxtPage/>
  </div>
</template>

<style scoped>

</style>