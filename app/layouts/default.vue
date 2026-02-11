<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col h-screen">
    <!--  <MainNavigation/>-->
    <!-- <ClientOnly> -->
      <SharedHeader/>
    <!-- </ClientOnly> -->
    <main class="container mx-auto flex-1 mt-2">
      <slot/>
    </main>

    <SharedFooter/>
  </div>
</template>

<style scoped>

</style>